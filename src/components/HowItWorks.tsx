const STEPS = [
  {
    icon: (
      <svg className="w-8 h-8 text-ocena-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
    title: 'Wrzuć CV',
    desc: 'PDF, DOCX lub TXT. Maksymalnie 10 MB. Przeciągnij lub kliknij, aby wybrać plik.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-ocena-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'AI analizuje',
    desc: 'Sztuczna inteligencja czyta Twoje CV jak prawdziwy rekruter — szuka słabych punktów, pustych frazesów i red flagów.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-ocena-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: 'Zobacz wynik',
    desc: 'Ocena z 100 plus 5 konkretnych uwag. Bez owijania w bawełnę — dowiesz się, co dokładnie psuje Twoje CV.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-white section-padding" id="jak-dziala">
      <div className="container-ocena">
        <h2 className="text-center font-bold mb-4" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
          Jak to działa?
        </h2>
        <p className="text-center mb-16 max-w-xl mx-auto" style={{ color: '#94A3B8', fontSize: 16 }}>
          Trzy proste kroki, aby dowiedzieć się, czy Twoje CV faktycznie działa.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={i} className="card text-center stagger-enter">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: 'rgba(249, 115, 22, 0.08)' }}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p style={{ color: '#64748B', lineHeight: 1.7, fontSize: 15 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
