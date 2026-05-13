import Image from 'next/image'
import { BookOpen, SealCheck } from '@madrasah/icons/ssr'
import { getTranslations } from 'next-intl/server'
import { partnershipImage, partnershipFeatures } from './data'

const iconMap = {
  BookOpen,
  SealCheck,
} as const

export async function PartnershipSection() {
  const t = await getTranslations('landing.partnership')

  return (
    <div className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-primary">
              <Image
                alt={t('imageAlt')}
                className="w-full h-auto object-cover opacity-80"
                src={partnershipImage}
                width={600}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <p className="italic font-display text-xl leading-relaxed text-secondary">
                  {t('quote')}
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative p-10">
            <div className="absolute top-0 left-0 w-20 h-20 corner-flourish-tl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 corner-flourish-br" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl font-bold text-primary mb-6">{t('title')}</h2>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed font-light">
                {t('description')}
              </p>
              <div className="space-y-8 mb-12">
                {partnershipFeatures.map(feature => {
                  const Icon = iconMap[feature.icon]
                  return (
                    <div key={feature.key} className="flex items-start">
                      <Icon className="text-secondary me-5 mt-1 flex-shrink-0" size={24} />
                      <div>
                        <h4 className="font-bold text-primary mb-1">{t(`${feature.key}.title`)}</h4>
                        <p className="text-sm text-gray-500 font-light">{t(`${feature.key}.description`)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button className="bg-primary hover:bg-primary/95 text-white px-10 py-4 rounded-xl font-semibold shadow-lg shadow-primary/10 transition-all">
                {t('cta')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
