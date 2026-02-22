import { create } from 'zustand'
import type { GrassType, MowingHeightCategory } from '../types'

interface ApplicationState {
  step: number
  selectedProductId: string | null
  grassType: GrassType | null
  mowingHeight: MowingHeightCategory | null
  rate: string
  date: string
  notes: string
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setSelectedProductId: (id: string) => void
  setGrassType: (grass: GrassType) => void
  setMowingHeight: (height: MowingHeightCategory) => void
  setRate: (rate: string) => void
  setDate: (date: string) => void
  setNotes: (notes: string) => void
  reset: () => void
}

export const useApplicationStore = create<ApplicationState>()((set) => ({
  step: 1,
  selectedProductId: null,
  grassType: null,
  mowingHeight: null,
  rate: '',
  date: new Date().toISOString().split('T')[0],
  notes: '',
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 4) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
  setSelectedProductId: (id) => set({ selectedProductId: id }),
  setGrassType: (grass) => set({ grassType: grass }),
  setMowingHeight: (height) => set({ mowingHeight: height }),
  setRate: (rate) => set({ rate }),
  setDate: (date) => set({ date }),
  setNotes: (notes) => set({ notes }),
  reset: () =>
    set({
      step: 1,
      selectedProductId: null,
      grassType: null,
      mowingHeight: null,
      rate: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    }),
}))
