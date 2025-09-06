import { useEffect } from 'react'
import { kcSanitize } from 'keycloakify/lib/kcSanitize'
import { getKcClsx } from 'keycloakify/login/lib/kcClsx'
import { useSetClassName } from 'keycloakify/tools/useSetClassName'
import { useInitialize } from 'keycloakify/login/Template.useInitialize'
import type { I18n } from './i18n'
import type { KcContext } from './KcContext'
import type { ExtendedTemplateProps } from './types/TemplateProps'

import { Button } from '@madrasah/ui/components/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@madrasah/ui/components/select'
import { Alert, AlertDescription } from '@madrasah/ui/components/alert'
import { cn } from '@madrasah/ui/lib/utils'
import { Badge } from '@madrasah/ui/components/badge'

import BackgroundImage from './assets/background.png'
import { CheckIcon, InfoIcon, WarningCircleIcon, XIcon } from '@madrasah/icons'

export default function Template(
  props: ExtendedTemplateProps<KcContext, I18n>,
) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    headerSubNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes })

  const { msg, msgStr, enabledLanguages } = i18n

  const { realm, auth, url, message, isAppInitiatedAction } = kcContext

  useEffect(() => {
    document.title = documentTitle ?? msgStr('loginTitle', realm.displayName)
  }, [documentTitle, msgStr, realm.displayName])

  useSetClassName({
    qualifiedName: 'html',
    className: kcClsx('kcHtmlClass'),
  })

  useSetClassName({
    qualifiedName: 'body',
    className: bodyClassName ?? cn(kcClsx('kcBodyClass'), '!bg-none'),
  })

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss })

  if (!isReadyToRender) {
    return null
  }

  return (
    <div className={cn(kcClsx('kcLoginClass'), 'min-h-screen flex')}>
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div
            className={cn(
              kcClsx('kcFormCardClass'),
              'bg-white rounded-xl border-0 p-6 md:p-8',
            )}
          >
            <div className="block md:hidden mb-4">
              <div className="flex justify-center">
                <img
                  src={BackgroundImage}
                  alt="Madrasah Background"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
            <header className={cn(kcClsx('kcFormHeaderClass'), 'mb-6 md:mb-8')}>
              {enabledLanguages.length > 1 && (
                <div className={kcClsx('kcLocaleMainClass')} id="kc-locale">
                  <div
                    id="kc-locale-wrapper"
                    className={cn(kcClsx('kcLocaleWrapperClass'), 'hidden')}
                  >
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={msgStr('languages')} />
                      </SelectTrigger>
                      <SelectContent
                        role="menu"
                        id="language-switch1"
                        aria-labelledby="kc-current-locale-link"
                        aria-activedescendant=""
                      >
                        {enabledLanguages.map(
                          ({ languageTag, label, href }, i) => (
                            <SelectItem
                              key={languageTag}
                              value={href}
                              role="menuitem"
                              id={`language-${i + 1}`}
                            >
                              {label}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              {(() => {
                const node = !(
                  auth !== undefined
                  && auth.showUsername
                  && !auth.showResetCredentials
                )
                  ? (
                      <div className="text-center mb-4">
                        <h1
                          id="kc-page-title"
                          className="font-bold text-gray-900 mb-2 text-[24px] md:text-[30px]"
                        >
                          {headerNode}
                        </h1>
                        {headerSubNode && (
                          <p
                            className="text-sm text-black font-light text-[14px] md:text-[16px]"
                            id="kc-page-subtitle"
                          >
                            {headerSubNode}
                          </p>
                        )}
                      </div>
                    )
                  : (
                      <div
                        id="kc-username"
                        className={cn(
                          kcClsx('kcFormGroupClass'),
                          'mb-6 p-4 bg-gray-50 rounded-lg border',
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <label
                              id="kc-attempted-username"
                              className="text-sm font-medium text-gray-700"
                            >
                              {auth.attemptedUsername}
                            </label>
                            <Badge variant="secondary" className="text-xs">
                              User
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              id="reset-login"
                              href={url.loginRestartFlowUrl}
                              aria-label={msgStr('restartLoginTooltip')}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <div className="flex items-center gap-2">
                                <i className={kcClsx('kcResetFlowIcon')}></i>
                                <span className="text-xs">
                                  {msg('restartLoginTooltip')}
                                </span>
                              </div>
                            </a>
                          </Button>
                        </div>
                      </div>
                    )

                if (displayRequiredFields) {
                  return (
                    <div className={kcClsx('kcContentWrapperClass')}>
                      <div
                        className={cn(kcClsx('kcLabelWrapperClass'), 'mb-4')}
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">
                            *
                          </Badge>
                          <p className="text-sm text-gray-600">
                            {msg('requiredFields')}
                          </p>
                        </div>
                      </div>
                      {node}
                    </div>
                  )
                }

                return node
              })()}
            </header>
            <div id="kc-content">
              <div id="kc-content-wrapper">
                {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                {displayMessage
                  && message !== undefined
                  && (message.type !== 'warning' || !isAppInitiatedAction) && (
                  <Alert
                    variant={
                      message.type === 'error' ? 'destructive' : 'default'
                    }
                    className={cn(
                      'mb-6 flex flex-row items-center',
                      message.type === 'success'
                      && 'border-green-200 bg-green-50',
                      message.type === 'warning'
                      && 'border-yellow-200 bg-yellow-50',
                      message.type === 'info' && 'border-blue-200 bg-blue-50',
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div>
                        {message.type === 'success' && (
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckIcon className="w-3 h-3 text-green-600" />
                          </div>
                        )}
                        {message.type === 'warning' && (
                          <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                            <WarningCircleIcon className="w-3 h-3 text-yellow-600" />
                          </div>
                        )}
                        {message.type === 'error' && (
                          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                            <XIcon className="w-3 h-3 text-red-600" />
                          </div>
                        )}
                        {message.type === 'info' && (
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                            <InfoIcon className="w-3 h-3 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <AlertDescription
                        className={cn(
                          'text-sm flex-1',
                          message.type === 'error' && 'text-red-800',
                          message.type === 'success' && 'text-green-800',
                          message.type === 'warning' && 'text-yellow-800',
                          message.type === 'info' && 'text-blue-800',
                        )}
                        dangerouslySetInnerHTML={{
                          __html: kcSanitize(message.summary),
                        }}
                      />
                    </div>
                  </Alert>
                )}

                {children}

                {auth !== undefined && auth.showTryAnotherWayLink && (
                  <form
                    id="kc-select-try-another-way-form"
                    action={url.loginAction}
                    method="post"
                    className="mt-6"
                  >
                    <div className={kcClsx('kcFormGroupClass')}>
                      <input type="hidden" name="tryAnotherWay" value="on" />
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          const form
                            = document.forms[
                              'kc-select-try-another-way-form' as never
                            ]
                          if (form) {
                            form.submit()
                          }
                          return false
                        }}
                      >
                        {msg('doTryAnotherWay')}
                      </Button>
                    </div>
                  </form>
                )}

                {socialProvidersNode}

                {displayInfo && (
                  <div
                    id="kc-info"
                    className={cn(
                      kcClsx('kcSignUpClass'),
                      'mt-8 p-4 bg-gray-50 rounded-lg',
                    )}
                  >
                    <div
                      id="kc-info-wrapper"
                      className={kcClsx('kcInfoAreaWrapperClass')}
                    >
                      {infoNode}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right side - Image/Branding */}
      <div id="kc-header" className={cn('hidden md:flex flex-1 items-center relative')}>
        <img
          src={BackgroundImage}
          alt="Madrasah Background"
          className="h-10/12"
        />
      </div>
    </div>
  )
}
