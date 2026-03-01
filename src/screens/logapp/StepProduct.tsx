import { useProducts } from '../../db/hooks'
import { useApplicationStore } from '../../stores/useApplicationStore'

export function StepProduct() {
  const products = useProducts()
  const { selectedProductId, setSelectedProductId } = useApplicationStore()

  return (
    <div className="flex-1 flex flex-col min-h-0 p-4 gap-4">
      <div className="text-center shrink-0">
        <h2 className="text-xl font-bold text-gray-900">Select PGR Product</h2>
        <p className="text-sm text-gray-500 mt-1">
          Which product did you apply?
        </p>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 space-y-2">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => setSelectedProductId(product.id)}
            className={`w-full text-left p-4 rounded-xl transition-colors ${
              selectedProductId === product.id
                ? 'bg-green-50 ring-2 ring-green-500'
                : 'bg-white/80 border border-gray-200 active:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500 mt-0.5">{product.activeIngredient}</p>
                <p className="text-xs text-gray-400">{product.manufacturer}</p>
              </div>
              {selectedProductId === product.id && (
                <svg width="20" height="20" fill="none" stroke="#2f6e2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 10l4 4 8-8" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
