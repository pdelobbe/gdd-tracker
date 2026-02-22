import { useEffect, useRef } from 'react'
import type { Application } from '../types'
import { useSettingsStore } from '../stores/useSettingsStore'
import { isNotificationPermitted, checkAllApplications } from '../utils/notifications'

export function useNotificationChecker(activeApps: Application[]) {
  const hasRun = useRef(false)
  const notifyPreLimit = useSettingsStore((s) => s.notifyPreLimit)
  const preLimitPercent = useSettingsStore((s) => s.preLimitPercent)
  const notifyThresholdReached = useSettingsStore((s) => s.notifyThresholdReached)
  const notifyDailyReminder = useSettingsStore((s) => s.notifyDailyReminder)

  useEffect(() => {
    if (hasRun.current) return
    if (activeApps.length === 0) return
    if (!isNotificationPermitted()) return

    const anyEnabled = notifyPreLimit || notifyThresholdReached || notifyDailyReminder
    if (!anyEnabled) return

    hasRun.current = true
    checkAllApplications(activeApps, {
      notifyPreLimit,
      preLimitPercent,
      notifyThresholdReached,
      notifyDailyReminder,
    }).catch((err) => console.error('Notification check failed:', err))
  }, [activeApps, notifyPreLimit, preLimitPercent, notifyThresholdReached, notifyDailyReminder])
}
