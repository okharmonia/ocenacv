import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OceńCV.pl — Darmowa ocena CV przez AI w 10 sekund',
  description:
    'Sprawdź swoje CV za darmo. AI analizuje jak prawdziwy rekruter: ocena 0-100, 5 konkretnych uwag. Bez rejestracji, bez zapisywania.',
  keywords: [
    'ocena CV',
    'darmowa ocena CV',
    'sprawdź CV',
    'ATS score',
    'analiza CV',
    'CV za darmo',
    'rekrutacja',
    'jak napisać CV',
    'doradztwo zawodowe',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'OceńCV.pl — Sprawdź, czy Twoje CV ma szansę na rozmowę',
    description:
      'Darmowa, błyskawiczna ocena CV przez AI. Dowiedz się, co rekruter myśli o Twoim CV — bez rejestracji.',
    url: 'https://ocenacv.pl',
    siteName: 'OceńCV.pl',
    locale: 'pl_PL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-surface text-on-surface">
        <header className="fixed top-0 w-full z-50 bg-[#0F172A] border-b border-white/10 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3">
            <div className="flex items-center gap-3">
              <img src="/ocena.webp" alt="ocenacv.pl" className="h-10 md:h-12 w-auto object-contain" />
              <span className="font-bold text-lg md:text-xl text-white tracking-tighter">ocenacv.pl</span>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex space-x-8">
                <a className="text-white hover:text-[#F97316] transition-colors duration-200 font-semibold text-sm" href="#">Start</a>
                <a className="text-slate-300 hover:text-white transition-colors duration-200 font-semibold text-sm" href="#how">Jak to działa</a>
                <a className="text-slate-300 hover:text-white transition-colors duration-200 font-semibold text-sm" href="#stats">Statystyki</a>
              </nav>
            </div>
          </div>
        </header>
        <div className="flex-1 mt-20">
          {children}
        </div>
      </body>
    </html>
  )
}
