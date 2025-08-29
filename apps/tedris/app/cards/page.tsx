import { cookies } from "next/headers";
import Link from "next/link";
import { getAuthenticatedApiService } from "~/lib/services";

export default async function Cards() {
  const cookieStore = await cookies();
  const api = getAuthenticatedApiService(cookieStore);
  const { data: cards, error } = await api.getCards();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul>
        {cards.map((card) => (
          <Link href={`/cards/${card.id}`} key={card.id}>
            <li>
              {card.content.front} ({card.type})
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}