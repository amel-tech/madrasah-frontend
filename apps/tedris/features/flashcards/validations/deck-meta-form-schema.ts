import { z } from 'zod'

export const deckMetaFormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  tags: z.array(z.string()).min(1),
  is_public: z.boolean(),
})
