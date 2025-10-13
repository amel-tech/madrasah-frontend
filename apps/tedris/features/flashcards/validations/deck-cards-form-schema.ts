import { z } from 'zod'

export const deckCardsFormSchema = z.object({
  cards: z.array(
    z.object({
      content: z.object({
        front: z.string().min(1).max(1000),
        back: z.string().min(1).max(1000),
      }),
    }),
  ),
})
