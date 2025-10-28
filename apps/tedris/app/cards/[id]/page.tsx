import Link from 'next/link'
import { cookies } from 'next/headers'

import { env } from '~/env'
import { createServerTedrisatAPIs, FlashcardResponse } from '@madrasah/services/tedrisat'

async function getCard(cardId: number): Promise<FlashcardResponse> {
  const cookieStore = await cookies()
  const { cards } = await createServerTedrisatAPIs(cookieStore, env.TEDRISAT_API_BASE_URL)

  return cards.getFlashcardById({ id: cardId })
}

export default async function CardPage({
  params,
}: {
  params: Promise<{
    id: number
  }>
}) {
  const { id } = await params
  const card = await getCard(id)

  if (!card) {
    return <div>Card not found</div>
  }

  return (
    <div>
      <ul>
        <Link href={`/cards/${card.id}`} key={card.id}>
          <li>
            {card.contentFront}
            {' '}
            (
            {card.type}
            )
            {card.contentBack && (
              <>
                {' '}
                -
                {card.contentBack}
              </>
            )}
          </li>
        </Link>
      </ul>
    </div>
  )
}
