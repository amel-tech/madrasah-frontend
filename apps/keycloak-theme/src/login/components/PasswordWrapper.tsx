import type { JSX } from 'keycloakify/tools/JSX'
import { useIsPasswordRevealed } from 'keycloakify/tools/useIsPasswordRevealed'
import type { KcClsx } from 'keycloakify/login/lib/kcClsx'
import type { I18n } from '../i18n'

import { Button } from '@madrasah/ui/components/button'
import { EyeIcon, EyeSlashIcon } from '@madrasah/icons'

export function PasswordWrapper(props: {
  kcClsx: KcClsx
  i18n: I18n
  passwordInputId: string
  children: JSX.Element
}) {
  const { i18n, passwordInputId, children } = props

  const { msgStr } = i18n

  const { isPasswordRevealed, toggleIsPasswordRevealed }
        = useIsPasswordRevealed({ passwordInputId })

  return (
    <div className="relative">
      {' '}
      {/* Relative container to place eye icon inside input */}
      {children}
      <Button
        variant="ghost"
        type="button"
        aria-label={msgStr(
          isPasswordRevealed ? 'hidePassword' : 'showPassword',
        )}
        aria-controls={passwordInputId}
        onClick={toggleIsPasswordRevealed}
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
      >
        {isPasswordRevealed ? <EyeSlashIcon className="h-4 w-4 text-gray-500" /> : <EyeIcon className="h-4 w-4 text-gray-500" />}
        {' '}
        {/* Icon sizes and colors */}
      </Button>
    </div>
  )
}
