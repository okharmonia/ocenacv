const STATS = [
  { number: '75%', label: 'CV odpada zanim zobaczy je rekruter', source: 'ATS Institute' },
  { number: '6 sekund', label: 'średni czas przeglądania CV przez rekrutera', source: 'The Ladders' },
  { number: '95%', label: 'rekruterów odrzuca CV bez konkretnych liczb', source: 'Jobvite' },
]

export function StatsSection() {
  return (
    <section className="bg-slate-50 py-20 md:py-28 border-y border-slate-200" id="stats">
      <div className="container-ocena max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)', color: '#0d1c2f' }}>
            Dlaczego Twoje CV musi być lepsze?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            Rynek pracy jest bezlitosny. Oto dlaczego większość aplikacji trafia do kosza.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-[#9d4300] mb-4">{stat.number}</div>
              <p className="font-semibold text-sm md:text-base text-slate-700 mb-2 leading-snug">{stat.label}</p>
              <p className="text-xs text-slate-400">Źródło: {stat.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
