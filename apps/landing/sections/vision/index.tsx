import { GraduationCap, Devices, Leaf, BookOpenText, Lightbulb, Globe } from '@madrasah/icons/ssr'
import { getTranslations, getLocale } from 'next-intl/server'

const bentoIcons = { GraduationCap, Devices, Leaf } as const
const simpleIcons = { BookOpenText, Lightbulb, Globe } as const

const simpleItems = [
  { key: 'tradition' as const, icon: simpleIcons.BookOpenText },
  { key: 'innovation' as const, icon: simpleIcons.Lightbulb },
  { key: 'accessibility' as const, icon: simpleIcons.Globe },
] as const

export async function VisionSection() {
  const t = await getTranslations('landing.vision')
  const locale = await getLocale()
  const isRtl = locale === 'ar'

  if (isRtl) {
    return (
      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">{t('simpleTitle')}</h2>
            <div className="h-px w-16 bg-secondary/40 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {simpleItems.map(item => {
              const Icon = item.icon
              return (
                <div key={item.key} className="group text-center px-4">
                  <div className="w-24 h-24 rounded-full concentric-mask flex items-center justify-center mx-auto mb-8 relative">
                    <Icon className="text-secondary" size={36} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary mb-4">{t(`items.${item.key}.title`)}</h3>
                  <p className="text-gray-500 leading-relaxed font-light">{t(`items.${item.key}.description`)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 mb-4 text-secondary font-bold text-[10px] tracking-[0.3em] uppercase">
            {t('badge')}
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">{t('title')}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
          <div className="lg:col-span-2 lg:row-span-2 bg-[#142d3e] rounded-[2rem] p-10 text-white relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute inset-0 pattern-rosette-navy" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-10">
                <bentoIcons.GraduationCap className="text-secondary" size={30} />
              </div>
              <h3 className="font-display text-4xl font-bold mb-6">{t('mainCard.title')}</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md font-light">
                {t('mainCard.description')}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 rosette-pattern-gold" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <bentoIcons.Devices className="text-secondary" size={30} />
              </div>
              <h3 className="font-bold text-xl text-primary mb-3">{t('topRight.title')}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {t('topRight.description')}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 rosette-pattern-gold opacity-[0.03]" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                  <bentoIcons.Leaf className="text-secondary" size={30} />
                </div>
                <h3 className="font-bold text-xl text-primary mb-3">{t('bottomLeft.title')}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {t('bottomLeft.description')}
                </p>
              </div>
            </div>

            <div className="md:col-span-3 bg-[#c4a747] rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 group">
              <div className="absolute inset-0 rosette-pattern-gold opacity-[0.1]" />
              <div className="relative z-10">
                <h3 className="font-bold text-2xl mb-2">{t('bottomRight.title')}</h3>
                <p className="text-white/80 text-sm font-light leading-relaxed max-w-xs">
                  {t('bottomRight.description')}
                </p>
              </div>
              <button className="relative z-10 bg-white text-[#c4a747] px-8 py-3 rounded-xl font-bold text-sm whitespace-nowrap shadow-lg hover:shadow-xl transition-all">
                {t('bottomRight.cta')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
