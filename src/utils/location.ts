/**
 * Get GPS coordinates from the browser Geolocation API.
 */
export async function getGPSLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: false, timeout: 10000 }
    )
  })
}

/**
 * Geocode a zip code to lat/lng + location name using Open-Meteo geocoding.
 */
export async function geocodeZipCode(
  zip: string
): Promise<{ lat: number; lng: number; name: string }> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(zip)}&count=5&language=en&format=json`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Geocoding error: ${res.status}`)

  const data = await res.json()
  const results = data.results ?? []

  // Try to find a US result first
  const usResult = results.find(
    (r: { country_code?: string }) => r.country_code === 'US'
  )
  const result = usResult ?? results[0]

  if (!result) throw new Error('Location not found')

  const name = [result.name, result.admin1].filter(Boolean).join(', ')
  return { lat: result.latitude, lng: result.longitude, name }
}

/**
 * Reverse geocode lat/lng to a city/state name.
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  // Use Open-Meteo geocoding with coordinates approximation
  // Since Open-Meteo doesn't have reverse geocoding, use NWS points API
  try {
    const res = await fetch(`https://api.weather.gov/points/${lat},${lng}`, {
      headers: { 'User-Agent': 'GDDTracker/1.0 (gddtracker@roserockenvironmental.com)' },
    })
    if (!res.ok) throw new Error('NWS error')
    const data = await res.json()
    const city = data.properties?.relativeLocation?.properties?.city
    const state = data.properties?.relativeLocation?.properties?.state
    if (city && state) return `${city}, ${state}`
  } catch {
    // Fallback: just show coordinates
  }
  return `${lat.toFixed(2)}, ${lng.toFixed(2)}`
}
