import { db } from '../db/database'
import { hasNotificationFired, recordNotification, getLastReminderDate, updateLastReminderDate } from '../db/hooks'
import type { Application } from '../types'

export function isNotificationSupported(): boolean {
  return 'Notification' in window
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported'
  return Notification.permission
}

export function isNotificationPermitted(): boolean {
  return isNotificationSupported() && Notification.permission === 'granted'
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  const result = await Notification.requestPermission()
  return result === 'granted'
}

interface NotificationSettings {
  notifyPreLimit: boolean
  preLimitPercent: number
  notifyThresholdReached: boolean
  notifyDailyReminder: boolean
}

export async function checkAndNotify(
  app: Application,
  productName: string,
  settings: NotificationSettings
): Promise<void> {
  if (!isNotificationPermitted() || !app.isActive) return

  const percent = app.gddThreshold > 0
    ? (app.accumulatedGDD / app.gddThreshold) * 100
    : 0

  // Pre-limit warning
  if (settings.notifyPreLimit && percent >= settings.preLimitPercent && percent < 100) {
    const alreadyFired = await hasNotificationFired(app.id, 'pre_limit')
    if (!alreadyFired) {
      new Notification('GDD Pre-Limit Warning', {
        body: `${productName} has reached ${Math.round(percent)}% of its GDD threshold (${Math.round(app.accumulatedGDD)}/${app.gddThreshold}).`,
        icon: '/favicon.ico',
      })
      await recordNotification(app.id, 'pre_limit')
    }
  }

  // Threshold reached
  if (settings.notifyThresholdReached && percent >= 100) {
    const alreadyFired = await hasNotificationFired(app.id, 'threshold_reached')
    if (!alreadyFired) {
      new Notification('GDD Threshold Reached', {
        body: `${productName} has reached its GDD threshold (${app.gddThreshold}). Time to reapply!`,
        icon: '/favicon.ico',
      })
      await recordNotification(app.id, 'threshold_reached')
    }
  }

  // Daily reminder after threshold reached
  if (settings.notifyDailyReminder && percent >= 100) {
    const today = new Date().toISOString().slice(0, 10)
    const lastReminded = await getLastReminderDate(app.id)
    if (lastReminded !== today) {
      new Notification('GDD Reapplication Reminder', {
        body: `${productName} passed its GDD threshold. Consider reapplying.`,
        icon: '/favicon.ico',
      })
      await updateLastReminderDate(app.id, today)
    }
  }
}

export async function checkAllApplications(
  apps: Application[],
  settings: NotificationSettings
): Promise<void> {
  if (!isNotificationPermitted()) return

  const anyEnabled = settings.notifyPreLimit || settings.notifyThresholdReached || settings.notifyDailyReminder
  if (!anyEnabled) return

  for (const app of apps) {
    if (!app.isActive) continue
    const product = await db.products.get(app.productId)
    const productName = product?.name ?? 'PGR Application'
    await checkAndNotify(app, productName, settings)
  }
}
