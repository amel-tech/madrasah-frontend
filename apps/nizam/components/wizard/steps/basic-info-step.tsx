import { Input } from '@madrasah/ui/components/input'
import { Label } from '@madrasah/ui/components/label'
import { Textarea } from '@madrasah/ui/components/textarea'
import { cn } from '@madrasah/ui/lib/utils'

interface BasicInfoStepProps {
  data: {
    title: string
    description: string
    startDate: string
    endDate: string
  }
  errors?: Record<string, string[] | undefined>
  onChange: (field: string, value: string) => void
}

export function BasicInfoStep({ data, errors, onChange }: BasicInfoStepProps) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Label htmlFor="title">
          Ders Başlığı
          {' '}
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Örn: Temel Fıkıh Dersleri"
          className={cn('mt-2', errors?.title && 'border-red-500 focus-visible:ring-red-500')}
          value={data.title}
          onChange={e => onChange('title', e.target.value)}
        />
        {errors?.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">
          Ders Açıklaması
          {' '}
          <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Dersin içeriği hakkında bilgi verin..."
          className={cn('mt-2 min-h-[120px]', errors?.description && 'border-red-500 focus-visible:ring-red-500')}
          value={data.description}
          onChange={e => onChange('description', e.target.value)}
        />
        {errors?.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="startDate">Başlangıç Tarihi</Label>
          <div className="relative mt-2">
            <Input
              type="date"
              id="startDate"
              className={cn(errors?.startDate && 'border-red-500 focus-visible:ring-red-500')}
              value={data.startDate}
              onChange={e => onChange('startDate', e.target.value)}
            />
          </div>
          {errors?.startDate && (
            <p className="text-sm text-red-500 mt-1">{errors.startDate[0]}</p>
          )}
        </div>
        <div>
          <Label htmlFor="endDate">Bitiş Tarihi</Label>
          <div className="relative mt-2">
            <Input
              type="date"
              id="endDate"
              className={cn(errors?.endDate && 'border-red-500 focus-visible:ring-red-500')}
              value={data.endDate}
              onChange={e => onChange('endDate', e.target.value)}
            />
          </div>
          {errors?.endDate && (
            <p className="text-sm text-red-500 mt-1">{errors.endDate[0]}</p>
          )}
        </div>
      </div>
    </div>
  )
}
