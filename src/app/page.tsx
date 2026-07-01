import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { BeforeAfter } from '@/components/BeforeAfter'
import { StatsSection } from '@/components/StatsSection'
import { CvAssessSection } from '@/components/CvAssessSection'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <StatsSection />
      <CvAssessSection />
      <BeforeAfter />
      <CtaSection />
      <Footer />
    </main>
  )
}
