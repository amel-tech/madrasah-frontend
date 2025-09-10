import React from 'react'
import {
  CardsIcon,
  StarIcon,
  StudentIcon,
  BookmarkSimpleIcon,
} from '@madrasah/icons'
import { Card } from '@madrasah/ui/components/card'

type Props = {
  title: string
  author: string
  cardCount: number
  rating: number
  downloadCount: number
  description: string
}

function DeckCard({
  title,
  author,
  cardCount,
  rating,
  downloadCount,
  description,
}: Props) {
  return (
    <Card className="p-6 gap-0 hover:bg-neutral-100 has-[.bookmark-icon:hover]:bg-white cursor-pointer transition-all duration-200 ease-in-out">
      <div className="flex justify-between items-center ">
        <div className="font-medium">{title}</div>
        <div className="bookmark-icon cursor-pointer hover:bg-neutral-300 h-8 w-8 flex justify-center items-center rounded-full">
          <BookmarkSimpleIcon size={20} />
        </div>
      </div>
      <div className="text-sm mb-2">
        by
        {author}
      </div>
      <div className="flex items-center mb-2 text-sm">
        <div className="text-neutral-tertiary flex items-center mr-4">
          <CardsIcon className="inline-block mr-1" size={14} />
          {cardCount}
        </div>
        <div className="text-neutral-tertiary flex items-center mr-4">
          <StarIcon className="inline-block mr-1" size={14} />
          {rating}
        </div>
        <div className="text-neutral-tertiary flex items-center mr-4">
          <StudentIcon className="inline-block mr-1" size={14} />
          {downloadCount}
        </div>
      </div>
      <div className="text-sm text-neutral-tertiary">{description}</div>
    </Card>
  )
}

export default DeckCard
