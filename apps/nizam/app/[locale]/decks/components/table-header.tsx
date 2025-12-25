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

export function TableHeader() {
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
        title: 'Validation Error',
        description: 'Deck title is required.',
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await createFlashcardDeck(formData)

      if (result.success) {
        toastHelper.success({
          title: 'Deck Created',
          description: 'New flashcard deck was created successfully.',
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
          title: 'Creation Failed',
          description: result.error || 'Failed to create the deck. Please try again.',
        })
      }
    }
    catch (error) {
      console.error('Error creating deck:', error)
      toastHelper.error({
        title: 'Creation Error',
        description: 'An unexpected error occurred while creating the deck.',
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
        <h1 className="text-2xl font-bold">Flashcard Decks</h1>
        <p className="text-muted-foreground">Manage your flashcard decks and study materials.</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="h-4 w-4" />
            New Deck
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create New Deck</DialogTitle>
              <DialogDescription>
                Create a new flashcard deck to organize your study materials.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                  placeholder="Enter deck title..."
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={e => handleInputChange('description', e.target.value)}
                  placeholder="Enter deck description..."
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
                <Label htmlFor="isPublic">Make this deck public</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Deck'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
