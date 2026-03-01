import { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { useSettingsStore } from '../stores/useSettingsStore'
import { usePrimaryLocation } from '../db/hooks'
import { requestNotificationPermission, getNotificationPermission, isNotificationSupported } from '../utils/notifications'

export function SettingsScreen() {
  const { tempUnit, toggleTempUnit } = useSettingsStore()
  const {
    notifyPreLimit, preLimitPercent, notifyThresholdReached, notifyDailyReminder,
    setNotifyPreLimit, setPreLimitPercent, setNotifyThresholdReached, setNotifyDailyReminder,
  } = useSettingsStore()
  const location = usePrimaryLocation()
  const [permissionState, setPermissionState] = useState<NotificationPermission | 'unsupported'>(getNotificationPermission())

  useEffect(() => {
    setPermissionState(getNotificationPermission())
  }, [])

  async function handleToggle(setter: (on: boolean) => void, newValue: boolean) {
    if (newValue && permissionState !== 'granted') {
      await requestNotificationPermission()
      setPermissionState(getNotificationPermission())
    }
    setter(newValue)
  }

  return (
    <Layout title="Settings" showBack>
      <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-6">
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

        {/* Notifications */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
            Notifications
          </p>
          <div className="bg-white/80 rounded-2xl border border-gray-200 divide-y divide-gray-200">
            {/* Pre-limit Warning */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="font-medium text-gray-900">Pre-limit Warning</p>
                  <p className="text-sm text-gray-500">
                    Alert when GDD reaches {preLimitPercent}% of threshold
                  </p>
                </div>
                <button
                  onClick={() => handleToggle(setNotifyPreLimit, !notifyPreLimit)}
                  className={`relative w-14 h-8 rounded-full transition-colors shrink-0 ${
                    notifyPreLimit ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                      notifyPreLimit ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {notifyPreLimit && (
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => setPreLimitPercent(preLimitPercent - 5)}
                    disabled={preLimitPercent <= 50}
                    className="w-9 h-9 rounded-lg bg-gray-100 text-gray-700 font-bold text-lg flex items-center justify-center disabled:opacity-30 active:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium text-gray-800 w-12 text-center">
                    {preLimitPercent}%
                  </span>
                  <button
                    onClick={() => setPreLimitPercent(preLimitPercent + 5)}
                    disabled={preLimitPercent >= 95}
                    className="w-9 h-9 rounded-lg bg-gray-100 text-gray-700 font-bold text-lg flex items-center justify-center disabled:opacity-30 active:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* Threshold Reached */}
            <div className="flex items-center justify-between p-4">
              <div className="flex-1 min-w-0 mr-3">
                <p className="font-medium text-gray-900">Threshold Reached</p>
                <p className="text-sm text-gray-500">
                  Alert when GDD hits 100% of threshold
                </p>
              </div>
              <button
                onClick={() => handleToggle(setNotifyThresholdReached, !notifyThresholdReached)}
                className={`relative w-14 h-8 rounded-full transition-colors shrink-0 ${
                  notifyThresholdReached ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    notifyThresholdReached ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Daily Reminder */}
            <div className="flex items-center justify-between p-4">
              <div className="flex-1 min-w-0 mr-3">
                <p className="font-medium text-gray-900">Daily Reminder</p>
                <p className="text-sm text-gray-500">
                  Remind once per day after threshold is reached
                </p>
              </div>
              <button
                onClick={() => handleToggle(setNotifyDailyReminder, !notifyDailyReminder)}
                className={`relative w-14 h-8 rounded-full transition-colors shrink-0 ${
                  notifyDailyReminder ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    notifyDailyReminder ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Permission banner */}
          {!isNotificationSupported() && (
            <div className="mt-2 rounded-xl bg-amber-50 border border-amber-200 p-3">
              <p className="text-sm text-amber-800">
                Notifications are not supported in this browser.
              </p>
            </div>
          )}
          {isNotificationSupported() && permissionState === 'denied' && (
            <div className="mt-2 rounded-xl bg-amber-50 border border-amber-200 p-3">
              <p className="text-sm text-amber-800">
                Notification permission was denied. Enable notifications in your browser settings to receive GDD alerts.
              </p>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-400 space-y-1">
          <p>GDD Tracker v1.0.0</p>
          <p>Growing Degree Day PGR Reapplication Timer</p>
          <p className="text-xs">Lawn Lab</p>
        </div>
      </div>
    </Layout>
  )
}
