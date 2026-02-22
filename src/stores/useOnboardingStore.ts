import { create } from 'zustand'

interface OnboardingState {
  step: number
  zipCode: string
  lat: number | null
  lng: number | null
  locationName: string
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setZipCode: (zip: string) => void
  setCoords: (lat: number, lng: number) => void
  setLocationName: (name: string) => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  step: 1,
  zipCode: '',
  lat: null,
  lng: null,
  locationName: '',
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 3) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
  setZipCode: (zip) => set({ zipCode: zip }),
  setCoords: (lat, lng) => set({ lat, lng }),
  setLocationName: (name) => set({ locationName: name }),
  reset: () =>
    set({
      step: 1,
      zipCode: '',
      lat: null,
      lng: null,
      locationName: '',
    }),
}))
