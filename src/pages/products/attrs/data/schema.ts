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
export const attrColumnSchema: z.ZodObject<any> = z.object({
  id: z.number(),
  cate_id: z.number(),
  attr_type: z.number(),
  attr_name: z.string(),
  attr_value: z.string(),
  input_type: z.number(),
  sort_order: z.number(),
  created_at: z.number(),
})
export const attrFormSchema = z.object({
  attr_type: z.number().default(1),
  cate_id: z.number().min(1, '属性分类不能为空'),
  attr_name: z.string().min(1, '名称不能为空').min(2, '名称不能小于2个字符'),
  input_type: z.number().default(1),
  attr_value: z.string().optional(),
  sort_order: z.number().default(1),
})
export const selectValuesSchema = z.array(z.object({
  label: z.string(),
  value: z.number()
}))

export type ColumnSchemaType = z.infer<typeof columnSchema>
export type FormSchemaType = z.infer<typeof formSchema>
export type AttrColumnSchemaType = z.infer<typeof attrColumnSchema>
export type AttrFormSchemaType = z.infer<typeof attrFormSchema>
export type SelectSchemaType = z.infer<typeof selectValuesSchema>
