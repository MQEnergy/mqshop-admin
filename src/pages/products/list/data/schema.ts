import {z} from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const columnSchema: z.ZodObject<any> = z.object({
  id: z.number(),
  goods_title: z.string(),
  goods_subtitle: z.string(),
  cate_id: z.number(),
  brand_id: z.number(),
  attr_cate_id: z.number(),
  thumb_url: z.string(),
  photo_urls: z.string(),
  origin_price: z.string(),
  promote_price: z.string(),
  final_price: z.string(),
  total_stock: z.number(),
  is_hot: z.number(),
  is_new: z.number(),
  is_recommend: z.number(),
  status: z.number(),
  sort_order: z.number(),
})

export const formSchema = z.object({
  goods_title: z.string().min(1, '名称不能为空').min(2, '名称不能小于2个字符'),
  goods_subtitle: z.string().min(1, '名称不能为空').min(2, '名称不能小于2个字符'),
  cate_id: z.number(),
  brand_id: z.number().default(0),
  attr_cate_id: z.number().default(0),
  thumb_url: z.string().default(''),
  photo_urls: z.array(z.string()).default([]),
  origin_price: z.string().default(''),
  promote_price: z.string().default(''),
  final_price: z.string().default(''),
  total_stock: z.number().default(0),
  is_hot: z.number().default(0),
  is_new: z.number().default(0),
  is_recommend: z.number().default(0),
  status: z.number().default(0),
  sort_order: z.number().default(50),

  unit: z.string().default('件'),
  weight: z.string().default('0.00'),
  integral: z.number().default(0),
  detail_title: z.string().default(''),
  detail_desc: z.string().default(''),
  goods_keyword: z.string().default(''),
  goods_content: z.string().default(''),
  goods_remark: z.string().default(''),
  service_info: z.string().default(''),
  view_num: z.number().default(0),
  collect_num: z.number().default(0),
  like_num: z.number().default(0),
  cur_month_sale_num: z.number().default(0),
  shipping_free: z.number().default(0), // 是否包邮 1：包邮 0：不包邮
  shipping_fee: z.string().default('0.00'),
  shipping_province_id: z.number().default(0),
  shipping_city_id: z.number().default(0),
  shipping_area_id: z.number().default(0),
})

export const skuColumnSchema:z.ZodObject<any> =  z.object({
  id: z.number(),
  sku_id: z.number(),
})

export const skuFormSchema = z.object({
  sku_id: z.number(),
  name: z.string(),
})

export type ColumnSchemaType = z.infer<typeof columnSchema>
export type FormSchemaType = z.infer<typeof formSchema>
export type SkuColumnSchemaType = z.infer<typeof skuColumnSchema>
export type SkuFormSchemaType = z.infer<typeof skuFormSchema>
