import { getKosks } from '~/actions/kosks'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@madrasah/ui/components/card'
import { HouseIcon, ArrowRightIcon } from '@madrasah/icons/ssr'

export default async function KosksPage() {
  const kosks = await getKosks()

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1>Köşkler</h1>
          <p className="text-muted-foreground mt-2">Yönetiminizdeki köşkleri ve dersleri buradan görüntüleyebilirsiniz.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kosks.map(kosk => (
          <Link key={kosk.id} href={`/kosks/${kosk.id}`} className="block group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg border-primary/10 hover:border-primary/30">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <HouseIcon className="w-5 h-5" />
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{kosk.name}</CardTitle>
                <CardDescription>
                  Oluşturulma:
                  {' '}
                  {kosk.createdAt.toLocaleDateString('tr-TR')}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
