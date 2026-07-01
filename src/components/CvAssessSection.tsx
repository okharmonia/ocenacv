'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { AssessResult, RoastLevel } from '@/lib/types'
import { UploadForm } from './UploadForm'
import { ResultScore } from './ResultScore'
import { RoastCards } from './RoastCards'

type AppState = 'upload' | 'loading' | 'result'

const LOADING_MESSAGES = [
  'Czytam Twoje CV...',
  'Szukam słabych punktów...',
  'Analizuję formatowanie...',
  'Sprawdzam słowa kluczowe...',
  'Oceniam osiągnięcia...',
  'Przygotowuję werdykt...',
]

export function CvAssessSection() {
  const [state, setState] = useState<AppState>('upload')
  const [result, setResult] = useState<AssessResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const [loadingMessages, setLoadingMessages] = useState<string[]>([])
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) clearInterval(loadingTimerRef.current)
    }
  }, [])

  const handleAssess = useCallback(async (
    cvText: string,
    targetRole?: string,
    roastLevel: RoastLevel = 'brutal'
  ) => {
    setState('loading')
    setError(null)
    setResult(null)

    // Animate loading messages
    setLoadingMessages([LOADING_MESSAGES[0]])
    let msgIndex = 0
    loadingTimerRef.current = setInterval(() => {
      msgIndex++
      if (msgIndex < LOADING_MESSAGES.length) {
        setLoadingMessages(prev => [...prev, LOADING_MESSAGES[msgIndex]])
      } else if (loadingTimerRef.current) {
        clearInterval(loadingTimerRef.current)
      }
    }, 2000)

    try {
      const res = await fetch('/api/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText, targetRole, roastLevel }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Błąd ${res.status}`)
      }
      const data = await res.json()
      setResult(data.result)
      setState('result')

      // Scroll to result after a tiny delay for animations
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Nie udało się przeanalizować CV. Spróbuj ponownie.')
      setState('upload')
    } finally {
      if (loadingTimerRef.current) {
        clearInterval(loadingTimerRef.current)
        loadingTimerRef.current = null
      }
    }
  }, [])

  const handleReset = useCallback(() => {
    setState('upload')
    setResult(null)
    setError(null)
  }, [])

  return (
    <section className="bg-slate-50 py-20 md:py-28 border-t border-slate-200" id="ocen-cv">
      <div className="container-ocena max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center font-bold mb-2 text-slate-900" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
            Sprawdź swoje CV
          </h2>
          <p className="text-center text-slate-500 mb-10 text-sm md:text-base">
            Wrzuć plik i dowiedz się, co rekruter myśli o Twoim CV. Bez rejestracji, bez zapisywania.
          </p>

          {state === 'result' ? (
            <div ref={resultRef} className="space-y-10">
              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="text-xs md:text-sm font-semibold flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 bg-white cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm leading-none">refresh</span>
                  Sprawdź inne CV
                </button>
              </div>
              {result && (
                <>
                  <ResultScore result={result} />
                  <RoastCards roasts={result.roasts} />
                  {result.atsBreakdown && (
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                      <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#F97316]">analytics</span>
                        Szczegółowa analiza ATS
                      </h3>
                      <ul className="space-y-4">
                        {result.atsBreakdown.map((point, i) => (
                          <li key={i} className="flex items-start gap-3.5 text-sm md:text-base leading-relaxed text-slate-600">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-xs font-bold bg-orange-500/10 text-[#EA580C]">
                              {i + 1}
                            </span>
                            <span className="font-medium">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : state === 'loading' ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm max-w-lg mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 bg-orange-500/10">
                <svg className="w-8 h-8 text-[#EA580C] animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-4">Trwa analiza...</h3>
              <div className="space-y-3 max-w-xs mx-auto">
                {loadingMessages.map((msg, i) => (
                  <p
                    key={i}
                    className="animate-fade-in text-sm text-slate-500 font-medium flex items-center justify-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 rounded-2xl flex items-start gap-3 animate-fade-in bg-red-50 border border-red-200">
                  <span className="material-symbols-outlined text-red-500 shrink-0">error</span>
                  <div>
                    <p className="font-bold text-sm text-red-800">Wystąpił błąd</p>
                    <p className="text-xs md:text-sm mt-0.5 text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}
              <UploadForm onAssess={handleAssess} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
