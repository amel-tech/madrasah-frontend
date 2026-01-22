import z from 'zod'
import { Control } from 'react-hook-form'
import { useTranslations } from 'next-intl'

import ATFormGroup from '@madrasah/ui/custom/form-group'
import ATFormGroupTagsInput from '@madrasah/ui/custom/form-group-tags-input'
import ATFormGroupTextArea from '@madrasah/ui/custom/form-group-text-area'
import ATFormGroupTabs from '@madrasah/ui/custom/form-group-tabs'
import { deckMetaFormSchema } from '~/features/flashcards/validations/deck-meta-form-schema'

interface IDeckMetaFormProps {
  control: Control<z.infer<typeof deckMetaFormSchema>>
}

export default function DeckMetaForm({ control }: IDeckMetaFormProps) {
  const t = useTranslations('tedris')
  return (
    <>
      <ATFormGroup
        name="title"
        label={t('DeckMetaForm.deckName')}
        placeholder={t('DeckMetaForm.deckNamePlaceholder')}
        required
        control={control}
      />
      <ATFormGroupTextArea
        name="description"
        label={t('DeckMetaForm.description')}
        placeholder={t('DeckMetaForm.descriptionPlaceholder')}
        control={control}
        required
      />
      <ATFormGroupTagsInput
        name="tagIds"
        label={t('DeckMetaForm.tags')}
        placeholder={t('DeckMetaForm.tagsPlaceholder')}
        control={control}
        showDropdownTrigger
        defaultValue={[]}
        required
      />
      <ATFormGroupTabs
        name="isPublic"
        label={t('DeckMetaForm.whoCanSee')}
        tabs={[
          { value: true, label: t('DeckMetaForm.public') },
          { value: false, label: t('DeckMetaForm.private') },
        ]}
        control={control}
      />
    </>
  )
}
