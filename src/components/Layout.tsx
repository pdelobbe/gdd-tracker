import { type ReactNode } from 'react'
import { useNavigationStore } from '../stores/useNavigationStore'
import { BottomNav } from './BottomNav'

interface LayoutProps {
  children: ReactNode
  title: string
  showBack?: boolean
  showHeader?: boolean
  showBottomNav?: boolean
}

export function Layout({ children, title, showBack, showHeader = true, showBottomNav = true }: LayoutProps) {
  const { goBack } = useNavigationStore()

  return (
    <div className="flex flex-col h-full max-w-[480px] mx-auto bg-cream shadow-xl shadow-black/5">
      {showHeader && (
        <header className="flex items-center px-4 py-3.5 bg-gradient-to-b from-green-800 to-green-600 text-white shrink-0 safe-top shadow-md shadow-green-900/30">
          <div className="flex items-center gap-2">
            {showBack && (
              <button onClick={goBack} className="p-2 -ml-2 rounded-lg active:bg-white/20" aria-label="Go back">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}
            <h1 className="text-lg font-bold">{title}</h1>
          </div>
        </header>
      )}
      <main className={`flex-1 overflow-hidden flex flex-col min-h-0 ${!showHeader ? 'safe-top' : ''}`}>
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  )
}
