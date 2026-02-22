import { bulkCacheWeather, getCachedWeather } from '../db/hooks'

interface DailyWeather {
  date: string
  tMaxC: number
  tMinC: number
}

/**
 * Fetch historical weather data from Open-Meteo for a date range.
 * Returns daily max/min temps in Celsius.
 */
export async function fetchHistoricalWeather(
  lat: number,
  lng: number,
  startDate: string,
  endDate: string
): Promise<DailyWeather[]> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min&start_date=${startDate}&end_date=${endDate}&timezone=auto`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Open-Meteo error: ${res.status}`)

  const data = await res.json()
  const dates: string[] = data.daily?.time ?? []
  const maxTemps: number[] = data.daily?.temperature_2m_max ?? []
  const minTemps: number[] = data.daily?.temperature_2m_min ?? []

  return dates.map((date, i) => ({
    date,
    tMaxC: maxTemps[i],
    tMinC: minTemps[i],
  }))
}

/**
 * Fetch forecast weather data. Tries NWS first (US only), falls back to Open-Meteo.
 */
export async function fetchForecastWeather(
  lat: number,
  lng: number,
  days: number = 7
): Promise<DailyWeather[]> {
  try {
    return await fetchNWSForecast(lat, lng, days)
  } catch {
    return await fetchOpenMeteoForecast(lat, lng, days)
  }
}

async function fetchNWSForecast(lat: number, lng: number, days: number): Promise<DailyWeather[]> {
  // Get NWS gridpoint
  const pointRes = await fetch(`https://api.weather.gov/points/${lat},${lng}`, {
    headers: { 'User-Agent': 'GDDTracker/1.0 (gddtracker@roserockenvironmental.com)' },
  })
  if (!pointRes.ok) throw new Error('NWS points error')
  const pointData = await pointRes.json()

  const forecastUrl = pointData.properties?.forecast
  if (!forecastUrl) throw new Error('No forecast URL')

  const forecastRes = await fetch(forecastUrl, {
    headers: { 'User-Agent': 'GDDTracker/1.0 (gddtracker@roserockenvironmental.com)' },
  })
  if (!forecastRes.ok) throw new Error('NWS forecast error')
  const forecastData = await forecastRes.json()

  const periods = forecastData.properties?.periods ?? []
  const dailyMap = new Map<string, { high?: number; low?: number }>()

  for (const period of periods) {
    const date = period.startTime?.split('T')[0]
    if (!date) continue

    const entry = dailyMap.get(date) ?? {}
    const tempC = period.temperatureUnit === 'F'
      ? ((period.temperature - 32) * 5) / 9
      : period.temperature

    if (period.isDaytime) {
      entry.high = tempC
    } else {
      entry.low = tempC
    }
    dailyMap.set(date, entry)
  }

  const results: DailyWeather[] = []
  for (const [date, temps] of dailyMap) {
    if (temps.high !== undefined && temps.low !== undefined) {
      results.push({ date, tMaxC: temps.high, tMinC: temps.low })
    }
  }

  return results.slice(0, days)
}

async function fetchOpenMeteoForecast(lat: number, lng: number, days: number): Promise<DailyWeather[]> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min&forecast_days=${days}&timezone=auto`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Open-Meteo forecast error: ${res.status}`)

  const data = await res.json()
  const dates: string[] = data.daily?.time ?? []
  const maxTemps: number[] = data.daily?.temperature_2m_max ?? []
  const minTemps: number[] = data.daily?.temperature_2m_min ?? []

  return dates.map((date, i) => ({
    date,
    tMaxC: maxTemps[i],
    tMinC: minTemps[i],
  }))
}

/**
 * Get weather data for a date range, using cache where available.
 * Fetches missing data from APIs and caches it.
 */
export async function getWeatherForRange(
  lat: number,
  lng: number,
  startDate: string,
  endDate: string
): Promise<DailyWeather[]> {
  const results: DailyWeather[] = []
  const missingDates: string[] = []

  // Check cache for each date
  const start = new Date(startDate)
  const end = new Date(endDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0]
    const cached = await getCachedWeather(lat, lng, dateStr)
    if (cached) {
      results.push({ date: dateStr, tMaxC: cached.tMax, tMinC: cached.tMin })
    } else {
      missingDates.push(dateStr)
    }
  }

  if (missingDates.length === 0) return results.sort((a, b) => a.date.localeCompare(b.date))

  // Separate into historical and forecast dates
  const todayStr = today.toISOString().split('T')[0]
  const historicalDates = missingDates.filter((d) => d < todayStr)
  const futureDates = missingDates.filter((d) => d >= todayStr)

  // Fetch historical
  if (historicalDates.length > 0) {
    try {
      const historical = await fetchHistoricalWeather(
        lat, lng,
        historicalDates[0],
        historicalDates[historicalDates.length - 1]
      )
      results.push(...historical)

      // Cache historical data
      await bulkCacheWeather(
        historical.map((w) => ({
          lat: Math.round(lat * 100) / 100,
          lng: Math.round(lng * 100) / 100,
          date: w.date,
          tMax: w.tMaxC,
          tMin: w.tMinC,
          fetchedAt: new Date().toISOString(),
        }))
      )
    } catch (e) {
      console.error('Failed to fetch historical weather:', e)
    }
  }

  // Fetch forecast
  if (futureDates.length > 0) {
    try {
      const forecast = await fetchForecastWeather(lat, lng, futureDates.length + 1)
      const relevantForecast = forecast.filter((f) => futureDates.includes(f.date))
      results.push(...relevantForecast)

      // Cache forecast data (short-lived)
      await bulkCacheWeather(
        relevantForecast.map((w) => ({
          lat: Math.round(lat * 100) / 100,
          lng: Math.round(lng * 100) / 100,
          date: w.date,
          tMax: w.tMaxC,
          tMin: w.tMinC,
          fetchedAt: new Date().toISOString(),
        }))
      )
    } catch (e) {
      console.error('Failed to fetch forecast weather:', e)
    }
  }

  return results.sort((a, b) => a.date.localeCompare(b.date))
}

/**
 * Get today's weather (high/low) for a location.
 */
export async function getTodayWeather(lat: number, lng: number): Promise<DailyWeather | null> {
  const today = new Date().toISOString().split('T')[0]
  const data = await getWeatherForRange(lat, lng, today, today)
  return data.length > 0 ? data[0] : null
}
