import { useState } from 'react'
import { kcSanitize } from 'keycloakify/lib/kcSanitize'
import { clsx } from 'keycloakify/tools/clsx'
import { getKcClsx } from 'keycloakify/login/lib/kcClsx'
import type { KcContext } from '../KcContext'
import type { I18n } from '../i18n'
import type { ExtendedPageProps } from '../types/PageProps'

import { Input } from '@madrasah/ui/components/input'
import { Separator } from '@madrasah/ui/components/separator'
import { Label } from '@madrasah/ui/components/label'
import { Checkbox } from '@madrasah/ui/components/checkbox'
import { cn } from '@madrasah/ui/lib/utils'
import { Button } from '@madrasah/ui/components/button'
import { PasswordWrapper } from '../components/PasswordWrapper'
import { FieldContainer } from '../components/FieldContainer'

export default function Login(
  props: ExtendedPageProps<Extract<KcContext, { pageId: 'login.ftl' }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  })

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
    messagesPerField,
  } = kcContext

  const { msg, msgStr } = i18n

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false)

  const displayRegisterationNodes
    = realm.password && realm.registrationAllowed && !registrationDisabled

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={false}
      classes={classes}
      displayMessage={!messagesPerField.existsError('username', 'password')}
      headerNode={msg('loginAccountTitle')}
      headerSubNode={msg('loginAccountSubtitle')}
      displayInfo={displayRegisterationNodes}
      infoNode={(
        <div id="kc-registration-container" className="text-center">
          <div id="kc-registration">
            <span className="text-sm text-gray-600">
              {msg('noAccount')}
              {' '}
              <a
                tabIndex={0}
                href={url.registrationUrl}
                className="text-brand-primary hover:underline font-medium"
              >
                {msg('doRegister')}
              </a>
            </span>
          </div>
        </div>
      )}
      socialProvidersNode={(
        <>
          {realm.password
            && social?.providers !== undefined
            && social.providers.length !== 0 && (
            <div
              id="kc-social-providers"
              className={kcClsx('kcFormSocialAccountSectionClass')}
            >
              <Separator
                label={msgStr('identity-provider-login-label')}
                className="my-4"
              />
              <ul
                className={cn(
                  kcClsx(
                    'kcFormSocialAccountListClass',
                    social.providers.length > 3
                    && 'kcFormSocialAccountListGridClass',
                  ),
                  'flex flex-col gap-2',
                )}
              >
                {social.providers.map((...[p, , providers]) => (
                  <li key={p.alias}>
                    <a href={p.loginUrl}>
                      <Button
                        variant="outline"
                        id={`social-${p.alias}`}
                        className={cn(
                          kcClsx(
                            'kcFormSocialAccountListButtonClass',
                            providers.length > 3
                            && 'kcFormSocialAccountGridItem',
                          ),
                          'w-full',
                        )}
                        type="button"
                        size="sm"
                      >
                        <span
                          className={clsx(
                            kcClsx('kcFormSocialAccountNameClass'),
                            p.iconClasses && 'kc-social-icon-text',
                          )}
                          dangerouslySetInnerHTML={{
                            __html: kcSanitize(p.displayName),
                          }}
                        >
                        </span>
                      </Button>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    >
      {displayRegisterationNodes && (
        <div className="mx-auto flex flex-row gap-1 w-fit bg-gray-100 border border-gray-200 rounded-lg overflow-hidden font-medium text-sm mb-8 p-1">
          {' '}
          {/* Modern segmented control style. Eski: bg-[#f5f5f5] border-[#e5e5e5] rounded-[35px] gap-2 font-light */}
          <a href={url.registrationUrl}>
            <div className="py-2 px-4 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200">Register</div>
            {' '}
            {/* Eski: py-2 rounded-[35px] px-5 (hover efektleri yoktu) */}
          </a>
          <div className="py-2 px-4 rounded-md bg-brand-primary text-white shadow-sm">
            {' '}
            {/* Eski: py-2 rounded-[35px] px-6 bg-brand-primary text-white */}
            Login
          </div>
        </div>
      )}

      <div id="kc-form">
        <div id="kc-form-wrapper">
          {realm.password && (
            <form
              id="kc-form-login"
              onSubmit={() => {
                setIsLoginButtonDisabled(true)
                return true
              }}
              action={url.loginAction}
              method="post"
              className="flex flex-col gap-5"
            >
              {!usernameHidden && (
                <FieldContainer>
                  {' '}
                  {/* Modüler field container */}
                  <Label htmlFor="username" className="text-gray-600">
                    {!realm.loginWithEmailAllowed
                      ? msg('username')
                      : !realm.registrationEmailAsUsername
                          ? msg('usernameOrEmail')
                          : msg('email')}
                  </Label>
                  <Input
                    tabIndex={0}
                    type="text"
                    name="username"
                    defaultValue={login.username ?? ''}
                    id="username"
                    placeholder={
                      !realm.loginWithEmailAllowed
                        ? msgStr('username')
                        : !realm.registrationEmailAsUsername
                            ? msgStr('usernameOrEmail')
                            : msgStr('email')
                    }
                    autoComplete="username"
                    className={cn(
                      messagesPerField.existsError('username', 'password')
                      && 'border border-error-secondary !text-error-primary placeholder:text-error-primary',
                    )}
                  />
                  {messagesPerField.existsError('username', 'password') && (
                    <span
                      id="input-error"
                      className="text-error-secondary"
                      aria-live="polite"
                      dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                          messagesPerField.getFirstError(
                            'username',
                            'password',
                          ),
                        ),
                      }}
                    />
                  )}
                </FieldContainer>
              )}

              <FieldContainer>
                {' '}
                {/* Modüler field container */}
                <Label
                  htmlFor="password"
                  className={cn(kcClsx('kcLabelClass'), 'text-gray-600')}
                >
                  {msg('password')}
                </Label>
                <PasswordWrapper
                  kcClsx={kcClsx}
                  i18n={i18n}
                  passwordInputId="password"
                >
                  <Input
                    type="password"
                    tabIndex={0}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    aria-invalid={messagesPerField.existsError(
                      'username',
                      'password',
                    )}
                    placeholder="Password"
                    className={cn(
                      'w-full pr-10', // w-full: container genişliği, pr-10: göz ikonu için sağ padding
                      messagesPerField.existsError('username', 'password')
                      && 'border border-error-secondary !text-error-primary placeholder:text-error-primary',
                    )}
                  />
                </PasswordWrapper>
                {usernameHidden
                  && messagesPerField.existsError('username', 'password') && (
                  <span
                    id="input-error"
                    className="text-error-secondary"
                    aria-live="polite"
                    dangerouslySetInnerHTML={{
                      __html: kcSanitize(
                        messagesPerField.getFirstError(
                          'username',
                          'password',
                        ),
                      ),
                    }}
                  />
                )}
              </FieldContainer>

              <div className="flex flex-row justify-between items-center gap-2">
                <div id="kc-form-options" className="flex flex-row gap-2">
                  {realm.rememberMe && !usernameHidden && (
                    <div className="flex flex-row gap-2 items-center">
                      <Checkbox
                        name="rememberMe"
                        id="rememberMe"
                        defaultChecked={!!login.rememberMe}
                      />
                      <Label htmlFor="rememberMe" className="text-sm">
                        {msg('rememberMe')}
                      </Label>
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  {realm.resetPasswordAllowed && (
                    <a
                      tabIndex={0}
                      href={url.loginResetCredentialsUrl}
                      className="text-brand-primary hover:underline text-sm"
                    >
                      {msg('doForgotPassword')}
                    </a>
                  )}
                </div>
              </div>

              <div id="kc-form-buttons" className="flex flex-col gap-2">
                <input
                  type="hidden"
                  id="id-hidden-input"
                  name="credentialId"
                  value={auth.selectedCredential}
                />
                <Button
                  tabIndex={0}
                  disabled={isLoginButtonDisabled}
                  className="w-full bg-brand-primary text-white h-[48px] hover:bg-brand-primary/90 disabled:opacity-50 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md" // Eski: h-[45px] (modern animasyonlar ve gölgeler eklendi)
                  type="submit"
                >
                  {msgStr('doLogIn')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Template>
  )
}
