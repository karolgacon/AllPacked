import { useMemo, useState } from 'react'
import { Card } from '@/shared/components/ui'
import { useTripWizard, WizardNavigation, WizardStepper } from '@/features/trip-wizard'
import { CalendarIcon } from '@/features/trip-wizard/components/WizardIcons'

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

type VisibleMonth = {
  year: number
  monthIndex: number
}

type CalendarCell = {
  dateIso: string
  day: number
  inCurrentMonth: boolean
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function dateFromIso(dateIso: string) {
  return new Date(`${dateIso}T12:00:00`)
}

function todayAtNoon() {
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  return today
}

function monthFromDate(date: Date): VisibleMonth {
  return { year: date.getFullYear(), monthIndex: date.getMonth() }
}

function monthFromIso(dateIso: string): VisibleMonth {
  return monthFromDate(dateIso ? dateFromIso(dateIso) : todayAtNoon())
}

function currentMonth(): VisibleMonth {
  return monthFromDate(todayAtNoon())
}

function moveMonth(month: VisibleMonth, delta: number): VisibleMonth {
  const date = new Date(month.year, month.monthIndex + delta, 1, 12)
  return { year: date.getFullYear(), monthIndex: date.getMonth() }
}

function generateCalendarCells({ year, monthIndex }: VisibleMonth): CalendarCell[] {
  const firstDay = new Date(year, monthIndex, 1, 12)
  const leadingDays = firstDay.getDay()

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(year, monthIndex, index - leadingDays + 1, 12)

    return {
      dateIso: toIsoDate(date),
      day: date.getDate(),
      inCurrentMonth: date.getMonth() === monthIndex,
    }
  })
}

function formatMonthLabel({ year, monthIndex }: VisibleMonth) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, monthIndex, 1, 12))
}

function formatDate(dateIso: string) {
  if (!dateIso) return 'Select date'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(dateFromIso(dateIso))
}

function formatDateRange(startDate: string, endDate: string) {
  if (!startDate && !endDate) return 'Select dates'
  if (!endDate) return `${formatDate(startDate)} - select end`
  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

function durationNights(startDate: string, endDate: string) {
  if (!startDate || !endDate) return 0
  const start = dateFromIso(startDate).getTime()
  const end = dateFromIso(endDate).getTime()
  return Math.max(1, Math.round((end - start) / 86_400_000))
}

function isWithinRange(dateIso: string, startDate: string, endDate: string) {
  if (!startDate || !endDate) return false
  return dateIso >= startDate && dateIso <= endDate
}

function seasonalTip(startDate: string, visibleMonth: VisibleMonth) {
  const date = startDate ? dateFromIso(startDate) : new Date(visibleMonth.year, visibleMonth.monthIndex, 1)
  const month = date.getMonth()
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)

  if ([11, 0, 1].includes(month)) {
    return {
      title: `${monthName} is cold.`,
      text: 'Pack thermal layers, gloves and shoes with good grip.',
    }
  }

  if ([2, 3, 4].includes(month)) {
    return {
      title: `${monthName} is changeable.`,
      text: 'Bring light layers and a compact rain shell.',
    }
  }

  if ([5, 6, 7].includes(month)) {
    return {
      title: `${monthName} is warm.`,
      text: 'Pack breathable clothes, sunglasses and sunscreen.',
    }
  }

  return {
    title: `${monthName} is mild.`,
    text: 'Remember comfortable layers for cooler evenings.',
  }
}

