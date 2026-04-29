'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@madrasah/ui/lib/utils'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from '~/lib/i18n/navigation'
import { locales } from '~/lib/i18n/routing'
import { headerNavLinks, headerCtaHref } from './data'
import { MadrasahLogoIcon } from '@madrasah/icons'

const FALLBACK_HEADER_HEIGHT = 80

function scrollToSection(href: string) {
  if (href.startsWith('#')) {
    const elementId = href.substring(1)
    const element = document.getElementById(elementId)
    const header = document.querySelector('nav')
    const headerHeight = header?.offsetHeight ?? FALLBACK_HEADER_HEIGHT

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
      <span
        className={cn(
          'block h-0.5 w-6 bg-primary transition-all duration-300',
          isOpen && 'rotate-45 translate-y-2',
        )}
      />
      <span
        className={cn(
          'block h-0.5 w-6 bg-primary transition-all duration-300',
          isOpen && 'opacity-0',
        )}
      />
      <span
        className={cn(
          'block h-0.5 w-6 bg-primary transition-all duration-300',
          isOpen && '-rotate-45 -translate-y-2',
        )}
      />
    </div>
  )
}

const localeLabels: Record<string, string> = {
  en: 'EN',
  tr: 'TR',
  ar: 'AR',
}

function LanguageSelector() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors"
      >
        {localeLabels[locale] ?? locale.toUpperCase()}
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 min-w-[80px]">
            {locales.map(l => (
              <button
                key={l}
                onClick={() => handleLocaleChange(l)}
                className={cn(
                  'w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors',
                  l === locale ? 'text-primary font-semibold' : 'text-gray-600',
                )}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function HeaderSection() {
  const t = useTranslations('landing.header')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      scrollToSection(href)
      setIsMenuOpen(false)
    }
  }

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 bg-background-light/80 backdrop-blur-lg border-b border-gray-100 transition-shadow duration-200',
        isScrolled && 'shadow-sm',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            href="#"
            onClick={e => handleLinkClick(e, '#')}
            className="flex-shrink-0 flex items-center"
          >
            <MadrasahLogoIcon size={30} />
            <span className="ms-2 font-display font-bold text-xl tracking-tight text-primary">
              {t('brand')}
            </span>
          </Link>

          <div className="hidden md:flex gap-10 items-center">
            {headerNavLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={e => handleLinkClick(e, link.href)}
                className="text-gray-500 hover:text-primary transition-colors font-medium text-sm tracking-wide"
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link
              href={headerCtaHref}
              onClick={e => handleLinkClick(e, headerCtaHref)}
              className="bg-primary hover:bg-primary/95 text-white px-7 py-2.5 rounded-full font-medium transition-all shadow-sm"
            >
              {t('cta')}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 -me-2 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>

        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="pt-4 pb-4 border-t border-gray-200 mt-0">
            <div className="flex flex-col gap-4">
              {headerNavLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={e => handleLinkClick(e, link.href)}
                  className="text-gray-500 hover:text-primary transition-colors font-medium text-sm tracking-wide py-2"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
