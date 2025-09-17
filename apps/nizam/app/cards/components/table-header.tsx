import { DownloadIcon } from '@madrasah/icons/ssr'
import { Button } from '@madrasah/ui/components/button'
import { useRef } from 'react'

export const TableHeader = ({ onCardCreate, onDeckFileImport }: {
  onCardCreate: () => void
  onDeckFileImport: (file: File) => void
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onDeckFileImport(file)
      e.target.value = '' // reset input so same file can be uploaded again
    }
  }
  return (
    <div className="flex items-center justify-between mb-4">
      <Button onClick={onCardCreate}>Create a new random card</Button>
      <Button onClick={onButtonClick} variant="ghost">
        <DownloadIcon />
        {' '}
        <small>
          Import From Excel
        </small>
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  )
}
