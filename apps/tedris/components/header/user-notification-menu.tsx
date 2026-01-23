import { BellIcon } from '@madrasah/icons/ssr'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@madrasah/ui/components/hover-card'
import { useTranslations } from 'next-intl'

export const UserNotifications = () => {
  const t = useTranslations('tedris')
  return (
    <HoverCard>
      <HoverCardTrigger>
        <BellIcon size={24} className="text-primary" />
      </HoverCardTrigger>
      <HoverCardContent>
        <p>{t('UserNotifications.noNewNotifications')}</p>
      </HoverCardContent>
    </HoverCard>
  )
}
