'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    // Trigger custom event to notify GoogleAnalytics component
    window.dispatchEvent(new Event('cookie-consent-changed'))
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-[100] animate-fade-in">
      <div className="p-6 rounded-3xl backdrop-blur-md bg-[#0F172A]/95 border border-white/10 shadow-2xl text-left">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-orange-500/10 text-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-2xl">cookie</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-white mb-1">
              Pliki cookie i prywatność
            </h4>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-4">
              Używamy plików cookie w celu analizy ruchu i ulepszenia działania serwisu. Szczegóły znajdziesz w naszej{' '}
              <Link href="/privacy" className="underline text-orange-400 hover:text-orange-300">
                Polityce prywatności
              </Link>.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer text-center"
              >
                Akceptuję
              </button>
              <button
                onClick={handleDecline}
                className="text-slate-400 hover:text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Odrzucam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
