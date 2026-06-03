type WikipediaSummary = {
  thumbnail?: { source: string }
  originalimage?: { source: string }
}

type WikipediaQueryPages = {
  query?: {
    pages?: Record<
      string,
      {
        title?: string
        missing?: string
        thumbnail?: { source: string }
      }
    >
  }
}

type WikipediaGeoResponse = {
  query?: {
    pages?: Record<
      string,
      {
        title?: string
        thumbnail?: { source: string }
      }
    >
  }
}

const CITY_WIKI_TITLES: Record<string, string[]> = {
  'New York': ['New York City', 'Manhattan'],
  Paris: ['Paris'],
  Bali: ['Bali', 'Denpasar'],
  Kyoto: ['Kyoto'],
  London: ['London'],
  Tokyo: ['Tokyo'],
}

function upscaleWikimediaThumb(url: string): string {
  return url.replace(/\/\d+px-/, '/640px-')
}

function buildTitleCandidates(name: string, country?: string): string[] {
  const candidates: string[] = []

  const aliases = CITY_WIKI_TITLES[name]
  if (aliases) candidates.push(...aliases)

  candidates.push(name)

  if (country && !name.includes(',')) {
    candidates.push(`${name}, ${country}`)
  }

  return [...new Set(candidates)]
}

function buildSearchQueries(name: string, country?: string): string[] {
  const queries: string[] = []

  const aliases = CITY_WIKI_TITLES[name]
  if (aliases) queries.push(...aliases)

  if (country) queries.push(`${name} ${country}`)
  queries.push(name)

  return [...new Set(queries)]
}

async function fetchSummaryImage(title: string): Promise<string | null> {
  const slug = encodeURIComponent(title.trim().replace(/ /g, '_'))
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`,
  )

  if (!response.ok) return null

  const data = (await response.json()) as WikipediaSummary
  const source = data.originalimage?.source ?? data.thumbnail?.source
  return source ? upscaleWikimediaThumb(source) : null
}

async function fetchOpenSearchTitles(query: string, limit = 6): Promise<string[]> {
  const url = new URL('https://en.wikipedia.org/w/api.php')
  url.searchParams.set('action', 'opensearch')
  url.searchParams.set('search', query)
  url.searchParams.set('limit', String(limit))
  url.searchParams.set('namespace', '0')
  url.searchParams.set('format', 'json')
  url.searchParams.set('origin', '*')

  const response = await fetch(url)
  if (!response.ok) return []

  const [, titles] = (await response.json()) as [unknown, string[]]
  return titles ?? []
}

async function fetchImagesForTitles(titles: string[]): Promise<string | null> {
  const uniqueTitles = [...new Set(titles.filter(Boolean))]
  if (uniqueTitles.length === 0) return null

  const url = new URL('https://en.wikipedia.org/w/api.php')
  url.searchParams.set('action', 'query')
  url.searchParams.set('titles', uniqueTitles.join('|'))
  url.searchParams.set('prop', 'pageimages')
  url.searchParams.set('piprop', 'thumbnail')
  url.searchParams.set('pithumbsize', '640')
  url.searchParams.set('redirects', '1')
  url.searchParams.set('format', 'json')
  url.searchParams.set('origin', '*')

  const response = await fetch(url)
  if (!response.ok) return null

  const data = (await response.json()) as WikipediaQueryPages
  const pages = Object.values(data.query?.pages ?? {})

  for (const title of uniqueTitles) {
    const page = pages.find((entry) => entry.title === title && !entry.missing)
    if (page?.thumbnail?.source) {
      return upscaleWikimediaThumb(page.thumbnail.source)
    }
  }

  for (const page of pages) {
    if (page.thumbnail?.source && !page.missing) {
      return upscaleWikimediaThumb(page.thumbnail.source)
    }
  }

  return null
}

async function fetchGeoImage(latitude: number, longitude: number): Promise<string | null> {
  const url = new URL('https://en.wikipedia.org/w/api.php')
  url.searchParams.set('action', 'query')
  url.searchParams.set('generator', 'geosearch')
  url.searchParams.set('ggscoord', `${latitude}|${longitude}`)
  url.searchParams.set('ggsradius', '20000')
  url.searchParams.set('ggslimit', '8')
  url.searchParams.set('prop', 'pageimages')
  url.searchParams.set('piprop', 'thumbnail')
  url.searchParams.set('pithumbsize', '640')
  url.searchParams.set('format', 'json')
  url.searchParams.set('origin', '*')

  const response = await fetch(url)
  if (!response.ok) return null

  const data = (await response.json()) as WikipediaGeoResponse
  const pages = Object.values(data.query?.pages ?? {})

  for (const page of pages) {
    if (page.thumbnail?.source) {
      return upscaleWikimediaThumb(page.thumbnail.source)
    }
  }

  return null
}

export async function fetchLocationImageUrl(
  name: string,
  country: string | undefined,
  latitude: number,
  longitude: number,
): Promise<string | null> {
  const titleCandidates = buildTitleCandidates(name, country)

  const [summaryResults, queryImage] = await Promise.all([
    Promise.all(titleCandidates.map((title) => fetchSummaryImage(title))),
    fetchImagesForTitles(titleCandidates),
  ])

  const summaryHit = summaryResults.find(Boolean)
  if (summaryHit) return summaryHit
  if (queryImage) return queryImage

  const searchQueries = buildSearchQueries(name, country)
  const opensearchTitleGroups = await Promise.all(
    searchQueries.map((query) => fetchOpenSearchTitles(query)),
  )
  const opensearchTitles = [...new Set(opensearchTitleGroups.flat())]
  const opensearchImage = await fetchImagesForTitles(opensearchTitles)
  if (opensearchImage) return opensearchImage

  return fetchGeoImage(latitude, longitude)
}
