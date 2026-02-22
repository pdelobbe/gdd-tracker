import type { TempUnit } from '../types'

export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32
}

export function fahrenheitToCelsius(f: number): number {
  return ((f - 32) * 5) / 9
}

export function formatTemp(tempC: number, unit: TempUnit): string {
  if (unit === 'F') {
    return `${Math.round(celsiusToFahrenheit(tempC))}°F`
  }
  return `${Math.round(tempC)}°C`
}
