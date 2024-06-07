import {z} from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

// export type ResourceItem = {
//   id: number
//   name: string
//   desc: string
//   alias: string
//   b_url: string
//   f_url: string
//   icon: string
//   menu_type: number
//   sort_order: number
//   status: number
//   children?: ResourceItem[]
//   created_at: number
// }

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
  children: z.array(z.lazy(() => resourceSchema)), // 使用 typeof 操作符
  status: z.number(),
  created_at: z.number(),
})

export const formSchema = z.object({
  id: z.number().default(0),
  name: z.string().min(1, '名称不能为空').min(2, '名称不能小于2个字符'),
  desc: z.string().default(''),
  alias: z.string().min(1, '别名不能为空').min(2, '别名不能小于2个字符'),
  b_url: z.string().min(1, '后端路由不能为空'),
  f_url: z.string().default(''),
  icon: z.string().default(''),
  menu_type: z.number().default(1),
  sort_order: z.number().default(50),
  _status: z.boolean().default(true),
  status: z.number().default(1),
})

export type ResourceItem = z.infer<typeof resourceSchema>
export type ResourceForm = z.infer<typeof formSchema>
