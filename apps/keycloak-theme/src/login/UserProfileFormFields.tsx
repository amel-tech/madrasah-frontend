import { useEffect, Fragment } from 'react'
import { assert } from 'keycloakify/tools/assert'
import type { KcClsx } from 'keycloakify/login/lib/kcClsx'
import {
  useUserProfileForm,
  getButtonToDisplayForMultivaluedAttributeField,
  type FormAction,
  type FormFieldError,
} from 'keycloakify/login/lib/useUserProfileForm'
import type { UserProfileFormFieldsProps } from 'keycloakify/login/UserProfileFormFieldsProps'
import type { Attribute } from 'keycloakify/login/KcContext'
import type { KcContext } from './KcContext'
import type { I18n } from './i18n'

import { Input } from '@madrasah/ui/components/input'
import { Label } from '@madrasah/ui/components/label'
import { Checkbox } from '@madrasah/ui/components/checkbox'
import { Button } from '@madrasah/ui/components/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@madrasah/ui/components/select'
import { cn } from '@madrasah/ui/lib/utils'
import { PasswordWrapper } from './components/PasswordWrapper'
import { FieldContainer } from './components/FieldContainer'

export default function UserProfileFormFields(
  props: UserProfileFormFieldsProps<KcContext, I18n>,
) {
  const {
    kcContext,
    i18n,
    kcClsx,
    onIsFormSubmittableValueChange,
    doMakeUserConfirmPassword,
    BeforeField,
    AfterField,
  } = props

  const { advancedMsg } = i18n

  const {
    formState: { formFieldStates, isFormSubmittable },
    dispatchFormAction,
  } = useUserProfileForm({
    kcContext,
    i18n,
    doMakeUserConfirmPassword,
  })

  useEffect(() => {
    onIsFormSubmittableValueChange(isFormSubmittable)
  }, [isFormSubmittable, onIsFormSubmittableValueChange])

  const groupNameRef = { current: '' }

  return (
    <>
      {formFieldStates.map(
        ({ attribute, displayableErrors, valueOrValues }) => {
          return (
            <Fragment key={attribute.name}>
              <GroupLabel
                attribute={attribute}
                groupNameRef={groupNameRef}
                i18n={i18n}
                kcClsx={kcClsx}
              />
              {BeforeField !== undefined && (
                <BeforeField
                  attribute={attribute}
                  dispatchFormAction={dispatchFormAction}
                  displayableErrors={displayableErrors}
                  valueOrValues={valueOrValues}
                  kcClsx={kcClsx}
                  i18n={i18n}
                />
              )}
              <FieldContainer
                className={
                  attribute.annotations.inputType === 'hidden'
                  || (attribute.name === 'password-confirm'
                    && !doMakeUserConfirmPassword)
                    ? 'hidden'
                    : undefined
                }
              >
                <div className="flex flex-col gap-1">
                  <Label htmlFor={attribute.name} className="text-gray-600">
                    {advancedMsg(attribute.displayName ?? '')}
                    {attribute.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </Label>
                </div>
                <div className="flex flex-col gap-1">
                  {attribute.annotations.inputHelperTextBefore
                    !== undefined && (
                    <div
                      className="text-sm text-gray-500"
                      id={`form-help-text-before-${attribute.name}`}
                      aria-live="polite"
                    >
                      {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                    </div>
                  )}
                  <InputFieldByType
                    attribute={attribute}
                    valueOrValues={valueOrValues}
                    displayableErrors={displayableErrors}
                    dispatchFormAction={dispatchFormAction}
                    kcClsx={kcClsx}
                    i18n={i18n}
                  />
                  <FieldErrors
                    attribute={attribute}
                    displayableErrors={displayableErrors}
                    kcClsx={kcClsx}
                    fieldIndex={undefined}
                  />
                  {attribute.annotations.inputHelperTextAfter !== undefined && (
                    <div
                      className="text-sm text-gray-500"
                      id={`form-help-text-after-${attribute.name}`}
                      aria-live="polite"
                    >
                      {advancedMsg(attribute.annotations.inputHelperTextAfter)}
                    </div>
                  )}
                  {AfterField !== undefined && (
                    <AfterField
                      attribute={attribute}
                      dispatchFormAction={dispatchFormAction}
                      displayableErrors={displayableErrors}
                      valueOrValues={valueOrValues}
                      kcClsx={kcClsx}
                      i18n={i18n}
                    />
                  )}
                  {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                </div>
              </FieldContainer>
            </Fragment>
          )
        },
      )}
    </>
  )
}

function GroupLabel(props: {
  attribute: Attribute
  groupNameRef: {
    current: string
  }
  i18n: I18n
  kcClsx: KcClsx
}) {
  const { attribute, groupNameRef, i18n } = props

  const { advancedMsg } = i18n

  if (attribute.group?.name !== groupNameRef.current) {
    groupNameRef.current = attribute.group?.name ?? ''

    if (groupNameRef.current !== '') {
      assert(attribute.group !== undefined)

      return (
        <div
          className="flex flex-col gap-3 mb-6"
          {...Object.fromEntries(
            Object.entries(attribute.group.html5DataAnnotations).map(
              ([key, value]) => [`data-${key}`, value],
            ),
          )}
        >
          {(() => {
            const groupDisplayHeader = attribute.group.displayHeader ?? ''
            const groupHeaderText
              = groupDisplayHeader !== ''
                ? advancedMsg(groupDisplayHeader)
                : attribute.group.name

            return (
              <div className="flex flex-col gap-1">
                <Label
                  id={`header-${attribute.group.name}`}
                  className="text-lg font-semibold text-gray-800"
                >
                  {groupHeaderText}
                </Label>
              </div>
            )
          })()}
          {(() => {
            const groupDisplayDescription
              = attribute.group.displayDescription ?? ''

            if (groupDisplayDescription !== '') {
              const groupDescriptionText = advancedMsg(groupDisplayDescription)

              return (
                <div className="flex flex-col gap-1">
                  <Label
                    id={`description-${attribute.group.name}`}
                    className="text-sm text-gray-600"
                  >
                    {groupDescriptionText}
                  </Label>
                </div>
              )
            }

            return null
          })()}
        </div>
      )
    }
  }

  return null
}

function FieldErrors(props: {
  attribute: Attribute
  displayableErrors: FormFieldError[]
  fieldIndex: number | undefined
  kcClsx: KcClsx
}) {
  const { attribute, fieldIndex } = props

  const displayableErrors = props.displayableErrors.filter(
    error => error.fieldIndex === fieldIndex,
  )

  if (displayableErrors.length === 0) {
    return null
  }

  return (
    <span
      id={`input-error-${attribute.name}${fieldIndex === undefined ? '' : `-${fieldIndex}`}`}
      className="text-error-secondary text-sm"
      aria-live="polite"
    >
      {displayableErrors
        .filter(error => error.fieldIndex === fieldIndex)
        .map(({ errorMessage }, i, arr) => (
          <Fragment key={i}>
            {errorMessage}
            {arr.length - 1 !== i && <br />}
          </Fragment>
        ))}
    </span>
  )
}

type InputFieldByTypeProps = {
  attribute: Attribute
  valueOrValues: string | string[]
  displayableErrors: FormFieldError[]
  dispatchFormAction: React.Dispatch<FormAction>
  i18n: I18n
  kcClsx: KcClsx
}

function InputFieldByType(props: InputFieldByTypeProps) {
  const { attribute, valueOrValues } = props

  switch (attribute.annotations.inputType) {
    // NOTE: Unfortunately, keycloak won't let you define input type="hidden" in the Admin Console.
    // sometimes in the future it might.
    case 'hidden':
      return (
        <input type="hidden" name={attribute.name} value={valueOrValues} />
      )
    case 'textarea':
      return <TextareaTag {...props} />
    case 'select':
    case 'multiselect':
      return <SelectTag {...props} />
    case 'select-radiobuttons':
    case 'multiselect-checkboxes':
      return <InputTagSelects {...props} />
    default: {
      if (valueOrValues instanceof Array) {
        return (
          <>
            {valueOrValues.map((...[, i]) => (
              <InputTag key={i} {...props} fieldIndex={i} />
            ))}
          </>
        )
      }

      const inputNode = <InputTag {...props} fieldIndex={undefined} />

      if (
        attribute.name === 'password'
        || attribute.name === 'password-confirm'
      ) {
        return (
          <PasswordWrapper
            kcClsx={props.kcClsx}
            i18n={props.i18n}
            passwordInputId={attribute.name}
          >
            {inputNode}
          </PasswordWrapper>
        )
      }

      return inputNode
    }
  }
}

function InputTag(
  props: InputFieldByTypeProps & { fieldIndex: number | undefined },
) {
  const {
    attribute,
    fieldIndex,
    dispatchFormAction,
    valueOrValues,
    i18n,
    displayableErrors,
  } = props

  const { advancedMsgStr } = i18n

  return (
    <>
      <Input
        type={(() => {
          const { inputType } = attribute.annotations

          if (inputType?.startsWith('html5-')) {
            return inputType.slice(6)
          }

          return inputType ?? 'text'
        })()}
        id={attribute.name}
        name={attribute.name}
        value={(() => {
          if (fieldIndex !== undefined) {
            assert(valueOrValues instanceof Array)
            return valueOrValues[fieldIndex]
          }

          assert(typeof valueOrValues === 'string')

          return valueOrValues
        })()}
        className={cn(
          (attribute.name === 'password' || attribute.name === 'password-confirm') && 'pr-10',
          displayableErrors.find(error => error.fieldIndex === fieldIndex)
          !== undefined
          && 'border-error-secondary !text-error-primary placeholder:text-error-primary',
        )}
        aria-invalid={
          displayableErrors.find(error => error.fieldIndex === fieldIndex)
          !== undefined
        }
        disabled={attribute.readOnly}
        autoComplete={attribute.autocomplete}
        placeholder={
          attribute.annotations.inputTypePlaceholder === undefined
            ? undefined
            : advancedMsgStr(attribute.annotations.inputTypePlaceholder)
        }
        {...Object.fromEntries(
          Object.entries(attribute.html5DataAnnotations ?? {}).map(
            ([key, value]) => [`data-${key}`, value],
          ),
        )}
        onChange={event =>
          dispatchFormAction({
            action: 'update',
            name: attribute.name,
            valueOrValues: (() => {
              if (fieldIndex !== undefined) {
                assert(valueOrValues instanceof Array)

                return valueOrValues.map((value, i) => {
                  if (i === fieldIndex) {
                    return event.target.value
                  }

                  return value
                })
              }

              return event.target.value
            })(),
          })}
        onBlur={() =>
          dispatchFormAction({
            action: 'focus lost',
            name: attribute.name,
            fieldIndex: fieldIndex,
          })}
      />
      {(() => {
        if (fieldIndex === undefined) {
          return null
        }

        assert(valueOrValues instanceof Array)

        const values = valueOrValues

        return (
          <>
            <FieldErrors
              attribute={attribute}
              kcClsx={props.kcClsx}
              displayableErrors={displayableErrors}
              fieldIndex={fieldIndex}
            />
            <AddRemoveButtonsMultiValuedAttribute
              attribute={attribute}
              values={values}
              fieldIndex={fieldIndex}
              dispatchFormAction={dispatchFormAction}
              i18n={i18n}
            />
          </>
        )
      })()}
    </>
  )
}

function AddRemoveButtonsMultiValuedAttribute(props: {
  attribute: Attribute
  values: string[]
  fieldIndex: number
  dispatchFormAction: React.Dispatch<Extract<FormAction, { action: 'update' }>>
  i18n: I18n
}) {
  const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props

  const { msg } = i18n

  const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({
    attribute,
    values,
    fieldIndex,
  })

  const idPostfix = `-${attribute.name}-${fieldIndex + 1}`

  return (
    <div className="flex gap-2 mt-2">
      {hasRemove && (
        <Button
          id={`kc-remove${idPostfix}`}
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            dispatchFormAction({
              action: 'update',
              name: attribute.name,
              valueOrValues: values.filter((_, i) => i !== fieldIndex),
            })}
        >
          {msg('remove')}
        </Button>
      )}
      {hasAdd && (
        <Button
          id={`kc-add${idPostfix}`}
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            dispatchFormAction({
              action: 'update',
              name: attribute.name,
              valueOrValues: [...values, ''],
            })}
        >
          {msg('addValue')}
        </Button>
      )}
    </div>
  )
}

function InputTagSelects(props: InputFieldByTypeProps) {
  const { attribute, dispatchFormAction, i18n, valueOrValues } = props

  const { inputType } = attribute.annotations

  assert(
    inputType === 'select-radiobuttons'
    || inputType === 'multiselect-checkboxes',
  )

  const options = (() => {
    walk: {
      const { inputOptionsFromValidation } = attribute.annotations

      if (inputOptionsFromValidation === undefined) {
        break walk
      }

      const validator = (
        attribute.validators as Record<string, { options?: string[] }>
      )[inputOptionsFromValidation]

      if (validator === undefined) {
        break walk
      }

      if (validator.options === undefined) {
        break walk
      }

      return validator.options
    }

    return attribute.validators.options?.options ?? []
  })()

  return (
    <div className="flex flex-col gap-3">
      {options.map(option => (
        <div key={option} className="flex items-center space-x-2">
          {inputType === 'multiselect-checkboxes'
            ? (
                <Checkbox
                  id={`${attribute.name}-${option}`}
                  name={attribute.name}
                  value={option}
                  checked={
                    valueOrValues instanceof Array
                      ? valueOrValues.includes(option)
                      : valueOrValues === option
                  }
                  onCheckedChange={checked =>
                    dispatchFormAction({
                      action: 'update',
                      name: attribute.name,
                      valueOrValues: (() => {
                        const isChecked = !!checked

                        if (valueOrValues instanceof Array) {
                          const newValues = [...valueOrValues]

                          if (isChecked) {
                            newValues.push(option)
                          }
                          else {
                            newValues.splice(newValues.indexOf(option), 1)
                          }

                          return newValues
                        }

                        return isChecked ? option : ''
                      })(),
                    })}
                  disabled={attribute.readOnly}
                  aria-invalid={props.displayableErrors.length !== 0}
                />
              )
            : (
                <input
                  type="radio"
                  id={`${attribute.name}-${option}`}
                  name={attribute.name}
                  value={option}
                  className="w-4 h-4 text-brand-primary bg-gray-100 border-gray-300 focus:ring-brand-primary focus:ring-2"
                  disabled={attribute.readOnly}
                  checked={
                    valueOrValues instanceof Array
                      ? valueOrValues.includes(option)
                      : valueOrValues === option
                  }
                  onChange={event =>
                    dispatchFormAction({
                      action: 'update',
                      name: attribute.name,
                      valueOrValues: event.target.checked ? option : '',
                    })}
                  onBlur={() =>
                    dispatchFormAction({
                      action: 'focus lost',
                      name: attribute.name,
                      fieldIndex: undefined,
                    })}
                />
              )}
          <Label
            htmlFor={`${attribute.name}-${option}`}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              attribute.readOnly && 'opacity-50',
            )}
          >
            {inputLabel(i18n, attribute, option)}
          </Label>
        </div>
      ))}
    </div>
  )
}

