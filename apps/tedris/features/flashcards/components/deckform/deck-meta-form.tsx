import ATFormGroup from '@madrasah/ui/custom/form-group'
import ATFormGroupTextArea from '@madrasah/ui/custom/form-group-text-area'
import { UseFormReturn } from 'react-hook-form'

export interface IDeckMeta {
  name: string
  description: string
  tags: string[]
  is_public: boolean
}

interface IDeckMetaFormProps {
  form: UseFormReturn<IDeckMeta>
}

export default function DeckMetaForm({ form }: IDeckMetaFormProps) {
  return (
    <>
      <ATFormGroup
        name="name"
        label="Deck Name"
        placeholder="Deck Name"
        required
        form={form}
      />
      <ATFormGroupTextArea
        name="description"
        label="Description"
        placeholder="Description"
        form={form}
        required
      />
      <ATFormGroup
        name="tags"
        label="Tags"
        required
        form={form}
      />
      <ATFormGroup
        name="is_public"
        label="Who can see this deck?"
        required
        form={form}
      />
    </>
  )
}
