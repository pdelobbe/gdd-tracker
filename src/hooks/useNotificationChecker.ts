import { useEffect, useRef } from 'react'
import type { Application } from '../types'
import { useSettingsStore } from '../stores/useSettingsStore'
import { isNotificationPermitted } from '../utils/notifications'
import { checkAllApplications } from '../utils/notifications'

export function useNotificationChecker(activeApps: Application[]) {
  const hasRun = useRef(false)
  const settings = useSettingsStore((s) => ({
    notifyPreLimit: s.notifyPreLimit,
    preLimitPercent: s.preLimitPercent,
    notifyThresholdReached: s.notifyThresholdReached,
    notifyDailyReminder: s.notifyDailyReminder,
  }))

  useEffect(() => {
    if (hasRun.current) return
    if (activeApps.length === 0) return
    if (!isNotificationPermitted()) return

    const anyEnabled = settings.notifyPreLimit || settings.notifyThresholdReached || settings.notifyDailyReminder
    if (!anyEnabled) return

    hasRun.current = true
    checkAllApplications(activeApps, settings)
  }, [activeApps, settings])
}