function TextareaTag(props: InputFieldByTypeProps) {
  const { attribute, dispatchFormAction, displayableErrors, valueOrValues }
    = props

  assert(typeof valueOrValues === 'string')

  const value = valueOrValues

  return (
    <textarea
      id={attribute.name}
      name={attribute.name}
      className={cn(
        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        displayableErrors.length !== 0
        && 'border-error-secondary !text-error-primary placeholder:text-error-primary',
      )}
      aria-invalid={displayableErrors.length !== 0}
      disabled={attribute.readOnly}
      cols={
        attribute.annotations.inputTypeCols === undefined
          ? undefined
          : parseInt(`${attribute.annotations.inputTypeCols}`)
      }
      rows={
        attribute.annotations.inputTypeRows === undefined
          ? undefined
          : parseInt(`${attribute.annotations.inputTypeRows}`)
      }
      maxLength={
        attribute.annotations.inputTypeMaxlength === undefined
          ? undefined
          : parseInt(`${attribute.annotations.inputTypeMaxlength}`)
      }
      value={value}
      onChange={event =>
        dispatchFormAction({
          action: 'update',
          name: attribute.name,
          valueOrValues: event.target.value,
        })}
      onBlur={() =>
        dispatchFormAction({
          action: 'focus lost',
          name: attribute.name,
          fieldIndex: undefined,
        })}
    />
  )
}

