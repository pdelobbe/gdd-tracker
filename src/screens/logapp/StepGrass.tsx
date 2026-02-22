import { useEffect, useState } from 'react'
import { useApplicationStore } from '../../stores/useApplicationStore'
import { useProduct } from '../../db/hooks'
import { GRASS_OPTIONS, isBermudaCultivar } from '../../types'
import type { GrassType, MowingHeightCategory } from '../../types'

const MOWING_HEIGHT_OPTIONS: { value: MowingHeightCategory; label: string; description: string }[] = [
  { value: 'low', label: 'Low', description: 'Putting green / fairway height' },
  { value: 'medium', label: 'Medium', description: 'Standard lawn height' },
  { value: 'high', label: 'High', description: 'Taller / minimal mowing' },
]

export function StepGrass() {
  const { selectedProductId, grassType, mowingHeight, setGrassType, setMowingHeight, setRate } = useApplicationStore()
  const product = useProduct(selectedProductId)
  const [bermudaExpanded, setBermudaExpanded] = useState(false)

  // Auto-expand bermuda panel if a cultivar is already selected
  useEffect(() => {
    if (grassType && isBermudaCultivar(grassType)) {
      setBermudaExpanded(true)
    }
  }, [grassType])

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

  // Top-level grasses: exclude entries with parentId (cultivars shown in sub-panel)
  const topLevelGrasses = GRASS_OPTIONS.filter((g) => !g.parentId)

  // Check if any bermuda cultivar is available for this product
  const hasBermudaCultivars = availableGrassTypes.some(
    (id) => GRASS_OPTIONS.find((g) => g.id === id)?.parentId === 'bermudagrass'
  )

  const coolGrasses = topLevelGrasses.filter(
    (g) => g.season === 'cool' && availableGrassTypes.includes(g.id)
  )

  // For warm-season, show parent bermuda if any bermuda cultivar is available
  const warmGrasses = topLevelGrasses.filter((g) => {
    if (g.season !== 'warm') return false
    if (g.id === 'bermudagrass') {
      return availableGrassTypes.includes('bermudagrass') || hasBermudaCultivars
    }
    return availableGrassTypes.includes(g.id)
  })

  // Bermuda cultivars for the sub-panel
  const bermudaCultivars = GRASS_OPTIONS.filter(
    (g) => g.parentId === 'bermudagrass' && availableGrassTypes.includes(g.id)
  )
  // Include "Common Bermuda" in the cultivar panel too
  const allBermudaOptions = [
    GRASS_OPTIONS.find((g) => g.id === 'bermudagrass')!,
    ...bermudaCultivars,
  ]

  // Filter mowing heights to those available for the selected grass
  const availableHeights = product && grassType
    ? [...new Set(product.grassProfiles.filter((p) => p.grassType === grassType).map((p) => p.mowingHeight))]
    : ['low', 'medium', 'high'] as MowingHeightCategory[]

  const handleGrassSelect = (id: GrassType) => {
    if (id === 'bermudagrass') {
      // Toggle bermuda cultivar panel
      if (bermudaExpanded) {
        setBermudaExpanded(false)
      } else {
        setBermudaExpanded(true)
      }
      return
    }
    setBermudaExpanded(false)
    setGrassType(id)
    if (product && mowingHeight) {
      const hasHeight = product.grassProfiles.some(
        (p) => p.grassType === id && p.mowingHeight === mowingHeight
      )
      if (!hasHeight) setMowingHeight(null as unknown as MowingHeightCategory)
    }
  }

  const handleCultivarSelect = (id: GrassType) => {
    setGrassType(id)
    if (product && mowingHeight) {
      const hasHeight = product.grassProfiles.some(
        (p) => p.grassType === id && p.mowingHeight === mowingHeight
      )
      if (!hasHeight) setMowingHeight(null as unknown as MowingHeightCategory)
    }
  }

  const isBermudaSelected = grassType !== null && isBermudaCultivar(grassType)

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
                label={g.name}
                selected={grassType === g.id}
                onSelect={() => handleGrassSelect(g.id)}
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
            {warmGrasses.map((g) => {
              if (g.id === 'bermudagrass') {
                return (
                  <GrassChip
                    key={g.id}
                    label="Bermudagrass"
                    selected={bermudaExpanded || isBermudaSelected}
                    chevron
                    expanded={bermudaExpanded}
                    onSelect={() => handleGrassSelect(g.id)}
                  />
                )
              }
              return (
                <GrassChip
                  key={g.id}
                  label={g.name}
                  selected={grassType === g.id}
                  onSelect={() => handleGrassSelect(g.id)}
                />
              )
            })}
          </div>

          {/* Bermuda cultivar sub-panel */}
          {bermudaExpanded && (
            <div className="mt-2 bg-green-50/70 rounded-xl border border-green-200 p-3">
              <p className="text-xs font-semibold text-green-700 mb-2">Select Cultivar</p>
              <div className="grid grid-cols-2 gap-2">
                {allBermudaOptions.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleCultivarSelect(g.id)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      grassType === g.id
                        ? 'bg-green-600 text-white ring-2 ring-green-600 ring-offset-1'
                        : 'bg-white text-gray-700 border border-gray-200 active:bg-gray-50'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          )}
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

function GrassChip({ label, selected, onSelect, chevron, expanded }: {
  label: string
  selected: boolean
  onSelect: () => void
  chevron?: boolean
  expanded?: boolean
}) {
  return (
    <button
      onClick={onSelect}
      className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
        selected
          ? 'bg-green-600 text-white ring-2 ring-green-600 ring-offset-1'
          : 'bg-white/80 text-gray-700 border border-gray-200 active:bg-gray-50'
      }`}
    >
      {label}
      {chevron && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      )}
    </button>
  )
}
