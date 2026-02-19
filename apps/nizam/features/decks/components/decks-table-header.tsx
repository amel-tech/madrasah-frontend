'use client'

import React, { useState } from 'react'
import { Button } from '@madrasah/ui/components/button'
import { Input } from '@madrasah/ui/components/input'
import { Label } from '@madrasah/ui/components/label'
import { Textarea } from '@madrasah/ui/components/textarea'
import { Switch } from '@madrasah/ui/components/switch'
import { toastHelper } from '@madrasah/ui/lib/toast-helper'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@madrasah/ui/components/dialog'
import { PlusIcon } from '@madrasah/icons'
import { createFlashcardDeck } from '~/features/decks/actions'
import { CreateFlashcardDeckDto } from '@madrasah/services/tedrisat'
import { useTranslations } from 'next-intl'

export function DecksTableHeader() {
  const t = useTranslations('nizam')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<CreateFlashcardDeckDto>({
    title: '',
    description: '',
    isPublic: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toastHelper.error({
        title: t('TableHeader.validationError'),
        description: t('TableHeader.validationErrorDescription'),
      })
      return
    }

    setIsLoading(true)

    const result = await createFlashcardDeck(formData)
    if (result.success) {
      toastHelper.success({
        title: t('TableHeader.deckCreated'),
        description: t('TableHeader.deckCreatedDescription'),
      })
      setOpen(false)
      setFormData({
        title: '',
        description: '',
        isPublic: false,
      })
    }
    else {
      toastHelper.error({
        title: t('TableHeader.creationError'),
        description: result.error,
      })
    }
    setIsLoading(false)
  }

  const handleInputChange = (field: keyof CreateFlashcardDeckDto, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold">{t('TableHeader.flashcardDecks')}</h1>
        <p className="text-muted-foreground">{t('TableHeader.manageDecks')}</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="h-4 w-4" />
            {t('TableHeader.newDeck')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{t('TableHeader.createNewDeck')}</DialogTitle>
              <DialogDescription>
                {t('TableHeader.createNewDeckDescription')}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">
                  {t('TableHeader.title')}
                  {' '}
                  *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                  placeholder={t('TableHeader.titlePlaceholder')}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">{t('TableHeader.description')}</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={e => handleInputChange('description', e.target.value)}
                  placeholder={t('TableHeader.descriptionPlaceholder')}
                  rows={3}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked: boolean) => handleInputChange('isPublic', checked)}
                  disabled={true}
                />
                <Label htmlFor="isPublic">{t('TableHeader.makePublic')}</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                {t('TableHeader.cancel')}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? t('TableHeader.creating') : t('TableHeader.createDeck')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
