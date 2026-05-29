'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { CheckIcon, XIcon, UserCircleIcon, BellIcon } from '@madrasah/icons'
import { Button } from '@madrasah/ui/components/button'
import { Card, CardContent } from '@madrasah/ui/components/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@madrasah/ui/components/dialog'
import { toast } from '@madrasah/ui/components/sonner'
import type { PendingEnrollmentResponse } from '@madrasah/services/tedrisat'
import { approveEnrollment, rejectEnrollment } from '~/features/kosks/actions/courses'

export function PendingRequests({
  koskId,
  requests,
}: {
  koskId: string
  requests: PendingEnrollmentResponse[]
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  // Track which row is acting so only its buttons disable.
  const [actingKey, setActingKey] = useState<string | null>(null)

  if (requests.length === 0) return null

  const act = (
    req: PendingEnrollmentResponse,
    fn: typeof approveEnrollment | typeof rejectEnrollment,
    successMsg: string,
  ) => {
    setActingKey(`${req.courseId}:${req.userId}`)
    startTransition(async () => {
      const res = await fn(koskId, req.courseId, req.userId)
      setActingKey(null)
      if (res.success === false) {
        toast.error(res.error)
        return
      }
      toast.success(successMsg)
      // Close the modal once the last request is handled.
      if (requests.length <= 1) setOpen(false)
      router.refresh()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2">
          <BellIcon className="w-5 h-5" />
          Onay bekleyen kayıtlar
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
            {requests.length}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Onay bekleyen kayıtlar</DialogTitle>
          <DialogDescription>
            Talebelerin ders kayıt taleplerini onaylayın veya reddedin.
          </DialogDescription>
        </DialogHeader>

        <div className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto">
          {requests.map((req) => {
            const key = `${req.courseId}:${req.userId}`
            const busy = pending && actingKey === key
            return (
              <Card key={key}>
                <CardContent className="flex items-center gap-4 py-4">
                  <UserCircleIcon className="size-10 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">
                      {req.studentName ?? `Talebe ${req.userId.slice(0, 8)}`}
                    </div>
                    {req.studentEmail && (
                      <div className="truncate text-sm text-muted-foreground">
                        {req.studentEmail}
                      </div>
                    )}
                    <div className="mt-0.5 truncate text-sm text-muted-foreground">
                      {req.courseTitle}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      size="sm"
                      disabled={busy}
                      className="gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700"
                      onClick={() => act(req, approveEnrollment, 'Kayıt onaylandı.')}
                    >
                      <CheckIcon className="size-4" />
                      Onayla
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={busy}
                      className="gap-1.5"
                      onClick={() => act(req, rejectEnrollment, 'Kayıt reddedildi.')}
                    >
                      <XIcon className="size-4" />
                      Reddet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
