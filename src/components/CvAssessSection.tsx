'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { AssessResult, RoastLevel } from '@/lib/types'
import { UploadForm } from './UploadForm'
import { ResultScore } from './ResultScore'
import { RoastCards } from './RoastCards'

type AppState = 'upload' | 'loading' | 'result'

export function CvAssessSection() {
  const [state, setState] = useState<AppState>('upload')
  const [result, setResult] = useState<AssessResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const [loadingMessages, setLoadingMessages] = useState<string[]>([])
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null)

  const LOADING_MESSAGES = [
    'Czytam Twoje CV...',
    'Szukam słabych punktów...',
    'Analizuję formatowanie...',
    'Sprawdzam słowa kluczowe...',
    'Oceniam osiągnięcia...',
    'Przygotowuję werdykt...',
  ]

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
    <section className="section-padding" id="ocen-cv" style={{ background: '#F1F5F9' }}>
      <div className="container-ocena">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center font-bold mb-2" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
            Sprawdź swoje CV
          </h2>
          <p className="text-center mb-10" style={{ color: '#94A3B8', fontSize: 16 }}>
            Wrzuć plik i dowiedz się, co rekruter myśli o Twoim CV. Bez rejestracji, bez zapisywania.
          </p>

          {state === 'result' ? (
            <div ref={resultRef} className="space-y-8">
              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="text-sm font-medium flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors"
                  style={{ color: '#64748B' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#334155')}
                  onMouseOut={e => (e.currentTarget.style.color = '#64748B')}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                  </svg>
                  Sprawdź inne CV
                </button>
              </div>
              {result && (
                <>
                  <ResultScore result={result} />
                  <RoastCards roasts={result.roasts} />
                  {result.atsBreakdown && (
                    <div className="card">
                      <h3 className="font-bold text-lg mb-4">Szczegółowa analiza ATS</h3>
                      <ul className="space-y-2">
                        {result.atsBreakdown.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: '#475569' }}>
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-xs font-bold" style={{ background: 'rgba(249,115,22,0.1)', color: '#F97316' }}>
                              {i + 1}
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : state === 'loading' ? (
            <div className="card text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto" style={{ background: 'rgba(249,115,22,0.1)' }}>
                <svg className="w-8 h-8 text-ocena-amber animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
              <div className="space-y-3">
                {loadingMessages.map((msg, i) => (
                  <p
                    key={i}
                    className="animate-fade-in text-base"
                    style={{ color: '#64748B' }}
                  >
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 rounded-xl flex items-start gap-3 animate-fade-in" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                  <svg className="w-5 h-5 shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#991B1B' }}>Wystąpił błąd</p>
                    <p className="text-sm mt-1" style={{ color: '#B91C1C' }}>{error}</p>
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
