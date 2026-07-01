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

        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm md:text-base">
          <div className="flex items-center gap-2" style={{ color: '#C7D2FE' }}>
            <span className="material-symbols-outlined text-green-400 text-lg leading-none">check_circle</span>
            AI dobiera słowa kluczowe pod Twoją branżę
          </div>
          <div className="flex items-center gap-2" style={{ color: '#C7D2FE' }}>
            <span className="material-symbols-outlined text-green-400 text-lg leading-none">check_circle</span>
            Każde zdanie zawiera konkretną wartość i liczby
          </div>
          <div className="flex items-center gap-2" style={{ color: '#C7D2FE' }}>
            <span className="material-symbols-outlined text-green-400 text-lg leading-none">check_circle</span>
            Gotowe CV w 60 sekund — PDF, DOCX, link
          </div>
        </div>

        <a
          href="https://gen-cv.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-base md:text-lg px-10 py-4 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          Stwórz profesjonalne CV na gen-cv.pl
          <span className="material-symbols-outlined text-lg leading-none">open_in_new</span>
        </a>

        <p className="text-xs mt-6" style={{ color: '#818CF8' }}>
          10 000+ CV stworzonych w tym miesiącu · Średnia ocena 4.9/5
        </p>
      </div>
    </section>
  )
}
