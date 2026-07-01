export function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)' }}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-[-20%] w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }} />
        <div className="absolute top-20 left-[-10%] w-[300px] h-[300px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }} />
        {/* Abstract geometric "document" lines */}
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[35%] h-auto opacity-[0.06]" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="360" height="460" rx="16" stroke="white" strokeWidth="2" />
          <line x1="60" y1="100" x2="340" y2="100" stroke="white" strokeWidth="2" />
          <line x1="60" y1="140" x2="280" y2="140" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="60" y1="180" x2="300" y2="180" stroke="white" strokeWidth="2" />
          <line x1="60" y1="220" x2="250" y2="220" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="60" y1="280" x2="340" y2="280" stroke="white" strokeWidth="2" />
          <line x1="60" y1="320" x2="270" y2="320" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="60" y1="360" x2="310" y2="360" stroke="white" strokeWidth="2" />
          {/* Accent dots */}
          <circle cx="350" cy="80" r="4" fill="#F97316" />
          <circle cx="320" cy="450" r="3" fill="#6366F1" />
          <circle cx="80" cy="460" r="2" fill="#F97316" />
        </svg>
      </div>

      <div className="container-ocena section-padding relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="badge mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            BEZPŁATNIE · BEZ REJESTRACJI · W 10 SEKUND
          </span>

          <h1 className="text-white font-extrabold leading-[1.15] mb-5" style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}>
            Czy Twoje CV ma{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
              szansę
            </span>{' '}
            na rozmowę?
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl" style={{ color: '#94A3B8' }}>
            Wrzuć CV i sprawdź, co o nim myśli rekruter.
            Dostaniesz ocenę z 100 oraz 5 konkretnych uwag
            — brutalnie szczerze, za darmo, bez zapisywania.
          </p>

          <a
            href="#ocen-cv"
            className="btn-primary text-base md:text-lg px-8 py-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Sprawdź swoje CV za darmo
          </a>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 text-sm" style={{ color: '#64748B' }}>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Bez rejestracji
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Bez maila
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              CV nie jest zapisywane
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
