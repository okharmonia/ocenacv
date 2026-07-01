'use client'

interface RoastItem {
  id: number
  icon: string
  title: string
  description: string
  recommendation?: string
}

interface Props {
  roasts: RoastItem[]
}

const MATERIAL_ICON_MAP: Record<string, string> = {
  'brak-liczb': 'analytics',
  'puste-frazy': 'description',
  'slabe-podsumowanie': 'assignment_ind',
  'formatowanie': 'grid_view',
  'slowa-kluczowe': 'key',
  'doswiadczenie': 'work',
  'osiagniecia': 'military_tech',
  'red-flag': 'flag',
  'edukacja': 'school',
  'jezyki': 'language',
  'umiejetnosci': 'build',
}

const RECOMMENDATION_MAP: Record<string, string> = {
  'brak-liczb': 'Dodaj %, PLN, USD lub konkretne liczby (np. wielkość zespołu).',
  'puste-frazy': 'Zamień frazesy na fakty. Pokaż konkretne rezultaty.',
  'slabe-podsumowanie': 'Napisz 3 zdania: kim jesteś, co osiągnąłeś i co oferujesz firmie.',
  'formatowanie': 'Przejdź na czysty układ jednokolumnowy, bez tabel i grafik.',
  'slowa-kluczowe': 'Wpisz dokładnie te technologie i skille, które są w ogłoszeniu.',
  'doswiadczenie': 'Opisz projekty przez pryzmat swojej roli i osiągniętego sukcesu.',
  'osiagniecia': 'Użyj formuły: "Zrobiłem X, co przyniosło Y, mierzone jako Z".',
  'red-flag': 'Zweryfikuj sekcję i usuń wszystko, co może zniechęcić rekrutera.',
}

export function RoastCards({ roasts }: Props) {
  if (!roasts || roasts.length === 0) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
        <p className="text-base text-slate-500 font-semibold">
          Brak krytycznych uwag — Twoje CV wygląda naprawdę solidnie!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <h2 className="font-extrabold text-2xl md:text-3xl text-center text-slate-900">
        Największe grzechy Twojego CV
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roasts.map((roast, i) => {
          const isDoubleSpan = i === 3 // Make 4th card double span for bento rhythm
          const icon = MATERIAL_ICON_MAP[roast.icon] || 'warning'
          const recommendation = roast.recommendation || RECOMMENDATION_MAP[roast.icon] || 'Rekomendacja: Popraw ten element, aby podnieść ocenę.'

          if (isDoubleSpan) {
            return (
              <div
                key={roast.id}
                className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-[#EF4444] transition-all duration-300 group flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="w-14 h-14 bg-red-50 text-[#EF4444] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{roast.title}</h3>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-4">{roast.description}</p>
                  <div className="pt-4 border-t border-slate-100 italic text-[#EF4444] text-xs md:text-sm font-semibold">
                    Rekomendacja: {recommendation}
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div
              key={roast.id}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-[#EF4444] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-red-50 text-[#EF4444] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <span className="material-symbols-outlined text-2xl">{icon}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-3">{roast.title}</h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6">{roast.description}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 italic text-[#EF4444] text-xs md:text-sm font-semibold">
                Rekomendacja: {recommendation}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
