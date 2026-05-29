import { getKosks, getKoskCourses } from '~/features/courses/actions'
import { KoskListPage } from '~/features/courses/components/kosk-list-page'

export default async function Learning() {
  const kosks = await getKosks()
  const featured = kosks.find(k => k.featured) ?? kosks[0] ?? null

  // The featured banner shows a müderris avatar stack — derive it from the
  // featured köşk's courses (deduped by name).
  let featuredMuderris: { name: string, avatarHue: number }[] = []
  if (featured) {
    const courses = await getKoskCourses(featured.id)
    const seen = new Map<string, number>()
    for (const c of courses) {
      for (const m of c.muderris) {
        if (!seen.has(m.name)) seen.set(m.name, m.avatarHue)
      }
    }
    featuredMuderris = Array.from(seen, ([name, avatarHue]) => ({ name, avatarHue }))
  }

  return (
    <KoskListPage kosks={kosks} featured={featured} featuredMuderris={featuredMuderris} />
  )
}
