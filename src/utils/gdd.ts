import type { SeasonType, ProgressZone } from '../types'

export interface GDDTimeseriesPoint {
  date: string
  dailyGDD: number
  cumulativeGDD: number
}

/**
 * Compute a GDD timeseries from weather data.
 * Returns daily and cumulative GDD for each day.
 */
export function computeGDDTimeseries(
  weatherData: { date: string; tMaxC: number; tMinC: number }[],
  baseTempC: number
): GDDTimeseriesPoint[] {
  let cumulative = 0
  return weatherData.map((w) => {
    const avg = (w.tMaxC + w.tMinC) / 2
    const daily = Math.max(0, avg - baseTempC)
    cumulative += daily
    return { date: w.date, dailyGDD: Math.round(daily * 10) / 10, cumulativeGDD: Math.round(cumulative * 10) / 10 }
  })
}

/**
 * Calculate daily GDD from max/min temps (in Celsius).
 * Cool-season base: 0°C, Warm-season base: 10°C
 */
export function calculateDailyGDD(tMaxC: number, tMinC: number, season: SeasonType): number {
  const tBase = season === 'cool' ? 0 : 10
  const avg = (tMaxC + tMinC) / 2
  return Math.max(0, avg - tBase)
}

/**
 * Accumulate GDD from an array of daily GDD values.
 */
export function accumulateGDD(dailyValues: number[]): number {
  return dailyValues.reduce((sum, v) => sum + v, 0)
}

/**
 * Get progress as a percentage toward the threshold.
 */
export function getProgressPercent(accumulated: number, threshold: number): number {
  if (threshold <= 0) return 100
  return Math.min(100, (accumulated / threshold) * 100)
}

/**
 * Get the zone color based on progress percentage.
 * Green: 0-70%, Yellow: 70-90%, Red: 90%+
 */
export function getProgressZone(percent: number): ProgressZone {
  if (percent >= 90) return 'red'
  if (percent >= 70) return 'yellow'
  return 'green'
}

/**
 * Estimate days remaining to reach threshold based on recent daily GDD average.
 * Uses the last 7 days average if available, otherwise the overall average.
 */
export function estimateDaysToThreshold(
  accumulated: number,
  threshold: number,
  dailyValues: number[]
): number | null {
  if (accumulated >= threshold) return 0
  if (dailyValues.length === 0) return null

  const recent = dailyValues.slice(-7)
  const avgDaily = recent.reduce((s, v) => s + v, 0) / recent.length
  if (avgDaily <= 0) return null

  const remaining = threshold - accumulated
  return Math.ceil(remaining / avgDaily)
}

/**
 * Get estimated reapplication date.
 */
export function getEstimatedReapplicationDate(
  appliedDate: string,
  accumulated: number,
  threshold: number,
  dailyValues: number[]
): Date | null {
  const days = estimateDaysToThreshold(accumulated, threshold, dailyValues)
  if (days === null) return null

  const startDate = new Date(appliedDate)
  const totalDaysSoFar = dailyValues.length
  const totalDays = totalDaysSoFar + days

  const result = new Date(startDate)
  result.setDate(result.getDate() + totalDays)
  return result
}
