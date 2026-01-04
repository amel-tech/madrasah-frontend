import {
  HeaderSectionContainer,
  HeroSectionContainer,
  StatisticsSectionContainer,
  FeaturesSectionContainer,
} from '~/features/landing-page'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <HeaderSectionContainer />

      {/* Hero Section */}
      <HeroSectionContainer />

      {/* Statistics Section */}
      <StatisticsSectionContainer />

      {/* Features Section */}
      <FeaturesSectionContainer />
    </div>
  )
}
