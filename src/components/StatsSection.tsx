const STATS = [
  { number: '75%', label: 'CV odpada zanim zobaczy je rekruter', source: 'ATS Institute' },
  { number: '6 s', label: 'średni czas przeglądania CV przez rekrutera', source: 'The Ladders' },
  { number: '95%', label: 'rekruterów odrzuca CV bez konkretnych liczb', source: 'Jobvite' },
]

export function StatsSection() {
  return (
    <section className="section-padding" style={{ background: '#F1F5F9' }}>
      <div className="container-ocena">
        <h2 className="text-center font-bold mb-4" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
          Dlaczego Twoje CV musi być lepsze?
        </h2>
        <p className="text-center mb-16 max-w-xl mx-auto" style={{ color: '#94A3B8', fontSize: 16 }}>
          Rynek pracy jest bezlitosny. Oto dlaczego większość CV odpada.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center card stagger-enter">
              <div className="stat-number mb-2">{stat.number}</div>
              <p className="font-medium mb-1" style={{ fontSize: 15, lineHeight: 1.5 }}>{stat.label}</p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>Źródło: {stat.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
