import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './database'
import type { Product, Application, Location, DailyGDDRecord, WeatherCache } from '../types'
import { generateId } from '../utils/uuid'

// ── Location hooks ──

export function useLocations() {
  return useLiveQuery(() => db.locations.toArray()) ?? []
}

export function usePrimaryLocation(): Location | undefined {
  return useLiveQuery(() => db.locations.toCollection().first())
}

export async function addLocation(loc: Omit<Location, 'id' | 'createdAt'>): Promise<Location> {
  const record: Location = {
    ...loc,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  await db.locations.add(record)
  return record
}

export async function updateLocation(id: string, updates: Partial<Location>) {
  await db.locations.update(id, updates)
}

// ── Product hooks ──

export function useProducts() {
  return useLiveQuery(() => db.products.toArray()) ?? []
}

export function useProduct(id: string | null): Product | undefined {
  return useLiveQuery(
    () => (id ? db.products.get(id) : undefined),
    [id]
  )
}

// ── Application hooks ──

export function useApplications() {
  return useLiveQuery(() =>
    db.applications.orderBy('appliedDate').reverse().toArray()
  ) ?? []
}

export function useActiveApplications() {
  return useLiveQuery(() =>
    db.applications.where('isActive').equals(1).reverse().sortBy('appliedDate')
  ) ?? []
}

export async function addApplication(app: Omit<Application, 'id' | 'createdAt'>): Promise<Application> {
  const record: Application = {
    ...app,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  await db.applications.add(record)
  return record
}

export async function updateApplication(id: string, updates: Partial<Application>) {
  await db.applications.update(id, updates)
}

export async function deleteApplication(id: string) {
  await db.transaction('rw', db.applications, db.dailyGDDRecords, async () => {
    await db.dailyGDDRecords.where('applicationId').equals(id).delete()
    await db.applications.delete(id)
  })
}

// ── Daily GDD Records ──

export function useGDDRecordsForApplication(applicationId: string | null): DailyGDDRecord[] {
  return (
    useLiveQuery(
      () =>
        applicationId
          ? db.dailyGDDRecords.where('applicationId').equals(applicationId).sortBy('date')
          : ([] as DailyGDDRecord[]),
      [applicationId]
    ) ?? []
  )
}

export async function addDailyGDDRecord(record: Omit<DailyGDDRecord, 'id'>): Promise<DailyGDDRecord> {
  const full: DailyGDDRecord = { ...record, id: generateId() }
  await db.dailyGDDRecords.add(full)
  return full
}

export async function bulkAddDailyGDDRecords(records: Omit<DailyGDDRecord, 'id'>[]) {
  const fullRecords = records.map((r) => ({ ...r, id: generateId() }))
  await db.dailyGDDRecords.bulkAdd(fullRecords)
}

export async function getGDDRecordsForApplication(applicationId: string): Promise<DailyGDDRecord[]> {
  return db.dailyGDDRecords.where('applicationId').equals(applicationId).sortBy('date')
}

// ── Weather Cache ──

export async function getCachedWeather(lat: number, lng: number, date: string): Promise<WeatherCache | undefined> {
  const roundedLat = Math.round(lat * 100) / 100
  const roundedLng = Math.round(lng * 100) / 100
  return db.weatherCache
    .where('[lat+lng+date]')
    .equals([roundedLat, roundedLng, date])
    .first()
}

export async function cacheWeather(data: Omit<WeatherCache, 'id'>): Promise<void> {
  const roundedLat = Math.round(data.lat * 100) / 100
  const roundedLng = Math.round(data.lng * 100) / 100
  const existing = await db.weatherCache
    .where('[lat+lng+date]')
    .equals([roundedLat, roundedLng, data.date])
    .first()
  if (existing) {
    await db.weatherCache.update(existing.id, { ...data, lat: roundedLat, lng: roundedLng })
  } else {
    await db.weatherCache.add({ ...data, id: generateId(), lat: roundedLat, lng: roundedLng })
  }
}

export async function bulkCacheWeather(records: Omit<WeatherCache, 'id'>[]) {
  for (const record of records) {
    await cacheWeather(record)
  }
}

// ── Seed check ──

export async function isSeeded(): Promise<boolean> {
  const count = await db.products.count()
  return count > 0
}

export async function seedProducts(products: Product[]) {
  await db.products.bulkAdd(products)
}
