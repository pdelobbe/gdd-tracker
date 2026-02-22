import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  message: string
  description?: string
  ctaLabel?: string
  onCta?: () => void
}

export function EmptyState({ icon, message, description, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {icon ?? (
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2f6e2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-800 mb-1">{message}</h3>
      {description && (
        <p className="text-sm text-gray-500 mb-6 max-w-xs">{description}</p>
      )}
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold active:bg-green-700 shadow-md shadow-green-900/20"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  )
}
