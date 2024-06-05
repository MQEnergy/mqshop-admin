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

export const formSchema = z.object({
  id: z.number().default(0),
  uuid: z.string().default(''),
  account: z.string().min(1, '账号不能为空').min(5, '账号不能小于5个字符'),
  real_name: z.string().default(''),
  password: z.string().min(1, '密码不能为空').min(6, '密码不能少于6位数'),
  phone: z.string().min(1, '手机号不能为空'),
  avatar: z.string().min(1, '头像不能为空'),
  _status: z.boolean().default(true),
  status: z.number().default(1),
  role_ids: z.string().min(1, '角色不能为空'),
  role_list: z.array(z.object({
    id: z.number(),
    name: z.string()
  })).default([]),
})

export type Member = z.infer<typeof memberSchema>
export type MemberForm = z.infer<typeof formSchema>
