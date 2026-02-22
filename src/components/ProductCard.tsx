import type { Product } from '../types'

interface ProductCardProps {
  product: Product
  onTap: () => void
}

export function ProductCard({ product, onTap }: ProductCardProps) {
  return (
    <button
      onClick={onTap}
      className="w-full text-left p-4 active:bg-gray-50 flex items-center gap-3"
    >
      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-700 shrink-0">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{product.name}</p>
        <p className="text-sm text-gray-500 truncate">
          {product.activeIngredient} &middot; {product.manufacturer}
        </p>
      </div>
      <svg width="20" height="20" fill="none" stroke="#a09688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  )
}
