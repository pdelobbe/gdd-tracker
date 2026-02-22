interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-3">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i + 1 === currentStep
              ? 'w-8 h-3 bg-green-600'
              : i + 1 < currentStep
              ? 'w-3 h-3 bg-green-400'
              : 'w-3 h-3 bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}
