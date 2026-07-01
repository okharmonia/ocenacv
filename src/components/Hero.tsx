export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36 bg-[#0F172A] text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }} />
        <div className="absolute top-40 left-[-10%] w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }} />
      </div>

      <div className="container-ocena relative z-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
          {/* Left Column - Content */}
          <div className="md:w-1/2 text-left z-10">
            <span className="badge mb-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-500/10 text-orange-400">
              <span className="material-symbols-outlined text-xs leading-none">verified</span>
              BEZPŁATNIE · BEZ REJESTRACJI · W 10 SEKUND
            </span>

            <h1 className="font-extrabold leading-[1.15] mb-6 text-white" style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}>
              Czy Twoje CV ma <span className="text-[#EA580C]">szansę</span> na rozmowę?
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-slate-300 mb-10 max-w-lg">
              Otrzymaj precyzyjny wynik 100-punktowy i 5 brutalnie szczerych poprawek, które sprawią, że rekruterzy przestaną ignorować Twoją aplikację.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#ocen-cv"
                className="btn-primary text-base px-8 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                Sprawdź swoje CV za darmo
                <span className="material-symbols-outlined leading-none text-sm">arrow_forward</span>
              </a>
            </div>

            <div className="flex items-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-lg leading-none">verified</span>
                <span className="text-xs text-slate-400 font-medium">Zaufany wybór IT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-400 text-lg leading-none">bolt</span>
                <span className="text-xs text-slate-400 font-medium">AI-Powered Audit</span>
              </div>
            </div>
          </div>

          {/* Right Column - Resume Widget */}
          <div className="md:w-1/2 relative h-[380px] w-full flex items-center justify-center">
            {/* Soft glow */}
            <div className="absolute inset-0 bg-[#EA580C]/10 blur-[80px] rounded-full"></div>

            {/* Resume preview card */}
            <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl w-72 h-[340px] flex flex-col gap-4">
                <div className="w-1/2 h-3.5 bg-white/20 rounded-full"></div>
                <div className="w-full h-2 bg-white/10 rounded-full"></div>
                <div className="w-full h-2 bg-white/10 rounded-full"></div>
                <div className="w-3/4 h-2 bg-white/10 rounded-full"></div>
                
                <div className="mt-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-[#EA580C] flex flex-col items-center justify-center bg-[#0F172A]">
                    <span className="text-4xl font-extrabold text-[#EA580C] tracking-tight">34</span>
                    <span className="text-[10px] text-slate-400 font-medium leading-none">/ 100</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="w-full h-1 bg-[#EF4444] rounded-full opacity-80"></div>
                  <div className="w-5/6 h-1 bg-[#EF4444] rounded-full opacity-80"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
