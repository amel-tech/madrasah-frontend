import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@madrasah/icons/ssr'
import { Button } from '@madrasah/ui/components/button'
import { Input } from '@madrasah/ui/components/input'
import { SyllabusItemSchema } from '../schemas'
import { cn } from '@madrasah/ui/lib/utils'

interface CurriculumStepProps {
  syllabus: SyllabusItemSchema[]
  errors?: Record<string, string[] | undefined>
  onChange: (syllabus: SyllabusItemSchema[]) => void
}

export function CurriculumStep({ syllabus, errors, onChange }: CurriculumStepProps) {
  const addItem = () => {
    const nextWeek = syllabus.length + 1
    onChange([
      ...syllabus,
      { week: nextWeek, topic: '', resources: '' },
    ])
  }

  const removeItem = (index: number) => {
    const newSyllabus = syllabus.filter((_, i) => i !== index)
    // Re-index weeks
    const reindexed = newSyllabus.map((item, i) => ({ ...item, week: i + 1 }))
    onChange(reindexed)
  }

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === syllabus.length - 1) return

    const newSyllabus = [...syllabus]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    // Swap
    const temp = newSyllabus[index] as SyllabusItemSchema
    newSyllabus[index] = newSyllabus[targetIndex] as SyllabusItemSchema
    newSyllabus[targetIndex] = temp

    // Re-index weeks
    const reindexed = newSyllabus.map((item, i) => ({ ...item, week: i + 1 }))
    onChange(reindexed)
  }

  const updateItem = (index: number, field: keyof SyllabusItemSchema, value: string | number) => {
    const newSyllabus = [...syllabus]
    newSyllabus[index] = { ...newSyllabus[index], [field]: value } as SyllabusItemSchema
    onChange(newSyllabus)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Haftalık Program</h3>
        <Button onClick={addItem} size="sm" className="gap-2">
          <PlusIcon className="w-4 h-4" />
          Hafta Ekle
        </Button>
      </div>

      {errors?.syllabus && (
        <p className="text-sm text-red-500 font-medium">{errors.syllabus[0]}</p>
      )}

      <div className="space-y-2">
        {syllabus.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg bg-gray-50/50">
            <p className="text-muted-foreground">Henüz müfredat eklenmedi.</p>
            <Button variant="link" onClick={addItem} className="mt-2">
              İlk haftayı ekle
            </Button>
          </div>
        )}

        {syllabus.length > 0 && (
          <div className="grid grid-cols-[auto_1fr_1fr_auto_auto] gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b">
            <div className="w-12 text-center">Hafta</div>
            <div>Konu</div>
            <div>Kaynaklar</div>
            <div className="w-24 text-center">Sıralama</div>
            <div className="w-10 text-center">Sil</div>
          </div>
        )}

        {syllabus.map((item, index) => {
          const topicError = errors?.[`syllabus.${index}.topic`]
          const resourcesError = errors?.[`syllabus.${index}.resources`]
          const hasError = topicError || resourcesError

          return (
            <div key={index} className={cn('group relative flex items-start gap-4 p-3 rounded-lg border bg-white transition-colors', hasError && 'border-red-200 bg-red-50/30')}>
              <div className="w-12 flex items-center justify-center pt-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm font-medium text-slate-600">
                  {item.week}
                </span>
              </div>

              <div className="flex-1 space-y-1">
                <Input
                  value={item.topic}
                  placeholder="Konu başlığı..."
                  onChange={e => updateItem(index, 'topic', e.target.value)}
                  className={cn(topicError && 'border-red-300 focus-visible:ring-red-300')}
                />
                {topicError && <p className="text-xs text-red-500">{topicError[0]}</p>}
              </div>

              <div className="flex-1 space-y-1">
                <Input
                  value={item.resources || ''}
                  placeholder="Kaynak kitaplar..."
                  onChange={e => updateItem(index, 'resources', e.target.value)}
                  className={cn(resourcesError && 'border-red-300 focus-visible:ring-red-300')}
                />
                {resourcesError && <p className="text-xs text-red-500">{resourcesError[0]}</p>}
              </div>

              <div className="w-24 flex items-center justify-center gap-1 pt-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  disabled={index === 0}
                  onClick={() => moveItem(index, 'up')}
                >
                  <ArrowUpIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  disabled={index === syllabus.length - 1}
                  onClick={() => moveItem(index, 'down')}
                >
                  <ArrowDownIcon className="w-4 h-4" />
                </Button>
              </div>

              <div className="w-10 flex items-center justify-center pt-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50"
                  onClick={() => removeItem(index)}
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
