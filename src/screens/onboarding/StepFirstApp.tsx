export function StepFirstApp() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 p-3 min-h-0">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg shadow-green-300/40">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#2f6e2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">You're All Set!</h2>
        <p className="text-gray-500 mt-3 max-w-xs leading-relaxed">
          Your location is saved and ready for weather tracking.
          Log your first PGR application to start counting Growing Degree Days.
        </p>
      </div>
    </div>
  )
}
