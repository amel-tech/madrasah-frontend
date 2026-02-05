import { Calendar, CheckCircle } from '@madrasah/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@madrasah/ui/components/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@madrasah/ui/components/select'
import { Label } from '@madrasah/ui/components/label'
import type { BasicInfoSchema, SyllabusItemSchema } from '~/features/kosks/types'

interface PreviewStepProps {
  basicInfo: BasicInfoSchema
  syllabus: SyllabusItemSchema[]
  teaserWeeks: number
  onTeaserWeeksChange: (weeks: number) => void
}

export function PreviewStep({ basicInfo, syllabus, teaserWeeks, onTeaserWeeksChange }: PreviewStepProps) {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium">Ders Önizlemesi</h3>
        <p className="text-muted-foreground mt-1">
          Dersinizi oluşturmadan önce bilgileri kontrol edin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ders Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Başlık</span>
                <p className="text-lg font-semibold">{basicInfo.title}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Açıklama</span>
                <p className="whitespace-pre-wrap">{basicInfo.description}</p>
              </div>
              <div className="flex gap-8">
                <div>
                  <span className="text-sm font-medium text-muted-foreground block mb-1">Başlangıç</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(basicInfo.startDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground block mb-1">Bitiş</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(basicInfo.endDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Müfredat (
                {syllabus.length}
                {' '}
                Hafta)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {syllabus.length === 0
                  ? (
                      <p className="text-muted-foreground italic">Müfredat eklenmedi.</p>
                    )
                  : (
                      syllabus.map((item, index) => (
                        <div key={index} className="flex gap-4 p-3 rounded-lg bg-gray-50 border">
                          <div className="flex-none w-16 flex flex-col items-center justify-center bg-white rounded border h-16">
                            <span className="text-xs text-muted-foreground uppercase">Hafta</span>
                            <span className="text-xl font-bold text-primary">{item.week}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.topic}</p>
                            {item.resources && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {item.resources}
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Teaser Ayarları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Misafirlere kaç hafta gösterilsin?</Label>
                <Select
                  value={teaserWeeks.toString()}
                  onValueChange={val => onTeaserWeeksChange(parseInt(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Hiçbiri (Sadece Başlıklar)</SelectItem>
                    <SelectItem value="1">İlk 1 Hafta</SelectItem>
                    <SelectItem value="2">İlk 2 Hafta</SelectItem>
                    <SelectItem value="3">İlk 3 Hafta</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Belirlenen hafta sayısı kadar içerik, dersi satın almayan kullanıcılara açık olacaktır.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
            <h4 className="font-medium text-emerald-800 flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4" />
              Hazır!
            </h4>
            <p className="text-sm text-emerald-600">
              Tüm adımlar tamamlandı. Dersi oluşturmak için aşağıdaki butona tıklayabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
