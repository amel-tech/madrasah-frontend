'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@madrasah/ui/components/dialog'
import type { BulkFlashcardErrorResponse } from '@madrasah/services/tedrisat'
import { useTranslations } from 'next-intl'

export function ImportErrorsDialog({
  errors,
  onClose,
}: {
  errors: BulkFlashcardErrorResponse | null
  onClose: () => void
}) {
  const t = useTranslations('nizam')

  return (
    <Dialog open={errors !== null} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('ImportErrors.title')}</DialogTitle>
          <DialogDescription>{errors?.errorMessage}</DialogDescription>
        </DialogHeader>
        <div className="mt-2 space-y-3">
          {errors?.errors.map(rowError => (
            <div key={rowError.row} className="rounded-md border p-3">
              <p className="text-sm font-medium mb-1">{t('ImportErrors.row', { row: rowError.row })}</p>
              <ul className="space-y-1">
                {rowError.errors.map((fieldError, i) => (
                  <li key={i} className="text-sm text-destructive">
                    <span className="font-medium">{fieldError.field}:</span> {fieldError.message}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
