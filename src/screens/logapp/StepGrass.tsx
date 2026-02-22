import { useEffect } from 'react'
import { useApplicationStore } from '../../stores/useApplicationStore'
import { useProduct } from '../../db/hooks'
import { GRASS_OPTIONS } from '../../types'
import type { GrassType, MowingHeightCategory } from '../../types'

const MOWING_HEIGHT_OPTIONS: { value: MowingHeightCategory; label: string; description: string }[] = [
  { value: 'low', label: 'Low', description: 'Putting green / fairway height' },
  { value: 'medium', label: 'Medium', description: 'Standard lawn height' },
  { value: 'high', label: 'High', description: 'Taller / minimal mowing' },
]

export function StepGrass() {
  const { selectedProductId, grassType, mowingHeight, setGrassType, setMowingHeight, setRate } = useApplicationStore()
  const product = useProduct(selectedProductId)

  // Auto-populate rate when grass + height change
  useEffect(() => {
    if (!product || !grassType || !mowingHeight) return
    const profile = product.grassProfiles.find(
      (p) => p.grassType === grassType && p.mowingHeight === mowingHeight
    )
    if (profile) {
      setRate(String(profile.rateOzPer1000SqFt))
    }
  }, [product, grassType, mowingHeight, setRate])

  // Filter grass types to those the product supports
  const availableGrassTypes = product
    ? [...new Set(product.grassProfiles.map((p) => p.grassType))]
    : GRASS_OPTIONS.map((g) => g.id)

  const coolGrasses = GRASS_OPTIONS.filter(
    (g) => g.season === 'cool' && availableGrassTypes.includes(g.id)
  )
  const warmGrasses = GRASS_OPTIONS.filter(
    (g) => g.season === 'warm' && availableGrassTypes.includes(g.id)
  )

  // Filter mowing heights to those available for the selected grass
  const availableHeights = product && grassType
    ? [...new Set(product.grassProfiles.filter((p) => p.grassType === grassType).map((p) => p.mowingHeight))]
    : ['low', 'medium', 'high'] as MowingHeightCategory[]

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">Grass Type & Height</h2>
        <p className="text-sm text-gray-500 mt-1">
          Select your turfgrass and mowing height
        </p>
      </div>

      {/* Cool-season grasses */}
      {coolGrasses.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Cool-Season</p>
          <div className="grid grid-cols-2 gap-2">
            {coolGrasses.map((g) => (
              <GrassChip
                key={g.id}
                grassId={g.id}
                label={g.name}
                selected={grassType === g.id}
                onSelect={() => {
                  setGrassType(g.id)
                  // Reset mowing height if not available
                  if (product && mowingHeight) {
                    const hasHeight = product.grassProfiles.some(
                      (p) => p.grassType === g.id && p.mowingHeight === mowingHeight
                    )
                    if (!hasHeight) setMowingHeight(null as unknown as MowingHeightCategory)
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Warm-season grasses */}
      {warmGrasses.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Warm-Season</p>
          <div className="grid grid-cols-2 gap-2">
            {warmGrasses.map((g) => (
              <GrassChip
                key={g.id}
                grassId={g.id}
                label={g.name}
                selected={grassType === g.id}
                onSelect={() => {
                  setGrassType(g.id)
                  if (product && mowingHeight) {
                    const hasHeight = product.grassProfiles.some(
                      (p) => p.grassType === g.id && p.mowingHeight === mowingHeight
                    )
                    if (!hasHeight) setMowingHeight(null as unknown as MowingHeightCategory)
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mowing height */}
      {grassType && (
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Mowing Height</p>
          <div className="grid grid-cols-3 gap-2">
            {MOWING_HEIGHT_OPTIONS
              .filter((h) => availableHeights.includes(h.value))
              .map((h) => (
                <button
                  key={h.value}
                  onClick={() => setMowingHeight(h.value)}
                  className={`py-3 px-2 rounded-xl text-center transition-colors ${
                    mowingHeight === h.value
                      ? 'bg-green-600 text-white ring-2 ring-green-600 ring-offset-1'
                      : 'bg-white/80 text-gray-700 border border-gray-200 active:bg-gray-50'
                  }`}
                >
                  <p className="font-semibold text-sm">{h.label}</p>
                  <p className={`text-xs mt-0.5 ${mowingHeight === h.value ? 'text-green-100' : 'text-gray-400'}`}>
                    {h.description}
                  </p>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

function GrassChip({ grassId: _grassId, label, selected, onSelect }: { grassId: GrassType; label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
        selected
          ? 'bg-green-600 text-white ring-2 ring-green-600 ring-offset-1'
          : 'bg-white/80 text-gray-700 border border-gray-200 active:bg-gray-50'
      }`}
    >
      {label}
    </button>
  )
}
