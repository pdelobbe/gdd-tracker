import { Layout } from '../components/Layout'
import { useSettingsStore } from '../stores/useSettingsStore'
import { usePrimaryLocation } from '../db/hooks'

export function SettingsScreen() {
  const { tempUnit, toggleTempUnit } = useSettingsStore()
  const location = usePrimaryLocation()

  return (
    <Layout title="Settings" showBack showNav={false}>
      <div className="p-4 space-y-6">
        <div className="bg-white/80 rounded-2xl border border-gray-200 divide-y divide-gray-200">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-gray-900">Temperature Unit</p>
              <p className="text-sm text-gray-500">
                {tempUnit === 'F' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}
              </p>
            </div>
            <button
              onClick={toggleTempUnit}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                tempUnit === 'C' ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  tempUnit === 'C' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {location && (
            <div className="p-4">
              <p className="font-medium text-gray-900">Location</p>
              <p className="text-sm text-gray-500">{location.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                {location.zipCode ? ` (${location.zipCode})` : ''}
              </p>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-400 space-y-1">
          <p>GDD Tracker v1.0.0</p>
          <p>Growing Degree Day PGR Reapplication Timer</p>
          <p className="text-xs">Rose Rock Environmental Services</p>
        </div>
      </div>
    </Layout>
  )
}
