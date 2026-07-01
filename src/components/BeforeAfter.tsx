const BEFORE = {
  score: 34,
  badge: '☆☆☆',
  lines: [
    'Pracowałem na stronie firmowej',
    'Pomagałem w różnych zadaniach',
    'Byłem odpowiedzialny za frontend',
    'Podsumowanie: "Jestem pracowitym graczem zespołowym szukającym możliwości rozwoju"',
  ],
}
const AFTER = {
  score: 88,
  badge: '★★★★★',
  lines: [
    'Zbudowałem aplikację React dla 10 000+ użytkowników, poprawiając wydajność o 35%',
    'Kierowałem zespołem 5 osób, skracając czas wdrożenia o 40%',
    'Zaprojektowałem bibliotekę komponentów używaną przez 15 programistów',
    'Podsumowanie: "Full-stack engineer z 4-letnim doświadczeniem w aplikacjach produkcyjnych na dużą skalę"',
  ],
}

export function BeforeAfter() {
  return (
    <section className="bg-white py-20 md:py-28" id="przyklad">
      <div className="container-ocena max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-4 text-slate-900" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
            Zobacz, co możesz zyskać
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            Przykład transformacji przed i po użyciu profesjonalnego generatora CV.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-3xl">☆☆☆</span>
                <span className="inline-flex items-center gap-1.5 font-extrabold text-2xl text-[#EF4444]">
                  {BEFORE.score}
                  <span className="text-sm font-normal text-slate-400">/100</span>
                </span>
              </div>
              <div className="space-y-4">
                {BEFORE.lines.map((line, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-[#EF4444] text-lg shrink-0 mt-0.5">cancel</span>
                    <span className="text-[#991B1B] text-sm md:text-base font-medium leading-relaxed">{line}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-red-100 text-xs font-bold text-[#EF4444] uppercase tracking-wider">
              Przed transformacją
            </div>
          </div>

          {/* After */}
          <div className="relative bg-green-50/50 border border-green-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                gen-cv.pl
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-3xl text-yellow-500">★★★★★</span>
                <span className="inline-flex items-center gap-1.5 font-extrabold text-2xl text-[#10B981]">
                  {AFTER.score}
                  <span className="text-sm font-normal text-slate-400">/100</span>
                </span>
              </div>
              <div className="space-y-4">
                {AFTER.lines.map((line, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-[#10B981] text-lg shrink-0 mt-0.5">check_circle</span>
                    <span className="text-[#065F46] text-sm md:text-base font-semibold leading-relaxed">{line}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-green-100 text-xs font-bold text-[#10B981] uppercase tracking-wider">
              Po transformacji przez AI
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
