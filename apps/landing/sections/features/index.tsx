import { ChartLineUp, UsersThree, Medal } from '@madrasah/icons/ssr'
import { getTranslations } from 'next-intl/server'
import { featuresSideCards } from './data'

const iconMap = {
  ChartLineUp,
  UsersThree,
  Medal,
} as const

export async function FeaturesSection() {
  const t = await getTranslations('landing.features')

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-primary mb-4">{t('title')}</h2>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
          <div className="md:col-span-8 md:row-span-2 bg-primary rounded-[2rem] p-10 text-white relative overflow-hidden flex flex-col justify-between group pattern-overlay-dark">
            <div className="relative z-10">
              <h3 className="font-display text-3xl font-bold mb-4">{t('mainCard.title')}</h3>
              <p className="text-gray-300 font-light max-w-sm">{t('mainCard.description')}</p>
            </div>
            <div className="relative flex justify-center items-end h-full">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl w-64 h-[340px] border border-white/10 p-6 shadow-2xl relative z-10 translate-y-8">
                <div className="h-full flex flex-col">
                  <div className="flex-1 flex flex-col justify-center text-center">
                    <div className="text-secondary/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                      {t('mainCard.flashcardLabel')}
                    </div>
                    <div className="text-4xl font-display font-bold mb-2">
                      {t('mainCard.flashcardArabic')}
                    </div>
                    <div className="text-gray-400 text-sm italic">
                      {t('mainCard.flashcardTransliteration')}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] py-3 rounded-xl uppercase tracking-widest font-bold transition-colors">
                      {t('mainCard.hard')}
                    </button>
                    <button className="bg-secondary/20 border border-secondary/30 hover:bg-secondary/30 text-[10px] py-3 rounded-xl uppercase tracking-widest font-bold transition-colors text-secondary">
                      {t('mainCard.easy')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {featuresSideCards.map((card) => {
            const Icon = iconMap[card.icon]
            if (card.variant === 'secondary') {
              return (
                <div
                  key={card.key}
                  className="md:col-span-4 bg-secondary/5 border border-secondary/10 rounded-[2rem] p-8 flex flex-col justify-center text-center group"
                >
                  <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-secondary" size={30} />
                  </div>
                  <h3 className="font-bold text-xl text-primary mb-2">{t(`sideCards.${card.key}.title`)}</h3>
                  <p className="text-sm text-gray-500 font-light px-4">{t(`sideCards.${card.key}.description`)}</p>
                </div>
              )
            }
            return (
              <div
                key={card.key}
                className="md:col-span-2 bg-gray-50 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center group"
              >
                <Icon className="text-primary mb-4" size={30} />
                <h3 className="font-bold text-base text-primary mb-2">{t(`sideCards.${card.key}.title`)}</h3>
                <p className="text-[11px] text-gray-400 leading-tight">{t(`sideCards.${card.key}.description`)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
