import KeycloakLogin from '~/features/keycloak/login'
import { auth } from '~/lib/auth_options'
import { MadrasahLogoIcon } from '@madrasah/icons/ssr'
import { Input } from '@madrasah/ui/components/input'
import { UserHeaderMenu } from './user-header-menu'
import { UserNotifications } from './user-notification-menu'
import LocaleSwitcher from '../i18n/locale-switcher'

export const Header = async () => {
  const session = await auth()

  return (
    <header className="flex justify-between items-center container mx-auto py-8">
      <div className="flex gap-4 items-center">
        <MadrasahLogoIcon size={36} />
        <p className="text-xl font-medium text-brand-primary">
          Online Madrasah
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <Input placeholder="Search..." className="max-w-64 p-4" />
        {session
          ? (
              <>
                <UserNotifications />
                <UserHeaderMenu />
              </>
            )
          : (
              <KeycloakLogin />
            )}
        <LocaleSwitcher />
      </div>
    </header>
  )
}
