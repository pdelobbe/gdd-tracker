import { useApplicationStore } from '../../stores/useApplicationStore'

export function StepRate() {
  const { rate, date, notes, setRate, setDate, setNotes } = useApplicationStore()

  return (
    <div className="flex-1 flex flex-col min-h-0 p-4 gap-5 overflow-y-auto">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
        <p className="text-sm text-gray-500 mt-1">
          Confirm the rate, date, and add any notes
        </p>
      </div>

      {/* Rate */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rate (oz / 1,000 sq ft)
        </label>
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9.]*"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="0.00"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-green-400"
        />
        <p className="text-xs text-gray-400 mt-1">
          Auto-filled from product profile. Adjust if you used a different rate.
        </p>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Application Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-green-400"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. mixed with iron, applied early morning..."
          rows={3}
          maxLength={500}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-green-400 resize-none"
        />
      </div>
    </div>
  )
}
