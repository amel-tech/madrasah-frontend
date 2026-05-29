'use client'

import { useState, useTransition, type ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import { PlusIcon } from '@madrasah/icons'
import { Button } from '@madrasah/ui/components/button'
import { Input } from '@madrasah/ui/components/input'
import { Textarea } from '@madrasah/ui/components/textarea'
import { Label } from '@madrasah/ui/components/label'
import { Switch } from '@madrasah/ui/components/switch'
import { toast } from '@madrasah/ui/components/sonner'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@madrasah/ui/components/dialog'
import type { KoskResponse } from '@madrasah/services/tedrisat'
import { createKosk, updateKosk } from '~/features/kosks/actions'

export function KoskFormDialog({
  kosk,
  trigger,
}: {
  kosk?: KoskResponse
  trigger?: ReactElement
}) {
  const router = useRouter()
  const isEdit = Boolean(kosk)
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  const [name, setName] = useState(kosk?.name ?? '')
  const [handle, setHandle] = useState(kosk?.handle ?? '')
  const [description, setDescription] = useState(kosk?.description ?? '')
  const [isPrivate, setIsPrivate] = useState(kosk?.isPrivate ?? true)

  const reset = () => {
    setName(kosk?.name ?? '')
    setHandle(kosk?.handle ?? '')
    setDescription(kosk?.description ?? '')
    setIsPrivate(kosk?.isPrivate ?? true)
  }

  const submit = () => {
    if (name.trim().length < 2) {
      toast.error('Köşk adı en az 2 karakter olmalıdır.')
      return
    }
    const dto = {
      name: name.trim(),
      handle: handle.trim() || undefined,
      description: description.trim() || undefined,
      isPrivate,
    }
    startTransition(async () => {
      const res = kosk
        ? await updateKosk(kosk.id, dto)
        : await createKosk(dto)
      if (res.success === false) {
        toast.error(res.error)
        return
      }
      toast.success(isEdit ? 'Köşk güncellendi.' : 'Köşk oluşturuldu.')
      setOpen(false)
      router.refresh()
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) reset()
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="lg" className="gap-2">
            <PlusIcon className="w-5 h-5" />
            Yeni Köşk
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Köşkü Düzenle' : 'Yeni Köşk Oluştur'}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div>
            <Label htmlFor="kosk-name" className="mb-1.5">
              Köşk adı
              <span className="text-destructive"> *</span>
            </Label>
            <Input
              id="kosk-name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Örn. Süleymaniye Köşkü"
            />
          </div>

          <div>
            <Label htmlFor="kosk-handle" className="mb-1.5">Kullanıcı adı</Label>
            <Input
              id="kosk-handle"
              value={handle}
              onChange={e => setHandle(e.target.value)}
              placeholder="@suleymaniye"
            />
          </div>

          <div>
            <Label htmlFor="kosk-description" className="mb-1.5">Açıklama</Label>
            <Textarea
              id="kosk-description"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Köşkün sunduğu dersler ve odak alanları."
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <div className="text-sm font-medium">Özel köşk</div>
              <div className="text-xs text-muted-foreground">
                Yalnızca davet edilen talebeler görebilir.
              </div>
            </div>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={pending}>
            İptal
          </Button>
          <Button onClick={submit} disabled={pending}>
            {pending
              ? (isEdit ? 'Kaydediliyor...' : 'Oluşturuluyor...')
              : (isEdit ? 'Kaydet' : 'Oluştur')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
