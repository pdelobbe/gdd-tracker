import { create } from 'zustand'
import type { ScreenName } from '../types'

interface NavigationState {
  screen: ScreenName
  backStack: ScreenName[]
  productIdForDetail: string | null
  navigate: (to: ScreenName, opts?: { productId?: string }) => void
  goBack: () => void
}

export const useNavigationStore = create<NavigationState>()((set, get) => ({
  screen: 'splash',
  backStack: [],
  productIdForDetail: null,
  navigate: (to, opts) =>
    set((s) => ({
      screen: to,
      backStack: [...s.backStack, s.screen],
      productIdForDetail: opts?.productId ?? s.productIdForDetail,
    })),
  goBack: () => {
    const { backStack } = get()
    if (backStack.length === 0) return
    const prev = backStack[backStack.length - 1]
    set({ screen: prev, backStack: backStack.slice(0, -1) })
  },
}))
