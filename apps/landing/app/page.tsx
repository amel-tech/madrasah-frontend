import { HeaderSection } from '~/features/header'
import { HeroStatisticsSection } from '~/features/hero-statistics'
import { FeaturesSection } from '~/features/features'
import { SmartDecksSection } from '~/features/smart-decks'
import { CoursesInstituteSection } from '~/features/courses-institute'
import { FooterSection } from '~/features/footer'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Section 1: Header - Sticky at top */}
      <HeaderSection />

      {/* Section 2: Hero + Statistics (Full Viewport Height) */}
      <section id="hero">
        <HeroStatisticsSection />
      </section>

      {/* Section 3: Features (Full Viewport Height, scrolls into view) */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* Section 4: Smart Decks (Full Viewport Height) */}
      <section id="smart-decks">
        <SmartDecksSection />
      </section>

      {/* Section 5: Courses + Institute (Full Viewport Height) */}
      <section id="courses">
        <CoursesInstituteSection />
      </section>

      {/* Section 6: Footer */}
      <FooterSection />
    </div>
  )
}
