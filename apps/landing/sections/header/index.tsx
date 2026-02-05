/**
 * Header Section Component
 * 
 * This component displays the header with logo, navigation links, and CTA buttons.
 */

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@madrasah/ui/lib/utils'
import { env } from '~/env'
import { headerData } from './data'
import { BrandLogo } from '~/components/logos/brand/logo'

/** Must match --header-height in globals.css */
const FALLBACK_HEADER_HEIGHT = 80

/**
 * Smooth scroll to element by ID
 * Accounts for header height to prevent content from being hidden behind sticky header.
 * Header height is read dynamically to support responsive layouts.
 */
function scrollToSection(href: string) {
  if (href.startsWith('#')) {
    const elementId = href.substring(1)
    const element = document.getElementById(elementId)
    const header = document.querySelector('header')
    const headerHeight = header?.offsetHeight ?? FALLBACK_HEADER_HEIGHT

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
}

/**
 * Hamburger Menu Icon Component
 */
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
      <span
        className={cn(
          'block h-0.5 w-6 transition-all duration-300',
          headerData.colors.hamburger.icon,
          isOpen && 'rotate-45 translate-y-2'
        )}
      />
      <span
        className={cn(
          'block h-0.5 w-6 transition-all duration-300',
          headerData.colors.hamburger.icon,
          isOpen && 'opacity-0'
        )}
      />
      <span
        className={cn(
          'block h-0.5 w-6 transition-all duration-300',
          headerData.colors.hamburger.icon,
          isOpen && '-rotate-45 -translate-y-2'
        )}
      />
    </div>
  )
}

/**
 * Header Component
 * 
 * Displays the header with logo, navigation, and CTA buttons.
 * Header becomes sticky with shadow when scrolling.
 * Mobile responsive with hamburger menu.
 */
export function HeaderSection() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest('header')) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
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
      setIsMenuOpen(false) // Close menu after clicking a link
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-shadow duration-200',
        headerData.colors.background,
        isScrolled && 'shadow-sm'
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-5xl">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center gap-x-4">
          {/* Logo Section */}
          <Link
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <BrandLogo
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-8 justify-center">
            {headerData.navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  'transition-colors font-medium text-sm capitalize cursor-pointer',
                  headerData.colors.text.default,
                  headerData.colors.text.hover
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href={env.NEXT_PUBLIC_TEDRIS_APP_URL}
              className={cn(
                'px-5 py-2 border-2 rounded-lg transition-colors font-medium text-sm',
                headerData.colors.button.signIn.border,
                headerData.colors.button.signIn.text,
                headerData.colors.button.signIn.background,
                headerData.colors.button.signIn.hoverBackground
              )}
            >
              {headerData.ctaButtons.signIn.label}
            </Link>
            <Link
              href={env.NEXT_PUBLIC_TEDRIS_APP_URL}
              className={cn(
                'px-5 py-2 rounded-lg transition-colors font-medium text-sm cursor-pointer',
                headerData.colors.button.joinFree.background,
                headerData.colors.button.joinFree.text,
                headerData.colors.button.joinFree.hoverBackground
              )}
            >
              {headerData.ctaButtons.joinFree.label}
            </Link>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="md:hidden flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <BrandLogo
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </Link>

          {/* CTA Buttons - Centered */}
          <div className="flex items-center gap-2 flex-1 justify-center">
            <Link
              href={env.NEXT_PUBLIC_TEDRIS_APP_URL}
              className={cn(
                'px-3 py-1.5 border-2 rounded-lg transition-colors font-medium text-xs',
                headerData.colors.button.signIn.border,
                headerData.colors.button.signIn.text,
                headerData.colors.button.signIn.background,
                headerData.colors.button.signIn.hoverBackground
              )}
            >
              {headerData.ctaButtons.signIn.label}
            </Link>
            <Link
              href={env.NEXT_PUBLIC_TEDRIS_APP_URL}
              className={cn(
                'px-3 py-1.5 rounded-lg transition-colors font-medium text-xs cursor-pointer',
                headerData.colors.button.joinFree.background,
                headerData.colors.button.joinFree.text,
                headerData.colors.button.joinFree.hoverBackground
              )}
            >
              {headerData.ctaButtons.joinFree.label}
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 -mr-2 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <HamburgerIcon isOpen={isMenuOpen} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav
            className={cn(
              'pt-4 pb-4 border-t mt-4',
              headerData.colors.menu.border
            )}
          >
            <div className="flex flex-col gap-4">
              {headerData.navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    'transition-colors font-medium text-sm capitalize py-2',
                    headerData.colors.text.default,
                    headerData.colors.text.hover
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
