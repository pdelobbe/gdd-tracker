import Dexie, { type Table } from 'dexie'
import type { Product, Application, Location, DailyGDDRecord, WeatherCache, UserSettings } from '../types'

class GDDTrackerDB extends Dexie {
  locations!: Table<Location>
  products!: Table<Product>
  applications!: Table<Application>
  dailyGDDRecords!: Table<DailyGDDRecord>
  weatherCache!: Table<WeatherCache>
  userSettings!: Table<UserSettings>

  constructor() {
    super('GDDTrackerDB')

    this.version(1).stores({
      locations: 'id, name',
      products: 'id, name',
      applications: 'id, productId, locationId, isActive, appliedDate',
      dailyGDDRecords: 'id, applicationId, date',
      weatherCache: 'id, [lat+lng+date], date',
      userSettings: 'id, key',
    })

    // Version 2: bermuda cultivar breakout — clear products to trigger re-seed
    this.version(2).stores({
      locations: 'id, name',
      products: 'id, name',
      applications: 'id, productId, locationId, isActive, appliedDate',
      dailyGDDRecords: 'id, applicationId, date',
      weatherCache: 'id, [lat+lng+date], date',
      userSettings: 'id, key',
    }).upgrade(async (tx) => {
      await tx.table('products').clear()
    })
  }
}

export const db = new GDDTrackerDB()
