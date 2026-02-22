import { useEffect, useState, useMemo } from 'react'
import { Layout } from '../components/Layout'
import { usePrimaryLocation } from '../db/hooks'
import { getWeatherForRange } from '../utils/weather'
import { computeGDDTimeseries, type GDDTimeseriesPoint } from '../utils/gdd'
import { formatTemp } from '../utils/temperature'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { SeasonType } from '../types'

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function HistoricalGDDScreen() {
  const location = usePrimaryLocation()
  const tempUnit = useSettingsStore((s) => s.tempUnit)
  const [seasonType, setSeasonType] = useState<SeasonType>('warm')
  const [weatherData, setWeatherData] = useState<{ date: string; tMaxC: number; tMinC: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch weather from Jan 1 to today
  useEffect(() => {
    if (!location) return
    setLoading(true)
    setError(null)

    const year = new Date().getFullYear()
    const startDate = `${year}-01-01`
    const today = new Date().toISOString().split('T')[0]

    getWeatherForRange(location.lat, location.lng, startDate, today)
      .then((data) => setWeatherData(data))
      .catch(() => setError('Failed to load weather data'))
      .finally(() => setLoading(false))
  }, [location])

  // Recompute timeseries when toggle changes (no refetch)
  const baseTempC = seasonType === 'cool' ? 0 : 10
  const timeseries = useMemo(
    () => computeGDDTimeseries(weatherData, baseTempC),
    [weatherData, baseTempC]
  )

  // Summary stats
  const totalGDD = timeseries.length > 0 ? timeseries[timeseries.length - 1].cumulativeGDD : 0
  const todayGDD = timeseries.length > 0 ? timeseries[timeseries.length - 1].dailyGDD : 0
  const avgDailyGDD = timeseries.length > 0
    ? Math.round((totalGDD / timeseries.length) * 10) / 10
    : 0

  // Recent 14 days
  const recentDays = timeseries.slice(-14)

  if (!location) {
    return (
      <Layout title="Seasonal GDD" showBack showNav={false}>
        <div className="p-8 text-center text-gray-400">Set up a location first</div>
      </Layout>
    )
  }

  return (
    <Layout title="Seasonal GDD" showBack showNav={false}>
      <div className="p-4 space-y-4">
        {/* Season toggle */}
        <div className="flex items-center gap-2 bg-white/80 rounded-xl p-1 border border-gray-200">
          <ToggleButton
            active={seasonType === 'warm'}
            label="Warm-Season"
            sublabel="Base 50°F / 10°C"
            onClick={() => setSeasonType('warm')}
          />
          <ToggleButton
            active={seasonType === 'cool'}
            label="Cool-Season"
            sublabel="Base 32°F / 0°C"
            onClick={() => setSeasonType('cool')}
          />
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="inline-block w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500 mt-3">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center text-red-500 text-sm">{error}</div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-2">
              <SummaryCard label="Season Total" value={Math.round(totalGDD)} unit="GDD" />
              <SummaryCard label="Today" value={todayGDD} unit="GDD" />
              <SummaryCard label="Daily Avg" value={avgDailyGDD} unit="GDD" />
            </div>

            {/* SVG Chart */}
            <div className="bg-white/80 rounded-2xl border border-gray-200 p-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Cumulative GDD — {new Date().getFullYear()}
              </p>
              <GDDChart timeseries={timeseries} />
            </div>

            {/* Recent days table */}
            <div className="bg-white/80 rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-green-50 px-3 py-2 border-b border-gray-200">
                <p className="font-semibold text-green-800 text-sm">Recent 14 Days</p>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-4 px-3 py-1.5 text-xs text-gray-400 font-medium">
                  <span>Date</span>
                  <span className="text-center">Hi / Lo</span>
                  <span className="text-center">Daily</span>
                  <span className="text-right">Total</span>
                </div>
                {recentDays.map((day, i) => {
                  const w = weatherData.find((wd) => wd.date === day.date)
                  return (
                    <div key={day.date} className={`grid grid-cols-4 px-3 py-2 text-sm ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                      <span className="text-gray-700">
                        {formatDayMonth(day.date)}
                      </span>
                      <span className="text-center text-gray-500 text-xs">
                        {w ? `${formatTemp(w.tMaxC, tempUnit)} / ${formatTemp(w.tMinC, tempUnit)}` : '—'}
                      </span>
                      <span className="text-center font-medium text-green-700">
                        {day.dailyGDD}
                      </span>
                      <span className="text-right text-gray-600">
                        {day.cumulativeGDD}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

function ToggleButton({ active, label, sublabel, onClick }: { active: boolean; label: string; sublabel: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 px-3 rounded-lg text-center transition-colors ${
        active
          ? 'bg-green-600 text-white shadow-sm'
          : 'text-gray-500 active:bg-gray-100'
      }`}
    >
      <p className="text-sm font-semibold">{label}</p>
      <p className={`text-xs ${active ? 'text-green-100' : 'text-gray-400'}`}>{sublabel}</p>
    </button>
  )
}

function SummaryCard({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="bg-white/80 rounded-xl border border-gray-200 p-3 text-center">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-xl font-bold text-gray-900 mt-0.5">{value}</p>
      <p className="text-xs text-gray-400">{unit}</p>
    </div>
  )
}

function formatDayMonth(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ── SVG Chart ──

const CHART_WIDTH = 360
const CHART_HEIGHT = 180
const CHART_PAD_LEFT = 45
const CHART_PAD_RIGHT = 10
const CHART_PAD_TOP = 10
const CHART_PAD_BOTTOM = 25

function GDDChart({ timeseries }: { timeseries: GDDTimeseriesPoint[] }) {
  if (timeseries.length === 0) {
    return <div className="h-[180px] flex items-center justify-center text-gray-400 text-sm">No data</div>
  }

  const maxGDD = Math.max(timeseries[timeseries.length - 1].cumulativeGDD, 1)
  const plotW = CHART_WIDTH - CHART_PAD_LEFT - CHART_PAD_RIGHT
  const plotH = CHART_HEIGHT - CHART_PAD_TOP - CHART_PAD_BOTTOM

  // Build path
  const points = timeseries.map((pt, i) => {
    const x = CHART_PAD_LEFT + (i / (timeseries.length - 1 || 1)) * plotW
    const y = CHART_PAD_TOP + plotH - (pt.cumulativeGDD / maxGDD) * plotH
    return { x, y }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const areaPath = linePath +
    ` L${points[points.length - 1].x.toFixed(1)},${(CHART_PAD_TOP + plotH).toFixed(1)}` +
    ` L${points[0].x.toFixed(1)},${(CHART_PAD_TOP + plotH).toFixed(1)} Z`

  // Y-axis gridlines
  const ySteps = niceSteps(maxGDD, 4)

  // Month markers on x-axis
  const monthMarkers = getMonthMarkers(timeseries, plotW)

  return (
    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="w-full h-auto">
      <defs>
        <linearGradient id="gddFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* Y-axis gridlines + labels */}
      {ySteps.map((val) => {
        const y = CHART_PAD_TOP + plotH - (val / maxGDD) * plotH
        return (
          <g key={val}>
            <line x1={CHART_PAD_LEFT} y1={y} x2={CHART_WIDTH - CHART_PAD_RIGHT} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
            <text x={CHART_PAD_LEFT - 4} y={y + 3} textAnchor="end" className="text-[9px]" fill="#9ca3af">
              {val}
            </text>
          </g>
        )
      })}

      {/* X-axis month labels */}
      {monthMarkers.map((m) => (
        <text key={m.label} x={m.x} y={CHART_HEIGHT - 4} textAnchor="middle" className="text-[9px]" fill="#9ca3af">
          {m.label}
        </text>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#gddFill)" />

      {/* Line */}
      <path d={linePath} fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Endpoint dot */}
      <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="3" fill="#16a34a" />
    </svg>
  )
}

function niceSteps(maxVal: number, count: number): number[] {
  if (maxVal <= 0) return [0]
  const rawStep = maxVal / count
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)))
  const normalized = rawStep / magnitude
  let niceStep: number
  if (normalized <= 1) niceStep = magnitude
  else if (normalized <= 2) niceStep = 2 * magnitude
  else if (normalized <= 5) niceStep = 5 * magnitude
  else niceStep = 10 * magnitude

  const steps: number[] = []
  for (let v = niceStep; v <= maxVal * 1.05; v += niceStep) {
    steps.push(Math.round(v))
  }
  return steps
}

function getMonthMarkers(timeseries: GDDTimeseriesPoint[], plotW: number) {
  const markers: { label: string; x: number }[] = []
  const total = timeseries.length
  if (total === 0) return markers

  let lastMonth = -1
  for (let i = 0; i < total; i++) {
    const month = parseInt(timeseries[i].date.split('-')[1], 10) - 1
    if (month !== lastMonth) {
      const x = CHART_PAD_LEFT + (i / (total - 1 || 1)) * plotW
      markers.push({ label: MONTH_LABELS[month], x })
      lastMonth = month
    }
  }

  return markers
}
