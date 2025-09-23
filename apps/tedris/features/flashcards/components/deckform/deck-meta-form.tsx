import ATFormGroup from '@madrasah/ui/custom/form-group'
import ATFormGroupTextArea from '@madrasah/ui/custom/form-group-text-area'

interface IDeckMetaFormProps {
  deckMeta: {
    name: string
    description: string
    tags: string[]
    is_public: boolean
  }
  setDeckMeta: React.Dispatch<React.SetStateAction<{
    name: string
    description: string
    tags: string[]
    is_public: boolean
  }>>
}

export default function DeckMetaForm({ deckMeta, setDeckMeta }: IDeckMetaFormProps) {
  const setFormField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDeckMeta({ ...deckMeta, [e.target.id]: e.target.value })
  }

  return (
    <>
      <ATFormGroup
        id="deckName"
        label="Deck Name"
        placeholder="Deck Name"
        required
        value={deckMeta.name}
        onChange={setFormField}
      />
      <ATFormGroupTextArea
        id="description"
        label="Description"
        placeholder="Description"
        value={deckMeta.description}
        required
        onChange={setFormField}
      />
      <ATFormGroup
        id="tags"
        label="Tags"
        required
        value={deckMeta.tags.join(', ')}
        onChange={setFormField}
      />
      <ATFormGroup
        id="is_public"
        label="Who can see this deck?"
        required
        value={String(deckMeta.is_public)}
        onChange={setFormField}
      />
    </>
  )
}
