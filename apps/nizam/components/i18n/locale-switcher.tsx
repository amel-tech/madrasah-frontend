'use client'

import { Locale, useLocale, useTranslations } from 'next-intl'
import { routing, MadrasahLocale } from '~/lib/i18n/routing'
import { usePathname, useRouter } from '~/lib/i18n/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@madrasah/ui/components/dropdown-menu'
import { GlobeIcon } from '@madrasah/icons'
import { Button } from '@madrasah/ui/components/button'
import { useParams } from 'next/navigation'

export default function LocaleSwitcher() {
  const t = useTranslations('common')
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const currentLocale: MadrasahLocale = useLocale() as MadrasahLocale

  const handleLocaleChange = (nextLocale: Locale) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale },
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <GlobeIcon size={20} className="text-neutral-primary" />
          {t(`locales.${currentLocale}`)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuRadioGroup value={currentLocale} onValueChange={handleLocaleChange}>
          {routing.locales.map(locale => (
            <DropdownMenuRadioItem key={locale} value={locale}>
              {t(`locales.${locale}`)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