export function NewTripDatesPage() {
  const { wizard, setDates } = useTripWizard()
  const [visibleMonth, setVisibleMonth] = useState<VisibleMonth>(() => currentMonth())
  const cells = useMemo(() => generateCalendarCells(visibleMonth), [visibleMonth])
  const todayIso = toIsoDate(todayAtNoon())
  const nights = durationNights(wizard.dates.startDate, wizard.dates.endDate)
  const canContinue = Boolean(wizard.dates.startDate && wizard.dates.endDate)
  const tip = seasonalTip(wizard.dates.startDate, visibleMonth)

  const selectDate = (dateIso: string) => {
    const { startDate, endDate } = wizard.dates
    setVisibleMonth(monthFromIso(dateIso))

    if (!startDate || endDate) {
      setDates({ startDate: dateIso, endDate: '' })
      return
    }

    if (dateIso < startDate) {
      setDates({ startDate: dateIso, endDate: startDate })
      return
    }

    setDates({ endDate: dateIso })
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <WizardStepper activeStep="dates" />

      <header className="text-center">
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          When are you traveling?
        </h1>
        <p className="mt-2 text-sm text-brand-text">
          Select any travel window to customize your packing list for the season.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="p-5 sm:p-8">
          <div className="mb-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setVisibleMonth((current) => moveMonth(current, -1))}
              className="rounded-lg p-2 text-brand-text transition hover:bg-brand-bg hover:text-brand-primary"
              aria-label="Previous month"
            >
              <span aria-hidden="true">&lt;</span>
            </button>
            <div className="inline-flex items-center gap-3 text-sm font-semibold text-slate-950">
              <span className="inline-flex items-center gap-2">
                <CalendarIcon className="size-4 text-brand-primary" />
                {formatMonthLabel(visibleMonth)}
              </span>
              <button
                type="button"
                onClick={() => setVisibleMonth(currentMonth())}
                className="rounded-full border border-brand-border bg-white px-3 py-1 text-xs font-semibold text-brand-primary transition hover:bg-brand-bg"
              >
                Today
              </button>
            </div>
            <button
              type="button"
              onClick={() => setVisibleMonth((current) => moveMonth(current, 1))}
              className="rounded-lg p-2 text-brand-text transition hover:bg-brand-bg hover:text-brand-primary"
              aria-label="Next month"
            >
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-4 text-center text-xs font-medium text-brand-text">
            {weekdayLabels.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-7 gap-y-3 overflow-hidden rounded-xl text-center text-sm">
            {cells.map((cell) => {
              const isStart = cell.dateIso === wizard.dates.startDate
              const isEnd = cell.dateIso === wizard.dates.endDate
              const isToday = cell.dateIso === todayIso
              const isSelected = isWithinRange(
                cell.dateIso,
                wizard.dates.startDate,
                wizard.dates.endDate,
              )
              const hasCompleteRange = Boolean(wizard.dates.startDate && wizard.dates.endDate)
              const roundedClass =
                isStart && isEnd
                  ? 'rounded-lg'
                  : isStart
                    ? hasCompleteRange
                      ? 'rounded-l-lg'
                      : 'rounded-lg'
                    : isEnd
                      ? 'rounded-r-lg'
                      : 'rounded-none'

              return (
                <button
                  key={cell.dateIso}
                  type="button"
                  onClick={() => selectDate(cell.dateIso)}
                  className={`h-12 ${roundedClass} text-sm transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary/30 ${
                    isStart || isEnd
                      ? 'bg-brand-primary font-semibold text-white'
                      : isSelected
                        ? 'bg-brand-bg text-brand-primary'
                        : cell.inCurrentMonth
                          ? 'text-slate-700 hover:bg-brand-bg'
                          : 'text-slate-300 hover:bg-brand-bg hover:text-brand-text'
                  } ${isToday && !isStart && !isEnd ? 'ring-1 ring-inset ring-brand-primary/50' : ''}`}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>
        </Card>

        <aside className="flex flex-col gap-5">
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-slate-950">Trip Summary</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-brand-border pb-4">
                <dt className="text-brand-text">Destination</dt>
                <dd className="text-right font-semibold text-brand-primary">
                  {wizard.destination || 'Not selected'}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-brand-border pb-4">
                <dt className="text-brand-text">Duration</dt>
                <dd className="font-semibold text-brand-primary">
                  {nights} {nights === 1 ? 'Night' : 'Nights'}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-brand-text">Dates</dt>
                <dd className="text-right font-semibold text-brand-primary">
                  {formatDateRange(wizard.dates.startDate, wizard.dates.endDate)}
                </dd>
              </div>
            </dl>
          </Card>

          <div className="rounded-2xl bg-brand-primary p-6 text-white shadow-[0_12px_30px_rgba(0,89,187,0.25)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Pro Tip
            </p>
            <h3 className="mt-16 text-xl font-semibold">{tip.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{tip.text}</p>
          </div>
        </aside>
      </div>

      <WizardNavigation
        backTo="/new-trip/destination"
        nextTo="/new-trip/transport"
        disabled={!canContinue}
      />
    </div>
  )
}
