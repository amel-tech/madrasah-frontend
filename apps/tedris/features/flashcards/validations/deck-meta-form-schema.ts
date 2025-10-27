import { z } from 'zod'

export const deckMetaFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  tagIds: z.array(z.number()),
  isPublic: z.boolean(),
})
