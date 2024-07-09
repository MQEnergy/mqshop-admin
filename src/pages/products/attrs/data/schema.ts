import {z} from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const columnSchema: z.ZodObject<any> = z.object({
  id: z.number(),
  cate_name: z.string(),
  status: z.number(),
  created_at: z.number(),
})

export const formSchema = z.object({
  cate_name: z.string().min(1, '名称不能为空').min(2, '名称不能小于2个字符'),
  status: z.number().default(1),
})

export type ColumnSchemaType = z.infer<typeof columnSchema>
export type FormSchemaType = z.infer<typeof formSchema>
