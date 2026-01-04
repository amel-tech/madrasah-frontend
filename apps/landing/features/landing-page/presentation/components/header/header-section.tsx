/**
 * Presentation Layer - Presentational Component
 * 
 * This is a "dumb" component that only handles presentation.
 * It receives all data via props and has no business logic.
 * Following Presentation-Container Pattern.
 */

'use client'

import type { HeaderConfig } from '../../../domain/entities/landing.types'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderSectionProps {
  readonly config: HeaderConfig
}

/**
 * Presentational Header Component
 * 
 * This component follows:
 * - Single Responsibility Principle (SRP): Only responsible for rendering
 * - Component-Based Architecture: Reusable, isolated component
 */
export function HeaderSection({ config }: HeaderSectionProps) {
  return (
    <header className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-5xl gap-x-4 ">
      {/* header responsive olabilmesi için p yerine px ve py kullanıyoruz. Yorum satırını elementin üstünde yazabilmek için <> </> tagları oluşturmak yerine, yorum satırını elementin altına ekledim. Figma tailwind de 1040 gösteriyordu ama standarta uymak için 1024px olan max-w-5xl kullanıldı.*/}
      {/* box-shadow: Xpx Ypx Blurpx Spreadpx rgba(...);*/}
      <div className="grid grid-cols-[auto_1fr_auto] items-center text-shadow-header">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image
            src="/logos/brand/logo.svg"
            alt={config.logo.alt}
            width={45}
            height={45}
            className="w-12 h-12"
            priority
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 justify-center">
          {config.navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-[#0C4A6E] transition-colors font-medium text-sm capitalize"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href={config.ctaButtons.signIn.href}
            className="px-5 py-2 border-2 border-[#E0F2FE] text-[#0C4A6E] bg-white rounded-lg hover:bg-[#E0F2FE] transition-colors font-medium text-sm"
          >
            {config.ctaButtons.signIn.label}
          </Link>
          <Link
            href={config.ctaButtons.joinFree.href}
            className="px-5 py-2 bg-[#0C4A6E] text-white rounded-lg hover:bg-[#075985] transition-colors font-medium text-sm"
          >
            {config.ctaButtons.joinFree.label}
          </Link>
        </div>
      </div>
    </header>
  )
}

