import { cookies } from "next/headers";
import Link from "next/link";
import { getAuthenticatedApiService } from "~/lib/services";

export default async function Card({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const api = getAuthenticatedApiService(cookieStore);
  const { data: card, error } = await api.getCard(Number(id));

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul>
        <Link href={`/cards/${card.id}`} key={card.id}>
          <li>
            {card.content.front} ({card.type})
            {card.content.back && <> - {card.content.back}</>}
          </li>
        </Link>
      </ul>
    </div>
  );
}