function SelectTag(props: InputFieldByTypeProps) {
  const {
    attribute,
    dispatchFormAction,
    displayableErrors,
    i18n,
    valueOrValues,
  } = props

  const isMultiple = attribute.annotations.inputType === 'multiselect'

  const options = (() => {
    walk: {
      const { inputOptionsFromValidation } = attribute.annotations

      if (inputOptionsFromValidation === undefined) {
        break walk
      }

      assert(typeof inputOptionsFromValidation === 'string')

      const validator = (
        attribute.validators as Record<string, { options?: string[] }>
      )[inputOptionsFromValidation]

      if (validator === undefined) {
        break walk
      }

      if (validator.options === undefined) {
        break walk
      }

      return validator.options
    }

    return attribute.validators.options?.options ?? []
  })()

  if (isMultiple) {
    return (
      <select
        id={attribute.name}
        name={attribute.name}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          displayableErrors.length !== 0
          && 'border-error-secondary !text-error-primary',
        )}
        aria-invalid={displayableErrors.length !== 0}
        disabled={attribute.readOnly}
        multiple={isMultiple}
        size={
          attribute.annotations.inputTypeSize === undefined
            ? undefined
            : parseInt(`${attribute.annotations.inputTypeSize}`)
        }
        value={valueOrValues}
        onChange={event =>
          dispatchFormAction({
            action: 'update',
            name: attribute.name,
            valueOrValues: Array.from(event.target.selectedOptions).map(
              option => option.value,
            ),
          })}
        onBlur={() =>
          dispatchFormAction({
            action: 'focus lost',
            name: attribute.name,
            fieldIndex: undefined,
          })}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {inputLabel(i18n, attribute, option)}
          </option>
        ))}
      </select>
    )
  }

  return (
    <Select
      value={typeof valueOrValues === 'string' ? valueOrValues : ''}
      onValueChange={value =>
        dispatchFormAction({
          action: 'update',
          name: attribute.name,
          valueOrValues: value,
        })}
      disabled={attribute.readOnly}
    >
      <SelectTrigger
        className={cn(
          displayableErrors.length !== 0
          && 'border-error-secondary !text-error-primary',
        )}
        aria-invalid={displayableErrors.length !== 0}
      >
        <SelectValue placeholder="Select an option..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">
          <span className="text-gray-500">Select an option...</span>
        </SelectItem>
        {options.map(option => (
          <SelectItem key={option} value={option}>
            {inputLabel(i18n, attribute, option)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function inputLabel(i18n: I18n, attribute: Attribute, option: string) {
  const { advancedMsg } = i18n

  if (attribute.annotations.inputOptionLabels !== undefined) {
    const { inputOptionLabels } = attribute.annotations

    return advancedMsg(inputOptionLabels[option] ?? option)
  }

  if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
    return advancedMsg(
      `${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`,
    )
  }

  return option
}
