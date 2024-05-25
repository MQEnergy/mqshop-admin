import {z} from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const memberSchema = z.object({
  id: z.number(),
  avatar: z.string(),
  account: z.string(),
  real_name: z.string(),
  phone: z.string(),
  status: z.number(),
  created_at: z.number(),
})

export type Member = z.infer<typeof memberSchema>
