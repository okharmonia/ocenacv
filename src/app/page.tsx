import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { TestimonialsTicker } from '@/components/TestimonialsTicker'
import { HowItWorks } from '@/components/HowItWorks'
import { BeforeAfter } from '@/components/BeforeAfter'
import { StatsSection } from '@/components/StatsSection'
import { CvAssessSection } from '@/components/CvAssessSection'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'

interface PageProps {
  searchParams: Promise<{
    score?: string
    role?: string
    desc?: string
  }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const score = params.score
  const role = params.role
  const desc = params.desc

  if (score) {
    const roleStr = role ? ` na stanowisko ${role}` : ''
    const title = `Moje CV${roleStr} otrzymało ocenę ${score}/100! 💀`
    const description = desc
      ? `Werdykt AI: "${desc}" — Sprawdź swoje CV bez rejestracji na ocenacv.pl.`
      : 'Darmowa, błyskawiczna ocena CV przez AI. Dowiedz się, co rekruter myśli o Twoim CV — bez rejestracji.'

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: 'https://ocenacv.pl',
        siteName: 'ocenacv.pl',
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
  }

  return {} // Fallback to layout.tsx defaults
}

export default function Home() {
  return (
    <main>
      <Hero />
      <TestimonialsTicker />
      <HowItWorks />
      <StatsSection />
      <CvAssessSection />
      <BeforeAfter />
      <CtaSection />
      <Footer />
    </main>
  )
}
