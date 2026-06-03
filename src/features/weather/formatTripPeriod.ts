export function formatTripPeriod(startDate: string, endDate: string): string | null {
  if (!startDate) return null

  const start = new Date(`${startDate}T12:00:00`)
  const end = endDate ? new Date(`${endDate}T12:00:00`) : start

  const monthLong = (date: Date) =>
    new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)

  if (start.getTime() === end.getTime()) {
    return `${monthLong(start)} ${start.getDate()}, ${start.getFullYear()}`
  }

  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${monthLong(start)} ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`
  }

  const dayMonth = (date: Date) =>
    `${monthLong(date)} ${date.getDate()}`

  return `${dayMonth(start)} – ${dayMonth(end)}, ${end.getFullYear()}`
}
