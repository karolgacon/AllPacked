export type DestinationWeather = {
  /** Short label for the headline, e.g. "Kyoto". */
  displayCity: string
  /** Full label for image alt text, e.g. "Kyoto, Japan". */
  city: string
  temperature: string
  /** High / low for today, e.g. "22°C / 14°C". */
  temperatureRange: string
  condition: string
  note: string
  imageClass: string
  imageUrl: string | null
  /** Trip window label, e.g. "April 12 – April 24, 2024". */
  periodLabel?: string
}
