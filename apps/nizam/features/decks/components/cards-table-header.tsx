import { UploadIcon } from '@madrasah/icons'
import { DownloadIcon } from '@madrasah/icons/ssr'
import { Button } from '@madrasah/ui/components/button'
import { useRef } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@madrasah/ui/components/dropdown-menu'
import { useTranslations } from 'next-intl'

export const CardsTableHeader = ({
  title,
  description,
  onDeckFileImport,
  onClickDownloadSampleFile,
}: {
  title: string
  description: string
  onDeckFileImport: (file: File) => void
  onClickDownloadSampleFile: (format: 'csv' | 'xlsx') => void
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
      e.target.value = ''
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
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DownloadIcon />
                {' '}
                {t('CardsTableHeader.downloadSampleFile')}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => onClickDownloadSampleFile('csv')}>
                  CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onClickDownloadSampleFile('xlsx')}>
                  Excel
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  )
}
