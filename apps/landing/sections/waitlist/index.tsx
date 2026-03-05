import { getTranslations } from 'next-intl/server'
import { waitlistSectionId } from './data'

export async function WaitlistSection() {
  const t = await getTranslations('landing.waitlist')

  return (
    <section className="py-24 bg-primary relative overflow-hidden pattern-rosette-navy" id={waitlistSectionId}>
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">{t('title')}</h2>
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          {t('description')}
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            className="flex-1 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white placeholder-white/30 focus:ring-1 focus:ring-secondary/50 focus:border-secondary/50 outline-none"
            placeholder={t('placeholder')}
            required
            type="email"
          />
          <button
            className="bg-secondary hover:bg-secondary/90 text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all hover:-translate-y-0.5"
            type="submit"
          >
            {t('buttonLabel')}
          </button>
        </form>
        <p className="mt-8 text-white/30 text-[10px] tracking-widest uppercase font-bold">
          {t('privacyNotice')}
        </p>
      </div>
    </section>
  )
}
