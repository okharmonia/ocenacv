import type { Metadata } from 'next'
import './globals.css'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { BeforeAfter } from '@/components/BeforeAfter'
import { StatsSection } from '@/components/StatsSection'
import { CvAssessSection } from '@/components/CvAssessSection'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'

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
    <html lang="pl">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
