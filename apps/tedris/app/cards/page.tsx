'use client';

import { Button } from "@madrasah/ui/components/button";
import Link from "next/link";
import { useApi, useQuery } from "~/hooks";

export default function Cards() {
  const {api} = useApi();
  const { data: cards, isLoading, error } = useQuery(api => api.getCards(), {});

  if(isLoading){
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const onClickCreateCard = () => {
    api.createCard({
      id: Math.floor(Math.random() * 100000),
      is_public: true,
      author_id: Math.floor(Math.random() * 100000),
      content: {
        front: "New Card",
        back: "Card Content",
      },
      type: "hadeeth",
      image_source: "https://via.placeholder.com/150",
    });
  };

  return (
    <div>
      <Button onClick={onClickCreateCard}>Create random card</Button>
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