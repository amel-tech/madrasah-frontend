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
import { createFlashcardDeck } from '../actions'
import { CreateFlashcardDeckDto } from '@madrasah/services/tedrisat'
import { useTranslations } from 'next-intl'

export function TableHeader() {
  const t = useTranslations('nizam.DecksPage')
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
        title: t('Toast.validationError'),
        description: t('Toast.titleRequired'),
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await createFlashcardDeck(formData)

      if (result.success) {
        toastHelper.success({
          title: t('Toast.deckCreated'),
          description: t('Toast.deckCreatedSuccess'),
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
          title: t('Toast.creationFailed'),
          description: result.error || t('Toast.creationFailedMessage'),
        })
      }
    }
    catch (error) {
      console.error('Error creating deck:', error)
      toastHelper.error({
        title: t('Toast.creationError'),
        description: t('Toast.creationErrorMessage'),
      })
    }
    finally {
      setIsLoading(false)
    }
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
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="h-4 w-4" />
            {t('newDeckButton')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{t('Dialog.title')}</DialogTitle>
              <DialogDescription>
                {t('Dialog.description')}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">{t('Dialog.titleLabel')}</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                  placeholder={t('Dialog.titlePlaceholder')}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">{t('Dialog.descriptionLabel')}</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={e => handleInputChange('description', e.target.value)}
                  placeholder={t('Dialog.descriptionPlaceholder')}
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
                <Label htmlFor="isPublic">{t('Dialog.publicLabel')}</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                {t('Dialog.cancelButton')}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? t('Dialog.creatingButton') : t('Dialog.createButton')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
