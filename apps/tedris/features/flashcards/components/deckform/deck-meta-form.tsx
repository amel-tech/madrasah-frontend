import z from 'zod'
import { Control } from 'react-hook-form'

import ATFormGroup from '@madrasah/ui/custom/form-group'
import ATFormGroupTextArea from '@madrasah/ui/custom/form-group-text-area'
import ATFormGroupTabs from '@madrasah/ui/custom/form-group-tabs'
import { deckMetaFormSchema } from '~/features/flashcards/validations/deck-meta-form-schema'

interface IDeckMetaFormProps {
  control: Control<z.infer<typeof deckMetaFormSchema>>
}

export default function DeckMetaForm({ control }: IDeckMetaFormProps) {
  return (
    <>
      <ATFormGroup
        name="title"
        label="Deck Name"
        placeholder="Deck Name"
        required
        control={control}
      />
      <ATFormGroupTextArea
        name="description"
        label="Description"
        placeholder="Description"
        control={control}
        required
      />
      <ATFormGroupTabs
        name="isPublic"
        label="Who can see this deck?"
        tabs={[
          { value: true, label: 'Public' },
          { value: false, label: 'Private' },
        ]}
        control={control}
      />
    </>
  )
}
