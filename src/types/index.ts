export type ScreenName =
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'logApp'
  | 'settings'
  | 'productList'
  | 'productDetail'

export type TempUnit = 'F' | 'C'

export type SeasonType = 'cool' | 'warm'

export type GrassType =
  | 'kentucky_bluegrass'
  | 'perennial_ryegrass'
  | 'tall_fescue'
  | 'fine_fescue'
  | 'creeping_bentgrass'
  | 'bermudagrass'
  | 'zoysiagrass'
  | 'st_augustinegrass'
  | 'buffalograss'
  | 'centipedegrass'

export type MowingHeightCategory = 'low' | 'medium' | 'high'

export type ProgressZone = 'green' | 'yellow' | 'red'

export interface GrassInfo {
  id: GrassType
  name: string
  season: SeasonType
}

export const GRASS_OPTIONS: GrassInfo[] = [
  { id: 'kentucky_bluegrass', name: 'Kentucky Bluegrass', season: 'cool' },
  { id: 'perennial_ryegrass', name: 'Perennial Ryegrass', season: 'cool' },
  { id: 'tall_fescue', name: 'Tall Fescue', season: 'cool' },
  { id: 'fine_fescue', name: 'Fine Fescue', season: 'cool' },
  { id: 'creeping_bentgrass', name: 'Creeping Bentgrass', season: 'cool' },
  { id: 'bermudagrass', name: 'Bermudagrass', season: 'warm' },
  { id: 'zoysiagrass', name: 'Zoysiagrass', season: 'warm' },
  { id: 'st_augustinegrass', name: 'St. Augustinegrass', season: 'warm' },
  { id: 'buffalograss', name: 'Buffalograss', season: 'warm' },
  { id: 'centipedegrass', name: 'Centipedegrass', season: 'warm' },
]

export interface GrassProfile {
  grassType: GrassType
  mowingHeight: MowingHeightCategory
  gddThreshold: number
  rateOzPer1000SqFt: number
}

export interface Product {
  id: string
  name: string
  activeIngredient: string
  manufacturer: string
  description: string
  grassProfiles: GrassProfile[]
}

export interface Location {
  id: string
  name: string
  lat: number
  lng: number
  zipCode: string
  createdAt: string
}

export interface Application {
  id: string
  productId: string
  locationId: string
  grassType: GrassType
  mowingHeight: MowingHeightCategory
  rateOzPer1000SqFt: number
  gddThreshold: number
  appliedDate: string
  accumulatedGDD: number
  notes: string
  isActive: boolean
  createdAt: string
}

export interface DailyGDDRecord {
  id: string
  applicationId: string
  date: string
  tMax: number
  tMin: number
  gdd: number
}

export interface WeatherCache {
  id: string
  lat: number
  lng: number
  date: string
  tMax: number
  tMin: number
  fetchedAt: string
}

export interface UserSettings {
  id: string
  key: string
  value: string
}
