import { z } from 'zod'

export const deckMetaFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(10).max(50),
  isPublic: z.boolean(),
})
