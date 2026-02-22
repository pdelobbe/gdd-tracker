import { useState } from 'react'
import { useOnboardingStore } from '../../stores/useOnboardingStore'
import { getGPSLocation, geocodeZipCode, reverseGeocode } from '../../utils/location'

export function StepLocation() {
  const { zipCode, lat, lng, locationName, setZipCode, setCoords, setLocationName } = useOnboardingStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGPS = async () => {
    setLoading(true)
    setError('')
    try {
      const { lat: gpsLat, lng: gpsLng } = await getGPSLocation()
      setCoords(gpsLat, gpsLng)
      const name = await reverseGeocode(gpsLat, gpsLng)
      setLocationName(name)
    } catch {
      setError('Could not get location. Please enter a zip code instead.')
    } finally {
      setLoading(false)
    }
  }

  const handleZipLookup = async () => {
    if (zipCode.length < 3) {
      setError('Enter a valid zip code')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await geocodeZipCode(zipCode)
      setCoords(result.lat, result.lng)
      setLocationName(result.name)
    } catch {
      setError('Could not find that location. Try a different zip code.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">Set Your Location</h2>
        <p className="text-sm text-gray-500 mt-1">
          We need your location to get local weather data for accurate GDD tracking.
        </p>
      </div>

      <button
        onClick={handleGPS}
        disabled={loading}
        className="w-full py-4 rounded-xl bg-green-600 text-white font-semibold active:bg-green-700 disabled:opacity-50 shadow-md shadow-green-900/20 flex items-center justify-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
        </svg>
        {loading ? 'Getting location...' : 'Use My Location'}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter Zip Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value)
              setError('')
            }}
            placeholder="e.g. 73301"
            maxLength={10}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-green-400"
          />
          <button
            onClick={handleZipLookup}
            disabled={loading || zipCode.length < 3}
            className="px-4 py-3 bg-green-600 text-white rounded-xl font-medium active:bg-green-700 disabled:opacity-50"
          >
            Look up
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {lat !== null && lng !== null && locationName && (
        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
          <p className="text-sm text-gray-500">Location set to</p>
          <p className="font-bold text-green-800 text-lg">{locationName}</p>
          <p className="text-xs text-gray-400 mt-1">
            {lat.toFixed(4)}, {lng.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  )
}
