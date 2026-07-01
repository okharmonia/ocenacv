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
      const eased = 1 - Math.pow(1 - progress, 3) // Ease-out cubic
      setDisplayScore(Math.round(eased * result.score))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [result.score])

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 text-center shadow-sm max-w-3xl mx-auto animate-fade-in-up">
      <div className="relative inline-flex items-center justify-center mb-8">
        <ScoreGauge score={displayScore} maxScore={100} color={colors.gauge} />
      </div>

      <div className="space-y-4">
        <h1 className="font-extrabold text-2xl md:text-4xl text-slate-900 leading-tight">
          {result.score <= 35 ? (
            <>
              Rekruter odrzuci to CV w <span className="text-[#EF4444] underline decoration-wavy decoration-2">6 sekund</span>
            </>
          ) : result.score <= 55 ? (
            <>
              Przeciętne CV. <span className="text-[#F97316]">Nie wyróżnia się</span>, nie przekonuje.
            </>
          ) : result.score <= 75 ? (
            <>
              Nadaje się do poprawy. <span className="text-[#EAB308]">Brakuje konkretów</span>.
            </>
          ) : (
            <>
              Dobre CV! <span className="text-[#10B981]">Jeszcze kilka poprawek</span> i będzie świetnie.
            </>
          )}
        </h1>
        
        <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto font-medium leading-relaxed">
          {result.oneLiner}
        </p>
      </div>
    </div>
  )
}
