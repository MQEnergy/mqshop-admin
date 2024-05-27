import {z} from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const memberSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  avatar: z.string(),
  account: z.string(),
  real_name: z.string(),
  phone: z.string(),
  status: z.number(),
  password: z.string(),
  created_at: z.number(),
  role_ids: z.string(),
  role_list: z.array(z.object({
    id: z.number(),
    name: z.string()
  })),
  is_super: z.number(),
})

export type Member = z.infer<typeof memberSchema>
