export function CtaSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #312E81 0%, #0F172A 100%)' }} />
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container-ocena relative z-10 text-center">
        <h2 className="text-white font-bold mb-6" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
          Chcesz CV, które otwiera drzwi?
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto" style={{ color: '#A5B4FC' }}>
          Twoje obecne CV traci szanse, o których nie wiesz.
          Stwórz nowe — zoptymalizowane pod ATS, z konkretnymi
          liczbami i profesjonalnym formatowaniem.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
          <div className="flex items-center gap-2" style={{ color: '#C7D2FE' }}>
            <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            AI dobiera słowa kluczowe pod Twoją branżę
          </div>
          <div className="flex items-center gap-2" style={{ color: '#C7D2FE' }}>
            <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Każde zdanie zawiera konkretną wartość i liczby
          </div>
          <div className="flex items-center gap-2" style={{ color: '#C7D2FE' }}>
            <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Gotowe CV w 60 sekund — PDF, DOCX, link
          </div>
        </div>

        <a
          href="https://gen-cv.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-base md:text-lg px-10 py-4"
        >
          Stwórz profesjonalne CV na gen-cv.pl
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>

        <p className="text-xs mt-6" style={{ color: '#818CF8' }}>
          10 000+ CV stworzonych w tym miesiącu · Średnia ocena 4.9/5
        </p>
      </div>
    </section>
  )
}
