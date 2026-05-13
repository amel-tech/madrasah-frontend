import Link from 'next/link'
import { Mosque, GlobeSimple, Envelope } from '@madrasah/icons/ssr'
import { getTranslations } from 'next-intl/server'
import { footerExploreLinks, footerSupportLinks, footerLegalLinks } from './data'

export async function FooterSection() {
  const t = await getTranslations('landing.footer')

  return (
    <footer className="bg-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40 pattern-rosette-navy" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <Mosque className="text-primary" size={30} weight="duotone" />
              <span className="ms-2 font-display font-bold text-xl text-primary tracking-tight">
                {t('brand')}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed font-light">
              {t('tagline')}
            </p>
            <div className="flex gap-5">
              <Link className="text-gray-400 hover:text-secondary transition-colors" href="#">
                <GlobeSimple size={24} />
              </Link>
              <Link className="text-gray-400 hover:text-secondary transition-colors" href="#">
                <Envelope size={24} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-primary mb-8 text-sm tracking-widest uppercase">{t('explore')}</h3>
            <ul className="space-y-4 text-sm text-gray-500 font-light">
              {footerExploreLinks.map(link => (
                <li key={link.key}>
                  <Link className="hover:text-secondary transition-colors" href={link.href}>
                    {t(`exploreLinks.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-primary mb-8 text-sm tracking-widest uppercase">{t('support')}</h3>
            <ul className="space-y-4 text-sm text-gray-500 font-light">
              {footerSupportLinks.map(link => (
                <li key={link.key}>
                  <Link className="hover:text-secondary transition-colors" href={link.href}>
                    {t(`supportLinks.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-primary mb-8 text-sm tracking-widest uppercase">
              {t('development.title')}
            </h3>
            <p className="text-sm text-gray-500 font-light mb-6">
              {t('development.description')}
            </p>
            <div className="flex gap-2">
              <input
                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-100 bg-gray-50 text-gray-900 focus:ring-secondary focus:border-secondary outline-none"
                placeholder={t('development.placeholder')}
                type="email"
              />
              <button className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">
                {t('development.buttonLabel')}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 tracking-widest uppercase font-bold">
          <p>{t('copyright')}</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            {footerLegalLinks.map(link => (
              <Link
                key={link.key}
                className="hover:text-secondary transition-colors"
                href={link.href}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
