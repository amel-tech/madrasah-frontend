import { DownloadIcon } from '@madrasah/icons/ssr'
import { Button } from '@madrasah/ui/components/button'
import { useRef } from 'react'

export const TableHeader = ({ onDeckFileImport, onClickDownloadSampleFile }: {
  onDeckFileImport: (file: File) => void
  onClickDownloadSampleFile: () => void
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
    <div className="flex justify-between mb-4">
      <div className="flex gap-2">
        <Button onClick={onButtonClick}>
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

        <Button onClick={onClickDownloadSampleFile} variant="outline">
          <DownloadIcon />
          {' '}
          <small>
            Download Sample File
          </small>
        </Button>
      </div>
    </div>
  )
}
