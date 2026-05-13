import { ArrowRight, ArrowLeft } from '@madrasah/icons/ssr'
import { getTranslations, getLocale } from 'next-intl/server'
import { heroCtaHref } from './data'

export async function HeroSection() {
  const t = await getTranslations('landing.hero')
  const locale = await getLocale()
  const isRtl = locale === 'ar'
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  return (
    <header className="relative pt-24 pb-32 overflow-hidden bg-background-light">
      <div
        className="absolute inset-0 bg-center bg-no-repeat opacity-90 z-0 pointer-events-none"
        style={{ backgroundImage: 'url(/images/background/hero/sher-dor.png)', backgroundSize: '60%' }}
      />
      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <div className="inline-block px-4 py-1 mb-8 border border-secondary/20 rounded-full bg-secondary/5 text-secondary font-semibold text-xs tracking-[0.2em] uppercase">
          {t('badge')}
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.15] mb-8 text-primary">
          {t('heading.line1')}
          <br />
          <span className="text-secondary italic font-normal">{t('heading.line2')}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          {t('description')}
        </p>
        <div className="flex justify-center">
          <a
            className="bg-primary text-white px-12 py-4 rounded-full font-semibold text-lg shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all flex items-center group"
            href={heroCtaHref}
          >
            {t('cta')}
            <ArrowIcon className="ms-2 transition-transform group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1" size={20} />
          </a>
        </div>
      </div>
    </header>
  )
}
