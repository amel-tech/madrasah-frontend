import { UploadIcon } from '@madrasah/icons'
import { DownloadIcon } from '@madrasah/icons/ssr'
import { Button } from '@madrasah/ui/components/button'
import { useRef } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@madrasah/ui/components/dropdown-menu'
import { useTranslations } from 'next-intl'

export const TableHeader = ({
  title,
  description,
  onDeckFileImport,
  onClickDownloadSampleFile,
}: {
  title: string
  description: string
  onDeckFileImport: (file: File) => void
  onClickDownloadSampleFile: () => void
}) => {
  const t = useTranslations('nizam')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
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
    <div className="flex items-end justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <DropdownMenu modal>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {t('CardsTableHeader.bulkActions')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuItem onClick={handleUploadClick}>
              <UploadIcon />
              {' '}
              {t('CardsTableHeader.importFromExcel')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onClickDownloadSampleFile} disabled>
              <DownloadIcon />
              {' '}
              {t('CardsTableHeader.downloadAsExcel')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onClickDownloadSampleFile}>
              <DownloadIcon />
              {' '}
              {t('CardsTableHeader.downloadSampleFile')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  )
}
