import { useEffect, useState } from 'react'
import { usePrimaryLocation } from '../db/hooks'
import { getTodayWeather } from '../utils/weather'
import { formatTemp } from '../utils/temperature'
import { useSettingsStore } from '../stores/useSettingsStore'

export function WeatherBadge() {
  const location = usePrimaryLocation()
  const tempUnit = useSettingsStore((s) => s.tempUnit)
  const [weather, setWeather] = useState<{ tMaxC: number; tMinC: number } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!location) return
    setLoading(true)
    getTodayWeather(location.lat, location.lng)
      .then((w) => setWeather(w))
      .catch(() => setWeather(null))
      .finally(() => setLoading(false))
  }, [location])

  if (!location) return null

  return (
    <div className="flex items-center gap-3 bg-white/80 rounded-xl p-3 border border-gray-200">
      <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2f6e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{location.name}</p>
        {loading ? (
          <p className="text-xs text-gray-400">Loading weather...</p>
        ) : weather ? (
          <p className="text-xs text-gray-500">
            High {formatTemp(weather.tMaxC, tempUnit)} / Low {formatTemp(weather.tMinC, tempUnit)}
          </p>
        ) : (
          <p className="text-xs text-gray-400">Weather unavailable</p>
        )}
      </div>
    </div>
  )
}
