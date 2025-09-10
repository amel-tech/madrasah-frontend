import { cookies } from 'next/headers'
import Link from 'next/link'
import { getAuthenticatedApiService } from '~/lib/services'

export default async function Card({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const cookieStore = await cookies()
  const api = getAuthenticatedApiService(cookieStore)
  const { data: card, error } = await api.getDeckCards(id)

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    )
  }

  return (
    <div>
      <ul>
        <Link href={`/cards/${card[0].id}`} key={card[0].id}>
          <li>
            {card[0].content.front}
            {' '}
            (
            {card[0].type}
            )
            {card[0].content.back && (
              <>
                {' '}
                -
                {card[0].content.back}
              </>
            )}
          </li>
        </Link>
      </ul>
    </div>
  )
}
