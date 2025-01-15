import {z} from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const columnSchema = z.object({
  id: z.number(),
  brand_name: z.string(),
  logo_url: z.string(),
  desc: z.string(),
  sort_order: z.number(),
  is_hot: z.number(),
  status: z.number(),
  created_at: z.number(),
})

export const formSchema = z.object({
  logo_url: z.string().default(''),
  brand_name: z.string().min(1, '名称不能为空').min(2, '名称不能小于2个字符'),
  desc: z.string().default('').optional(),
  sort_order: z.number().default(50).optional(),
  is_hot: z.number().default(0),
  status: z.number().default(1),
})

export type ColumnSchemaType = z.infer<typeof columnSchema>
export type FormSchemaType = z.infer<typeof formSchema>
