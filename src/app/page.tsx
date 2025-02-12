'use client'

import Hero from '@/components/hero/Hero'
import TeamCarousel from '@/components/TeamCarousel/TeamCarousel'
import Banner from '@/components/Banner/Banner'
import AlternatingBanner from '@/components/AlternatingBanner/AlternatingBanner'
import Banner2 from '@/components/Banner2/Banner2'
import TermoBanner from '@/components/TermoBanner/TermoBanner'
import FAQ from '@/components/FAQ/FAQ'
import GuaranteeWidget from '@/components/widgets/GuaranteeWidget/GuaranteeWidget'
import SolarBenefitsWidget from '@/components/widgets/SolarBenefitsWidget/SolarBenefitsWidget'

export default function Home() {
  return (
    <main>
      <Hero />
      <TeamCarousel />
      <GuaranteeWidget />
      <Banner />
      <AlternatingBanner />
      <SolarBenefitsWidget />
      <FAQ />
      <Banner2 />
      <TermoBanner />
    </main>
  )
} 