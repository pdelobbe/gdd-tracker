import { useNavigationStore } from '../stores/useNavigationStore'
import type { ScreenName } from '../types'

const TABS: { id: string; label: string; screen: ScreenName }[] = [
  { id: 'home', label: 'Dashboard', screen: 'home' },
  { id: 'products', label: 'Products', screen: 'productList' },
  { id: 'settings', label: 'Settings', screen: 'settings' },
]

function getActiveTab(screen: ScreenName): string {
  if (screen === 'home' || screen === 'historicalGDD' || screen === 'splash') return 'home'
  if (screen === 'productList' || screen === 'productDetail') return 'products'
  if (screen === 'settings') return 'settings'
  return 'home'
}

export function BottomNav() {
  const { screen, navigateTab } = useNavigationStore()
  const activeTab = getActiveTab(screen)

  return (
    <nav className="shrink-0 flex items-center justify-around bg-white/95 backdrop-blur-sm border-t border-gray-200 min-h-[52px] safe-bottom">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => navigateTab(tab.screen)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 ${
              isActive ? 'text-green-600' : 'text-gray-400'
            }`}
            aria-label={tab.label}
          >
            <TabIcon id={tab.id} active={isActive} />
            <span className={`text-[11px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

function TabIcon({ id, active }: { id: string; active: boolean }) {
  const sw = active ? 2 : 1.5

  switch (id) {
    case 'home':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    case 'products':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    case 'settings':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      )
    default:
      return null
  }
}
