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
    <section className="section-padding bg-white" id="przyklad">
      <div className="container-ocena">
        <h2 className="text-center font-bold mb-4" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
          Zobacz, co możesz zyskać
        </h2>
        <p className="text-center mb-16 max-w-xl mx-auto" style={{ color: '#94A3B8', fontSize: 16 }}>
          Przykład transformacji przed i po użyciu profesjonalnego generatora CV.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="before-col">
            <div className="flex items-center justify-between mb-6">
              <span style={{ fontSize: 48 }}>{BEFORE.badge}</span>
              <span className="inline-flex items-center gap-2 font-extrabold text-2xl" style={{ color: '#DC2626' }}>
                {BEFORE.score}
                <span className="text-sm font-normal" style={{ color: '#94A3B8' }}>/100</span>
              </span>
            </div>
            <div className="space-y-3">
              {BEFORE.lines.map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                  <span style={{ color: '#991B1B', fontSize: 14, lineHeight: 1.6 }}>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="after-col relative">
            <div className="flex items-center justify-between mb-6">
              <span style={{ fontSize: 48 }}>{AFTER.badge}</span>
              <span className="inline-flex items-center gap-2 font-extrabold text-2xl" style={{ color: '#059669' }}>
                {AFTER.score}
                <span className="text-sm font-normal" style={{ color: '#94A3B8' }}>/100</span>
              </span>
            </div>
            <div className="space-y-3">
              {AFTER.lines.map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  <span style={{ color: '#065F46', fontSize: 14, lineHeight: 1.6 }}>{line}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1' }}>
                gen-cv.pl
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
