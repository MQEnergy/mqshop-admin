import {z} from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const columnSchema: z.ZodObject<any> = z.object({
  id: z.number(),
  cate_name: z.string(),
  cate_desc: z.string(),
  cate_url: z.string(),
  sort_order: z.number(),
  parent_id: z.number(),
  path: z.string(),
  is_hot: z.number(),
  is_index: z.number(),
  status: z.number(),
  children: z.array(z.lazy(() => columnSchema)),
  created_at: z.number(),
})

export const formSchema = z.object({
  cate_url: z.string().default(''),
  cate_name: z.string().min(1, '名称不能为空').min(2, '名称不能小于2个字符'),
  cate_desc: z.string().default('').optional(),
  parent_id: z.number().default(0),
  sort_order: z.number().default(50).optional(),
  is_hot: z.number().default(0),
  is_index: z.number().default(0),
  status: z.number().default(1),
})

export type ColumnSchemaType = z.infer<typeof columnSchema>
export type FormSchemaType = z.infer<typeof formSchema>
