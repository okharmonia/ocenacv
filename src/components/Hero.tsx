'use client'

import { useState, useEffect } from 'react'

export function Hero() {
  const [score1, setScore1] = useState(99)
  const [score2, setScore2] = useState(99)
  const [isFinished, setIsFinished] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // 1. Scanning animation (random numbers)
    const scanInterval = setInterval(() => {
      setScore1(Math.floor(Math.random() * 60) + 15)
      setScore2(Math.floor(Math.random() * 60) + 35)
    }, 60)

    // Stop scanning after 1.2s and transition to final values (34 and 92)
    const stopTimeout = setTimeout(() => {
      clearInterval(scanInterval)
      
      let current1 = 99
      let current2 = 99
      const target1 = 34
      const target2 = 92
      
      const finalInterval = setInterval(() => {
        let done1 = false
        let done2 = false
        
        if (current1 === target1) {
          done1 = true
        } else {
          current1 = current1 > target1 ? current1 - 1 : current1 + 1
          setScore1(current1)
        }
        
        if (current2 === target2) {
          done2 = true
        } else {
          current2 = current2 > target2 ? current2 - 1 : current2 + 1
          setScore2(current2)
        }
        
        if (done1 && done2) {
          clearInterval(finalInterval)
          setIsFinished(true)
        }
      }, 20)
    }, 1200)

    // 2. Scroll listener for parallax
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearInterval(scanInterval)
      clearTimeout(stopTimeout)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Calculate parallax offsets for depth separation
  const rotate1 = Math.max(-12, Math.min(0, -6 - scrollY * 0.01))
  const translate1X = -30 - scrollY * 0.02
  const translate1Y = scrollY * 0.08

  const rotate2 = Math.max(0, Math.min(10, 4 + scrollY * 0.015))
  const translate2X = 30 + scrollY * 0.03
  const translate2Y = scrollY * 0.04

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
                Sprawdź свои CV за дармо
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

          {/* Right Column - Two Parallax Resume Widgets */}
          <div className="md:w-1/2 relative h-[440px] w-full flex items-center justify-center overflow-visible">
            {/* Soft glow */}
            <div className="absolute inset-0 bg-[#EA580C]/10 blur-[90px] rounded-full pointer-events-none"></div>

            {/* Container for layered documents */}
            <div className="relative w-full max-w-[340px] h-[360px] flex items-center justify-center">
              
              {/* 1. BAD CV CARD (34/100) - Behind */}
              <div 
                className="absolute transition-all duration-300 ease-out"
                style={{
                  transform: `rotate(${rotate1}deg) translate(${translate1X}px, ${translate1Y}px) scale(0.9)`,
                  zIndex: 10,
                  opacity: 0.85
                }}
              >
                <div className="bg-[#1E293B]/90 backdrop-blur-md border border-red-500/20 p-6 rounded-3xl shadow-xl w-64 h-[300px] flex flex-col gap-3">
                  <div className="w-1/2 h-3.5 bg-white/20 rounded-full"></div>
                  <div className="w-full h-2 bg-white/10 rounded-full"></div>
                  <div className="w-full h-2 bg-white/10 rounded-full"></div>
                  <div className="w-3/4 h-2 bg-white/10 rounded-full"></div>
                  
                  <div className="mt-4 flex justify-center">
                    <div className="relative w-20 h-20">
                      {/* SVG Gauge */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle className="text-white/5" cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeWidth="4" />
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="34" 
                          fill="transparent" 
                          stroke={isFinished ? '#EF4444' : '#F97316'} 
                          strokeWidth="4" 
                          strokeDasharray={213.62} 
                          strokeDashoffset={213.62 - (213.62 * score1) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-300"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-extrabold transition-colors duration-500" style={{ color: isFinished ? '#EF4444' : '#F97316' }}>{score1}</span>
                        <span className="text-[8px] text-slate-400 font-medium leading-none">/ 100</span>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-4 space-y-1.5 transition-all duration-700 ${isFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    <div className="w-full h-1 bg-[#EF4444] rounded-full opacity-70 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                    <div className="w-5/6 h-1 bg-[#EF4444] rounded-full opacity-70 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                  </div>
                </div>
              </div>

              {/* 2. GOOD CV CARD (92/100) - In Front */}
              <div 
                className="absolute transition-all duration-300 ease-out"
                style={{
                  transform: `rotate(${rotate2}deg) translate(${translate2X}px, ${translate2Y}px)`,
                  zIndex: 20
                }}
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl w-64 h-[300px] flex flex-col gap-3">
                  <div className="w-1/2 h-3.5 bg-white/30 rounded-full"></div>
                  <div className="w-full h-2 bg-white/15 rounded-full"></div>
                  <div className="w-full h-2 bg-white/15 rounded-full"></div>
                  <div className="w-3/4 h-2 bg-white/15 rounded-full"></div>
                  
                  <div className="mt-4 flex justify-center">
                    <div className="relative w-20 h-20">
                      {/* SVG Gauge */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle className="text-white/10" cx="40" cy="40" r="34" fill="transparent" stroke="currentColor" strokeWidth="4" />
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="34" 
                          fill="transparent" 
                          stroke={isFinished ? '#10B981' : '#F97316'} 
                          strokeWidth="4" 
                          strokeDasharray={213.62} 
                          strokeDashoffset={213.62 - (213.62 * score2) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-300"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-extrabold transition-colors duration-500" style={{ color: isFinished ? '#10B981' : '#F97316' }}>{score2}</span>
                        <span className="text-[8px] text-slate-400 font-medium leading-none">/ 100</span>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-4 space-y-1.5 transition-all duration-700 ${isFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    <div className="w-full h-1 bg-[#10B981] rounded-full opacity-70 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                    <div className="w-5/6 h-1 bg-[#10B981] rounded-full opacity-70 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
