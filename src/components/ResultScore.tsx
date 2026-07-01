'use client'

import { useEffect, useState } from 'react'
import type { AssessResult } from '@/lib/types'
import { ScoreGauge } from './ui/ScoreGauge'

interface Props {
  result: AssessResult
}

const SCORE_COLORS = {
  low: { gauge: '#EF4444', text: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
  mid: { gauge: '#F97316', text: '#EA580C', bg: '#FFF7ED', border: '#FED7AA' },
  good: { gauge: '#EAB308', text: '#CA8A04', bg: '#FEFCE8', border: '#FEF08A' },
  great: { gauge: '#10B981', text: '#059669', bg: '#F0FDF4', border: '#BBF7D0' },
}

const ONE_LINERS: Record<string, string> = {
  low: 'Rekruter odrzuci to CV w 6 sekund.',
  mid: 'Przeciętne CV. Nie wyróżnia się, nie przekonuje.',
  good: 'Nadaje się do poprawy. Brakuje konkretów.',
  great: 'Dobre CV. Jeszcze kilka poprawek i będzie świetnie.',
}

function getScoreTier(score: number): keyof typeof SCORE_COLORS {
  if (score <= 35) return 'low'
  if (score <= 55) return 'mid'
  if (score <= 75) return 'good'
  return 'great'
}

export function ResultScore({ result }: Props) {
  const tier = getScoreTier(result.score)
  const colors = SCORE_COLORS[tier]
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    // Animate score counter
    const duration = 1500
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(eased * result.score))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [result.score])

  return (
    <div className="card text-center animate-fade-in-up" style={{ background: colors.bg, borderColor: colors.border, borderWidth: 1, borderStyle: 'solid' }}>
      <h3 className="font-bold text-lg mb-6" style={{ color: colors.text }}>
        Twój wynik
      </h3>

      <ScoreGauge score={displayScore} maxScore={100} color={colors.gauge} />

      <p className="text-lg font-semibold mt-4" style={{ color: colors.text }}>
        {result.score <= 35
          ? 'Rekruter odrzuci to CV w 6 sekund.'
          : result.score <= 55
          ? 'Przeciętne CV. Nie wyróżnia się, nie przekonuje.'
          : result.score <= 75
          ? 'Nadaje się do poprawy. Brakuje konkretów.'
          : 'Dobre CV. Jeszcze kilka poprawek i będzie świetnie.'}
      </p>

      <p className="text-sm mt-3 max-w-lg mx-auto" style={{ color: '#64748B' }}>
        {result.oneLiner}
      </p>
    </div>
  )
}
