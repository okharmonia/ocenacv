'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export function GoogleAnalytics() {
  const [consent, setConsent] = useState<boolean>(false)
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-MVYST48R3P'

  useEffect(() => {
    const checkConsent = () => {
      const stored = localStorage.getItem('cookie-consent')
      if (stored === 'accepted') {
        setConsent(true)
      }
    }

    // Check on mount
    checkConsent()

    // Listen for custom event when user clicks accept in the banner
    window.addEventListener('cookie-consent-changed', checkConsent)

    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent)
    }
  }, [])

  if (!consent || !gaId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
