import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TempUnit, GrassType, MowingHeightCategory } from '../types'

interface SettingsState {
  tempUnit: TempUnit
  defaultGrassType: GrassType | null
  defaultMowingHeight: MowingHeightCategory | null
  hasCompletedOnboarding: boolean
  toggleTempUnit: () => void
  setTempUnit: (unit: TempUnit) => void
  setDefaultGrassType: (grass: GrassType) => void
  setDefaultMowingHeight: (height: MowingHeightCategory) => void
  setOnboardingComplete: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      tempUnit: 'F',
      defaultGrassType: null,
      defaultMowingHeight: null,
      hasCompletedOnboarding: false,
      toggleTempUnit: () =>
        set((s) => ({ tempUnit: s.tempUnit === 'F' ? 'C' : 'F' })),
      setTempUnit: (unit) => set({ tempUnit: unit }),
      setDefaultGrassType: (grass) => set({ defaultGrassType: grass }),
      setDefaultMowingHeight: (height) => set({ defaultMowingHeight: height }),
      setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),
    }),
    { name: 'gdd-tracker-settings' }
  )
)
