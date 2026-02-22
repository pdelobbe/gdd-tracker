import { getProgressPercent, getProgressZone } from '../utils/gdd'

interface GDDProgressBarProps {
  accumulated: number
  threshold: number
}

export function GDDProgressBar({ accumulated, threshold }: GDDProgressBarProps) {
  const percent = getProgressPercent(accumulated, threshold)
  const zone = getProgressZone(percent)

  const barColor =
    zone === 'red'
      ? 'bg-red-500'
      : zone === 'yellow'
      ? 'bg-yellow-400'
      : 'bg-green-500'

  return (
    <div className="w-full">
      <div className="relative h-7 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 ${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.max(percent, 2)}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            {Math.round(accumulated)} / {threshold} GDD
          </span>
        </div>
      </div>
    </div>
  )
}
