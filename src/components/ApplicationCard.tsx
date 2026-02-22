import { useEffect, useState, useCallback } from 'react'
import type { Application } from '../types'
import { useProduct, usePrimaryLocation, getGDDRecordsForApplication, bulkAddDailyGDDRecords, updateApplication } from '../db/hooks'
import { GDDProgressBar } from './GDDProgressBar'
import { getWeatherForRange } from '../utils/weather'
import { calculateDailyGDD, accumulateGDD, getEstimatedReapplicationDate } from '../utils/gdd'
import { formatDate, formatShortDate, todayString } from '../utils/date'
import { GRASS_OPTIONS } from '../types'

interface ApplicationCardProps {
  application: Application
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const product = useProduct(application.productId)
  const location = usePrimaryLocation()
  const grassInfo = GRASS_OPTIONS.find((g) => g.id === application.grassType)
  const [accumulated, setAccumulated] = useState(application.accumulatedGDD)
  const [estimatedDate, setEstimatedDate] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const refreshGDD = useCallback(async () => {
    if (!location || refreshing) return
    setRefreshing(true)
    try {
      const today = todayString()
      const existingRecords = await getGDDRecordsForApplication(application.id)
      const existingDates = new Set(existingRecords.map((r) => r.date))

      // Fetch weather from applied date to today
      const weather = await getWeatherForRange(
        location.lat, location.lng,
        application.appliedDate, today
      )

      const season = grassInfo?.season ?? 'cool'
      const newRecords = weather
        .filter((w) => !existingDates.has(w.date))
        .map((w) => ({
          applicationId: application.id,
          date: w.date,
          tMax: w.tMaxC,
          tMin: w.tMinC,
          gdd: calculateDailyGDD(w.tMaxC, w.tMinC, season),
        }))

      if (newRecords.length > 0) {
        await bulkAddDailyGDDRecords(newRecords)
      }

      // Recalculate total
      const allRecords = await getGDDRecordsForApplication(application.id)
      const dailyValues = allRecords.map((r) => r.gdd)
      const total = accumulateGDD(dailyValues)

      setAccumulated(total)
      await updateApplication(application.id, { accumulatedGDD: total })

      // Estimate reapplication date
      const estDate = getEstimatedReapplicationDate(
        application.appliedDate, total, application.gddThreshold, dailyValues
      )
      setEstimatedDate(estDate)
    } catch (e) {
      console.error('Failed to refresh GDD:', e)
    } finally {
      setRefreshing(false)
    }
  }, [location, application, grassInfo, refreshing])

  useEffect(() => {
    refreshGDD()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const heightLabel = application.mowingHeight === 'low' ? 'Low cut' : application.mowingHeight === 'medium' ? 'Medium cut' : 'High cut'

  return (
    <div className="bg-white/80 rounded-2xl border border-gray-200 p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900">{product?.name ?? 'Unknown Product'}</h3>
          <p className="text-sm text-gray-500">
            {grassInfo?.name ?? application.grassType} &middot; {heightLabel}
          </p>
        </div>
        <p className="text-xs text-gray-400">
          Applied {formatShortDate(application.appliedDate)}
        </p>
      </div>

      <GDDProgressBar accumulated={accumulated} threshold={application.gddThreshold} />

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          {application.rateOzPer1000SqFt} oz/1,000 sq ft
        </span>
        {estimatedDate ? (
          <span className="font-medium text-green-700">
            Reapply ~{formatDate(estimatedDate.toISOString())}
          </span>
        ) : accumulated >= application.gddThreshold ? (
          <span className="font-medium text-red-500">Ready to reapply</span>
        ) : refreshing ? (
          <span className="text-gray-400">Updating...</span>
        ) : null}
      </div>
    </div>
  )
}
