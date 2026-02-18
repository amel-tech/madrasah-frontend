import { getKosks } from '~/features/kosks/actions'
import { KosksPage } from '~/features/kosks/components/kosks-page'

export default async function Page() {
  const kosks = await getKosks()
  return <KosksPage kosks={kosks} />
}
