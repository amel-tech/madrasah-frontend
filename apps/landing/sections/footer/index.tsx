/**
 * Footer Section Component
 * 
 * This component displays the footer with logo, navigation links,
 * newsletter signup, and copyright information.
 */

'use client'

import Link from 'next/link'
import { footerData } from './data'
import { BrandLogo } from '~/components/logos/brand/logo'

/**
 * Footer Component
 * 
 * Displays the footer section with all navigation and information.
 */
export function FooterSection() {
  return (
    <footer className={`${footerData.colors.background} py-8 sm:py-10 md:py-12`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* White Content Box with Light Blue Border */}
        <div className={`${footerData.colors.contentBox.background} border ${footerData.colors.contentBox.border} rounded-lg p-6 sm:p-7 md:p-8`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
            {/* Logo and Description */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                <BrandLogo
                  width={32}
                  height={32}
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
                <h3 className={`text-base sm:text-lg font-bold ${footerData.colors.logo.title} uppercase`}>MEDRESE ONLİNE</h3>
              </div>
              <p className={`${footerData.colors.tagline} text-xs sm:text-sm mb-3 sm:mb-4`}>
                {footerData.tagline}
              </p>
              {/* Social Media Icons */}
              <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
                <Link
                  href={footerData.socialMedia.facebook}
                  className={`w-7 h-7 sm:w-8 sm:h-8 ${footerData.colors.socialIcons.background} rounded-full flex items-center justify-center ${footerData.colors.socialIcons.hoverBackground} transition-colors border ${footerData.colors.socialIcons.border}`}
                  aria-label="Facebook"
                >
                  <span className={`text-xs ${footerData.colors.socialIcons.icon}`}>🌐</span>
                </Link>
                <Link
                  href={footerData.socialMedia.twitter}
                  className={`w-7 h-7 sm:w-8 sm:h-8 ${footerData.colors.socialIcons.background} rounded-full flex items-center justify-center ${footerData.colors.socialIcons.hoverBackground} transition-colors border ${footerData.colors.socialIcons.border}`}
                  aria-label="Twitter"
                >
                  <span className={`text-xs ${footerData.colors.socialIcons.icon}`}>✉</span>
                </Link>
              </div>
            </div>

            {/* Learn Links */}
            <div className="text-center sm:text-left">
              <h3 className={`font-bold ${footerData.colors.headings} mb-3 sm:mb-4 text-sm sm:text-base`}>Learn</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerData.learnLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${footerData.colors.links.default} ${footerData.colors.links.hover} transition-colors text-xs sm:text-sm`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="text-center sm:text-left">
              <h3 className={`font-bold ${footerData.colors.headings} mb-3 sm:mb-4 text-sm sm:text-base`}>Company</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerData.companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${footerData.colors.links.default} ${footerData.colors.links.hover} transition-colors text-xs sm:text-sm`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="text-center sm:text-left">
              <h3 className={`font-bold ${footerData.colors.newsletter.title} mb-3 sm:mb-4 text-sm sm:text-base`}>
                {footerData.newsletter.title}
              </h3>
              <p className={`${footerData.colors.newsletter.description} text-xs sm:text-sm mb-3 sm:mb-4`}>
                {footerData.newsletter.description}
              </p>
              <form className="space-y-2 sm:space-y-3">
                <input
                  type="email"
                  placeholder={footerData.newsletter.placeholder}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2 border ${footerData.colors.newsletter.input.border} rounded-lg focus:outline-none focus:ring-2 ${footerData.colors.newsletter.input.focusRing} text-xs sm:text-sm`}
                />
                <button
                  type="submit"
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2 ${footerData.colors.newsletter.button.background} ${footerData.colors.newsletter.button.text} rounded-lg ${footerData.colors.newsletter.button.hoverBackground} transition-colors text-xs sm:text-sm font-medium`}
                >
                  {footerData.newsletter.buttonLabel}
                </button>
              </form>
            </div>
          </div>

          {/* Copyright - Inside White Box */}
          <div className={`border-t ${footerData.colors.copyright.border} pt-6 sm:pt-7 md:pt-8 mt-6 sm:mt-7 md:mt-8`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
              <p className={`${footerData.colors.copyright.text} text-xs sm:text-sm text-center md:text-left`}>
                {footerData.copyright.text}
              </p>
              <div className="flex gap-3 sm:gap-4">
                <Link
                  href={footerData.copyright.privacyPolicy.href}
                  className={`${footerData.colors.copyright.links.default} ${footerData.colors.copyright.links.hover} transition-colors text-xs sm:text-sm`}
                >
                  {footerData.copyright.privacyPolicy.label}
                </Link>
                <Link
                  href={footerData.copyright.termsOfService.href}
                  className={`${footerData.colors.copyright.links.default} ${footerData.colors.copyright.links.hover} transition-colors text-xs sm:text-sm`}
                >
                  {footerData.copyright.termsOfService.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
