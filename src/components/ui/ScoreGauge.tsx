'use client'

interface Props {
  score: number
  maxScore: number
  color: string
}

export function ScoreGauge({ score, maxScore, color }: Props) {
  const radius = 76
  const circumference = 2 * Math.PI * radius
  const progress = score / maxScore
  const offset = circumference * (1 - progress)

  return (
    <div className="score-gauge mx-auto">
      <svg width="100%" height="100%" viewBox="0 0 176 176">
        <circle
          className="bg-circle"
          cx="88"
          cy="88"
          r={radius}
        />
        <circle
          className="fill-circle"
          cx="88"
          cy="88"
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-number">
        <span
          className="font-extrabold leading-none tracking-tight"
          style={{
            fontSize: 'clamp(40px, 6vw, 56px)',
            color,
          }}
        >
          {score}
        </span>
        <span className="text-sm font-medium" style={{ color: '#94A3B8' }}>
          / {maxScore}
        </span>
      </div>
    </div>
  )
}
