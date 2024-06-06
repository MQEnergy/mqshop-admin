import {z} from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
  desc: z.string(),
  status: z.number(),
  created_at: z.number(),
})

export const formSchema = z.object({
  id: z.number().default(0),
  name: z.string().min(1, '名称不能为空').min(2, '名称不能小于2个字符'),
  desc: z.string().default(''),
  _status: z.boolean().default(true),
  status: z.number().default(1),
})

export type Role = z.infer<typeof roleSchema>
export type RoleForm = z.infer<typeof formSchema>
