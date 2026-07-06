import type { Metadata } from 'next'
import './globals.css'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { CookieBanner } from '@/components/CookieBanner'

export const metadata: Metadata = {
  metadataBase: new URL('https://ocenacv.pl'),
  title: 'Sprawdź, czy Twoje CV ma szansę na rozmowę',
  description:
    'Darmowa, błyskawiczna ocena CV przez AI. Dowiedz się, co rekruter myśli o Twoim CV — bez rejestracji.',
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
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'FuHB2AbmFtlE8fwA-t2W_Rpwl09je_kkugN1lwT_O9I',
  },
  openGraph: {
    title: 'Sprawdź, czy Twoje CV ma szansę na rozmowę',
    description:
      'Darmowa, błyskawiczna ocena CV przez AI. Dowiedz się, co rekruter myśli o Twoim CV — bez rejestracji.',
    url: 'https://ocenacv.pl',
    siteName: 'ocenacv.pl',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/logo.webp',
        width: 200,
        height: 200,
        alt: 'ocenacv.pl Logo',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-surface text-on-surface">
        <GoogleAnalytics />
        <header className="fixed top-0 w-full z-50 bg-[#0F172A] border-b border-white/10 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="ocenacv.pl" className="h-9 md:h-11 w-auto object-contain" />
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
        <div className="flex-1 pt-[60px] md:pt-[68px]">
          {children}
        </div>
        <CookieBanner />
      </body>
    </html>
  )
}
