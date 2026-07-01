'use client'

interface RoastItem {
  id: number
  icon: string
  title: string
  description: string
}

interface Props {
  roasts: RoastItem[]
}

const ICON_MAP: Record<string, string> = {
  'brak-liczb': '📊',
  'puste-frazy': '📝',
  'slabe-podsumowanie': '👤',
  'formatowanie': '📐',
  'slowa-kluczowe': '🔑',
  'doswiadczenie': '💼',
  'osiagniecia': '🏆',
  'red-flag': '🚩',
  'edukacja': '🎓',
  'jezyki': '🌍',
  'umiejetnosci': '🛠️',
}

export function RoastCards({ roasts }: Props) {
  if (!roasts || roasts.length === 0) {
    return (
      <div className="card text-center animate-fade-in-up-200">
        <p className="text-base" style={{ color: '#64748B' }}>
          Brak konkretnych uwag — to znaczy, że Twoje CV jest w bardzo dobrym stanie!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg" style={{ color: '#334155' }}>
        Co jest nie tak z Twoim CV?
      </h3>
      {roasts.map((roast, i) => (
        <div
          key={roast.id}
          className="roast-card animate-fade-in-up"
          style={{ animationDelay: `${400 + i * 150}ms`, animationFillMode: 'both' }}
        >
          <div className="flex gap-4">
            <span className="text-xl shrink-0 mt-0.5">
              {ICON_MAP[roast.icon] || '⚠️'}
            </span>
            <div>
              <h4 className="font-semibold text-sm mb-1.5" style={{ color: '#991B1B' }}>
                {roast.title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                {roast.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
