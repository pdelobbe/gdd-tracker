import { Layout } from '../components/Layout'
import { useProduct } from '../db/hooks'
import { useNavigationStore } from '../stores/useNavigationStore'
import { GRASS_OPTIONS } from '../types'

export function ProductDetailScreen() {
  const productId = useNavigationStore((s) => s.productIdForDetail)
  const product = useProduct(productId)

  if (!product) {
    return (
      <Layout title="Product" showBack showNav={false}>
        <div className="p-8 text-center text-gray-400">Product not found</div>
      </Layout>
    )
  }

  // Group profiles by grass type
  const profilesByGrass = new Map<string, typeof product.grassProfiles>()
  for (const profile of product.grassProfiles) {
    const list = profilesByGrass.get(profile.grassType) ?? []
    list.push(profile)
    profilesByGrass.set(profile.grassType, list)
  }

  return (
    <Layout title={product.name} showBack showNav={false}>
      <div className="p-4 space-y-5">
        {/* Product info */}
        <div className="bg-white/80 rounded-2xl border border-gray-200 p-4 space-y-2">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Active Ingredient</p>
            <p className="font-medium text-gray-900">{product.activeIngredient}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Manufacturer</p>
            <p className="font-medium text-gray-900">{product.manufacturer}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Description</p>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Grass profiles table */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-3">GDD Thresholds by Grass Type</h3>
          <div className="space-y-3">
            {[...profilesByGrass.entries()].map(([grassType, profiles]) => {
              const grassInfo = GRASS_OPTIONS.find((g) => g.id === grassType)
              return (
                <div key={grassType} className="bg-white/80 rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-green-50 px-3 py-2 border-b border-gray-200">
                    <p className="font-semibold text-green-800 text-sm">
                      {grassInfo?.name ?? grassType}
                      <span className="text-xs text-gray-400 font-normal ml-2">
                        ({grassInfo?.season === 'cool' ? 'Cool-season' : 'Warm-season'})
                      </span>
                    </p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="grid grid-cols-3 px-3 py-1.5 text-xs text-gray-400 font-medium">
                      <span>Height</span>
                      <span className="text-center">GDD</span>
                      <span className="text-right">Rate (oz)</span>
                    </div>
                    {profiles.map((p) => (
                      <div key={`${p.grassType}-${p.mowingHeight}`} className="grid grid-cols-3 px-3 py-2 text-sm">
                        <span className="text-gray-700 capitalize">{p.mowingHeight}</span>
                        <span className="text-center font-medium text-green-700">{p.gddThreshold}</span>
                        <span className="text-right text-gray-600">{p.rateOzPer1000SqFt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}
