/**
 * Format a date string (YYYY-MM-DD or ISO) as "Mon DD, YYYY"
 */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'))
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format a date as "Mon DD"
 */
export function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'))
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Get today's date as YYYY-MM-DD.
 */
export function todayString(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Get the number of days between two date strings.
 */
export function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA + (dateA.includes('T') ? '' : 'T00:00:00'))
  const b = new Date(dateB + (dateB.includes('T') ? '' : 'T00:00:00'))
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

/**
 * Get a date string offset by N days from a given date.
 */
export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'))
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}
