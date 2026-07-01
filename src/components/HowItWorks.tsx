const STEPS = [
  {
    iconName: 'upload_file',
    title: '1. Wrzuć CV',
    desc: 'PDF, DOCX lub TXT. Maksymalnie 10 MB. Analiza odbywa się w pamięci przeglądarki.',
  },
  {
    iconName: 'psychology',
    title: '2. AI analizuje',
    desc: 'Sztuczna inteligencja skanuje Twoje CV pod kątem kryteriów ATS i typowych błędów rekrutacyjnych.',
  },
  {
    iconName: 'fact_check',
    title: '3. Zobacz wynik',
    desc: 'Otrzymasz ocenę w skali 0-100 i 5 konkretnych uwag wskazujących słabe punkty do poprawy.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-white py-20 md:py-28" id="how">
      <div className="container-ocena max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
            Proces brutalnej prawdy
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            Zrozum, dlaczego Twoje CV ląduje w koszu, w trzech prostych krokach.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F97316] group-hover:border-[#F97316] transition-colors duration-300">
                <span className="material-symbols-outlined text-[#9d4300] group-hover:text-white transition-colors duration-300" style={{ fontSize: '36px' }}>
                  {step.iconName}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#0d1c2f' }}>{step.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
