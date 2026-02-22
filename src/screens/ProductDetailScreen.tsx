import { Layout } from '../components/Layout'
import { useProduct } from '../db/hooks'
import { useNavigationStore } from '../stores/useNavigationStore'
import { GRASS_OPTIONS, isBermudaCultivar } from '../types'
import type { GrassProfile } from '../types'

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

  // Separate bermuda and non-bermuda profiles
  const bermudaProfiles: GrassProfile[] = []
  const otherProfiles = new Map<string, GrassProfile[]>()

  for (const profile of product.grassProfiles) {
    if (isBermudaCultivar(profile.grassType)) {
      bermudaProfiles.push(profile)
    } else {
      const list = otherProfiles.get(profile.grassType) ?? []
      list.push(profile)
      otherProfiles.set(profile.grassType, list)
    }
  }

  // Group bermuda profiles by cultivar
  const bermudaByCultivar = new Map<string, GrassProfile[]>()
  for (const profile of bermudaProfiles) {
    const list = bermudaByCultivar.get(profile.grassType) ?? []
    list.push(profile)
    bermudaByCultivar.set(profile.grassType, list)
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
            {/* Non-bermuda grasses */}
            {[...otherProfiles.entries()].map(([grassType, profiles]) => {
              const grassInfo = GRASS_OPTIONS.find((g) => g.id === grassType)
              return (
                <GrassProfileCard
                  key={grassType}
                  name={grassInfo?.name ?? grassType}
                  seasonLabel={grassInfo?.season === 'cool' ? 'Cool-season' : 'Warm-season'}
                  profiles={profiles}
                />
              )
            })}

            {/* Bermuda cultivars grouped under parent heading */}
            {bermudaByCultivar.size > 0 && (
              <div className="space-y-2">
                <div className="bg-green-100 rounded-xl px-3 py-2">
                  <p className="font-bold text-green-800 text-sm">
                    Bermudagrass
                    <span className="text-xs text-gray-500 font-normal ml-2">(Warm-season)</span>
                  </p>
                </div>
                {[...bermudaByCultivar.entries()].map(([grassType, profiles]) => {
                  const grassInfo = GRASS_OPTIONS.find((g) => g.id === grassType)
                  return (
                    <div key={grassType} className="ml-3">
                      <GrassProfileCard
                        name={grassInfo?.name ?? grassType}
                        profiles={profiles}
                        compact
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

function GrassProfileCard({ name, seasonLabel, profiles, compact }: {
  name: string
  seasonLabel?: string
  profiles: GrassProfile[]
  compact?: boolean
}) {
  return (
    <div className="bg-white/80 rounded-xl border border-gray-200 overflow-hidden">
      <div className={`${compact ? 'bg-green-50/60' : 'bg-green-50'} px-3 py-2 border-b border-gray-200`}>
        <p className={`font-semibold text-green-800 ${compact ? 'text-xs' : 'text-sm'}`}>
          {name}
          {seasonLabel && (
            <span className="text-xs text-gray-400 font-normal ml-2">({seasonLabel})</span>
          )}
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
}
