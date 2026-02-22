import { type ReactNode } from 'react'
import { useNavigationStore } from '../stores/useNavigationStore'

interface LayoutProps {
  children: ReactNode
  title: string
  showBack?: boolean
  showNav?: boolean
}

export function Layout({ children, title, showBack, showNav = true }: LayoutProps) {
  const { navigate, goBack } = useNavigationStore()

  return (
    <div className="flex flex-col h-full max-w-[480px] mx-auto bg-cream min-h-screen shadow-xl shadow-black/5">
      <header className="relative flex items-center justify-between px-4 py-3.5 bg-gradient-to-b from-green-800 to-green-600 text-white shrink-0 safe-top shadow-md shadow-green-900/30">
        {/* Left: back button or spacer */}
        <div className="flex items-center gap-2 min-w-[40px]">
          {showBack && (
            <button onClick={goBack} className="p-1 -ml-1 active:opacity-70" aria-label="Go back">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
        </div>
        {/* Center: title */}
        <h1 className="flex-1 text-center text-lg font-bold whitespace-nowrap">{title}</h1>
        {/* Right: nav icons or spacer */}
        <div className="min-w-[40px] flex justify-end">
          {showNav && (
            <div className="flex items-center gap-1">
              <button onClick={() => navigate('home')} className="p-1.5 rounded-lg active:bg-white/10" aria-label="Home">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </button>
              <button onClick={() => navigate('productList')} className="p-1.5 rounded-lg active:bg-white/10" aria-label="Products">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </button>
              <button onClick={() => navigate('settings')} className="p-1.5 rounded-lg active:bg-white/10" aria-label="Settings">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 overflow-y-auto safe-bottom">
        {children}
      </main>
    </div>
  )
}
