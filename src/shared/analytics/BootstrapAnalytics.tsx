import { useEffect } from 'react'
import Hotjar from '@hotjar/browser'
import ReactGA from 'react-ga4'
import { env } from '@/shared/config/env'

export function BootstrapAnalytics() {
  useEffect(() => {
    if (!env.enableAnalytics) return

    if (env.gaMeasurementId) {
      ReactGA.initialize(env.gaMeasurementId)
    }

    if (env.contentsquareScriptUrl) {
      const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${env.contentsquareScriptUrl}"]`,
      )

      if (!existingScript) {
        const script = document.createElement('script')
        script.src = env.contentsquareScriptUrl
        script.async = true
        document.head.appendChild(script)
      }
    }

    if (env.hotjarSiteId) {
      Hotjar.init(Number(env.hotjarSiteId), env.hotjarVersion)
    }
  }, [])

  return null
}
