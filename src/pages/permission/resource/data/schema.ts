import {z} from 'zod'

export const columnSchema: z.ZodObject<any> = z.object({
  id: z.number(),
  parent_id: z.number(),
  name: z.string(),
  desc: z.string(),
  alias: z.string(),
  b_url: z.string(),
  f_url: z.string(),
  icon: z.string(),
  menu_type: z.number(),
  sort_order: z.number(),
  children: z.array(z.lazy(() => columnSchema)),
  path: z.string(),
  status: z.number(),
  created_at: z.number(),
})

export const formSchema = z.object({
  name: z.string().min(1, {message: '名称不能为空'}).min(2, '名称不能小于2个字符').describe("How many marshmallows fit in your mouth?"),
  parent_id: z.number().default(0),
  alias: z.string().min(1, '别名不能为空').min(2, '别名不能小于2个字符'),
  icon: z.string().default('').optional(),
  desc: z.string().default('').optional(),
  b_url: z.string().min(1, '后端路由不能为空'),
  f_url: z.string().min(1, '前端路由不能为空'),
  menu_type: z.number().default(1),
  sort_order: z.number().default(50),
  status: z.number().default(1),
})
export const selectValuesSchema = z.array(z.object({
  label: z.string(),
  value: z.number()
}))

export type ColumnSchemaType = z.infer<typeof columnSchema>
export type FormSchemaType = z.infer<typeof formSchema>
export type SelectSchemaType = z.infer<typeof selectValuesSchema>
