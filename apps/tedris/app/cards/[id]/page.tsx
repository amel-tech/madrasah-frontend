import Link from 'next/link'
import { getTedrisatMock } from '~/lib/mock-data'

export default async function Card({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params

  const { cards } = await getTedrisatMock()
  const card = cards.find(card => card.id === Number(id))

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
