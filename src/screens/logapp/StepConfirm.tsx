import { useState } from 'react'
import { useApplicationStore } from '../../stores/useApplicationStore'
import { useNavigationStore } from '../../stores/useNavigationStore'
import { useProduct, usePrimaryLocation, addApplication } from '../../db/hooks'
import { GRASS_OPTIONS } from '../../types'
import { formatDate } from '../../utils/date'

export function StepConfirm() {
  const store = useApplicationStore()
  const navigate = useNavigationStore((s) => s.navigate)
  const product = useProduct(store.selectedProductId)
  const location = usePrimaryLocation()
  const grassInfo = GRASS_OPTIONS.find((g) => g.id === store.grassType)
  const [saving, setSaving] = useState(false)

  // Get the GDD threshold from the product profile
  const profile = product?.grassProfiles.find(
    (p) => p.grassType === store.grassType && p.mowingHeight === store.mowingHeight
  )
  const gddThreshold = profile?.gddThreshold ?? 250

  const heightLabel = store.mowingHeight === 'low' ? 'Low' : store.mowingHeight === 'medium' ? 'Medium' : 'High'

  const handleSave = async () => {
    if (!store.selectedProductId || !store.grassType || !store.mowingHeight || !location) return
    setSaving(true)
    try {
      await addApplication({
        productId: store.selectedProductId,
        locationId: location.id,
        grassType: store.grassType,
        mowingHeight: store.mowingHeight,
        rateOzPer1000SqFt: parseFloat(store.rate) || 0,
        gddThreshold,
        appliedDate: store.date,
        accumulatedGDD: 0,
        notes: store.notes,
        isActive: true,
      })
      store.reset()
      navigate('home')
    } catch (e) {
      console.error('Failed to save application:', e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 p-4 gap-5 overflow-y-auto">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">Confirm Application</h2>
        <p className="text-sm text-gray-500 mt-1">
          Review the details and save
        </p>
      </div>

      <div className="bg-white/80 rounded-2xl border border-gray-200 divide-y divide-gray-100">
        <SummaryRow label="Product" value={product?.name ?? '—'} />
        <SummaryRow label="Grass Type" value={grassInfo?.name ?? '—'} />
        <SummaryRow label="Mowing Height" value={heightLabel} />
        <SummaryRow label="Rate" value={`${store.rate} oz/1,000 sq ft`} />
        <SummaryRow label="GDD Threshold" value={`${gddThreshold} GDD`} />
        <SummaryRow label="Applied Date" value={formatDate(store.date)} />
        {store.notes && <SummaryRow label="Notes" value={store.notes} />}
      </div>

      <div className="flex gap-3 safe-bottom">
        <button
          onClick={() => store.prevStep()}
          className="flex-1 py-3 rounded-xl bg-white/70 text-gray-700 font-semibold active:bg-white border border-gray-200"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 py-3 rounded-xl bg-green-600 text-white font-semibold active:bg-green-700 disabled:opacity-50 shadow-md shadow-green-900/20"
        >
          {saving ? 'Saving...' : 'Save Application'}
        </button>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between p-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right max-w-[60%]">{value}</span>
    </div>
  )
}
