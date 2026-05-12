import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'
import { env } from '@/shared/config/env'

export function PageViewTracker() {
  const location = useLocation()

  useEffect(() => {
    if (!env.enableAnalytics || !env.gaMeasurementId) return

    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    })
  }, [location])

  return null
}
