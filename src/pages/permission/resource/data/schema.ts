import {z} from 'zod'

export const resourceSchema: z.ZodObject<any> = z.object({
  id: z.number(),
  name: z.string(),
  desc: z.string(),
  alias: z.string(),
  b_url: z.string(),
  f_url: z.string(),
  icon: z.string(),
  menu_type: z.number(),
  sort_order: z.number(),
  children: z.array(z.lazy(() => resourceSchema)),
  status: z.number(),
  created_at: z.number(),
})

export const formSchema = z.object({
  name: z.string().min(1, {message: '名称不能为空'}).min(2, '名称不能小于2个字符').describe("How many marshmallows fit in your mouth?"),
  parent_id: z.number().default(0),
  icon: z.string().default(''),
  desc: z.string().default(''),
  alias: z.string().min(1, '别名不能为空').min(2, '别名不能小于2个字符'),
  b_url: z.string().min(1, '后端路由不能为空'),
  f_url: z.string().min(1, '前端路由不能为空'),
  menu_type: z.number().default(1),
  sort_order: z.number().default(50),
  _status: z.boolean().default(true),
})

export type ResourceItem = z.infer<typeof resourceSchema>
export type ResourceForm = z.infer<typeof formSchema>
