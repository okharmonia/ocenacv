'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-MVYST48R3P'

  useEffect(() => {
    const updateConsentState = () => {
      const stored = localStorage.getItem('cookie-consent')
      if (typeof window !== 'undefined' && (window as any).gtag) {
        if (stored === 'accepted') {
          (window as any).gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
          })
        } else if (stored === 'declined') {
          (window as any).gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
          })
        }
      }
    }

    // Run check on mount
    updateConsentState()

    // Listen for consent changes
    window.addEventListener('cookie-consent-changed', updateConsentState)

    return () => {
      window.removeEventListener('cookie-consent-changed', updateConsentState)
    }
  }, [])

  if (!gaId) return null

  return (
    <>
      {/* Google Consent Mode v2 Default Settings */}
      <Script id="google-consent-mode" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          var storedConsent = null;
          try {
            storedConsent = localStorage.getItem('cookie-consent');
          } catch(e) {}
          
          var defaultState = storedConsent === 'accepted' ? 'granted' : 'denied';
          
          gtag('consent', 'default', {
            'ad_storage': defaultState,
            'ad_user_data': defaultState,
            'ad_personalization': defaultState,
            'analytics_storage': defaultState
          });
        `}
      </Script>
      
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
