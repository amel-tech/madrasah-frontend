import { cookies } from "next/headers"
import { getAuthenticatedApiService } from "~/lib/services";

export default async function Learning() {
  const cookieStore = await cookies();
  const api = getAuthenticatedApiService(cookieStore);
  const cards = await api.getPosts()

  console.log(cards)

  return (
    <main>
      Learning
    </main>
  )
}
