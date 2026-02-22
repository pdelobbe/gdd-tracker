import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TempUnit, GrassType, MowingHeightCategory } from '../types'

interface SettingsState {
  tempUnit: TempUnit
  defaultGrassType: GrassType | null
  defaultMowingHeight: MowingHeightCategory | null
  hasCompletedOnboarding: boolean
  notifyPreLimit: boolean
  preLimitPercent: number
  notifyThresholdReached: boolean
  notifyDailyReminder: boolean
  toggleTempUnit: () => void
  setTempUnit: (unit: TempUnit) => void
  setDefaultGrassType: (grass: GrassType) => void
  setDefaultMowingHeight: (height: MowingHeightCategory) => void
  setOnboardingComplete: () => void
  setNotifyPreLimit: (on: boolean) => void
  setPreLimitPercent: (pct: number) => void
  setNotifyThresholdReached: (on: boolean) => void
  setNotifyDailyReminder: (on: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      tempUnit: 'F',
      defaultGrassType: null,
      defaultMowingHeight: null,
      hasCompletedOnboarding: false,
      notifyPreLimit: true,
      preLimitPercent: 80,
      notifyThresholdReached: true,
      notifyDailyReminder: true,
      toggleTempUnit: () =>
        set((s) => ({ tempUnit: s.tempUnit === 'F' ? 'C' : 'F' })),
      setTempUnit: (unit) => set({ tempUnit: unit }),
      setDefaultGrassType: (grass) => set({ defaultGrassType: grass }),
      setDefaultMowingHeight: (height) => set({ defaultMowingHeight: height }),
      setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),
      setNotifyPreLimit: (on) => set({ notifyPreLimit: on }),
      setPreLimitPercent: (pct) => set({ preLimitPercent: Math.min(95, Math.max(50, pct)) }),
      setNotifyThresholdReached: (on) => set({ notifyThresholdReached: on }),
      setNotifyDailyReminder: (on) => set({ notifyDailyReminder: on }),
    }),
    { name: 'gdd-tracker-settings' }
  )
)
