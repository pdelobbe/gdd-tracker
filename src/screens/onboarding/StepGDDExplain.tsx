export function StepGDDExplain() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">What are Growing Degree Days?</h2>
        <p className="text-sm text-gray-500 mt-1">
          A quick intro to the science behind PGR timing
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3 items-start bg-white/60 rounded-2xl p-4">
          <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">1</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Temperature drives growth</p>
            <p className="text-sm text-gray-500 mt-0.5">
              Turfgrass growth is driven by temperature, not just calendar days. Warmer days = faster growth.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start bg-white/60 rounded-2xl p-4">
          <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">2</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">GDD measures heat accumulation</p>
            <p className="text-sm text-gray-500 mt-0.5">
              Each day, we calculate GDD from the average of the high and low temperatures minus a base temperature. These accumulate over time.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start bg-white/60 rounded-2xl p-4">
          <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">3</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">PGRs wear off at specific GDD</p>
            <p className="text-sm text-gray-500 mt-0.5">
              Each PGR product has a research-backed GDD threshold. When accumulated GDD reaches that threshold, it's time to reapply.
            </p>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-sm text-green-800 text-center">
            <strong>Bottom line:</strong> GDD tracking gives you the most accurate reapplication timing based on actual growing conditions, not guesswork.
          </p>
        </div>
      </div>
    </div>
  )
}
