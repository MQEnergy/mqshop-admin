import {useRequest} from "ahooks";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request";
import {useEffect, useState} from "react";
import {formSchema, FormSchemaType} from "./data/schema.ts";
import {ProductCreate, ProductUpdate, ProductView} from "@/apis/product.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {DefaultValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/custom/button";
import {useTranslation} from "react-i18next";
import {BreadListItem, SingleBreadcrumb} from "@/components/custom/single-breadcrumb";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Switch} from "@/components/ui/switch";
import {BookText, Feather, Images, Info, ReceiptText, Save, Shell, SwatchBook, Truck} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {PlateEditor} from "@/components/custom/plate-editor.tsx";
import SkuForm from "@/pages/products/list/sku-form.tsx";
import ResourceUpload from "@/components/custom/resource-upload.tsx";

export default function Detail() {
  // =========================== Params ======================================
  const {t} = useTranslation()
  const {id} = useParams()
  const navigate = useNavigate()
  const [promoteChecked, setPromoteChecked] = useState<boolean>(false)
  const [shippingChecked, setShippingChecked] = useState<boolean>(false)
  const [contentChecked, setContentChecked] = useState<boolean>(false)
  // const [featureChecked, setFeatureChecked] = useState<boolean>(false)
  const [skuChecked, setSkuChecked] = useState<boolean>(false)

  let defaultValues: DefaultValues<FormSchemaType> = {
    goods_title: '',
    goods_subtitle: '',
    cate_id: undefined,
    brand_id: undefined,
    attr_cate_id: undefined,
    thumb_url: '',
    photo_urls: [],
    origin_price: '',
    promote_price: '',
    final_price: '',
    total_stock: 0,
    is_hot: 0,
    is_new: 0,
    is_recommend: 0,
    status: 0,
    sort_order: 50,

    unit: '件',
    weight: '0.00',
    integral: 0,
    detail_title: '',
    detail_desc: '',
    goods_keyword: '',
    goods_remark: '',
    goods_content: '',
    service_info: '',
    view_num: 0,
    collect_num: 0,
    like_num: 0,
    cur_month_sale_num: 0,
    shipping_free: 1,
    shipping_fee: '0.00',
    shipping_province_id: undefined,
    shipping_city_id: undefined,
    shipping_area_id: undefined,
  }
  const breadList: BreadListItem[] = [
    {name: "首页", link: '/'},
    {name: "商品管理", link: '/products/index'},
    {name: "添加商品", link: ''},
  ];
  // =========================== API request ======================================
  const createRes = useRequest(ProductCreate, {manual: true});
  const updateRes = useRequest(ProductUpdate, {manual: true});
  const viewRes = useRequest(ProductView, {manual: true});

  useEffect(() => {
    if (id) {
      viewRes.run({id: parseInt(id as string)})
      Object.assign(defaultValues, viewRes.data?.data || {})
    }
  }, [id]);

  // =========================== Method ===========================================
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  const onSubmit = (values: FormSchemaType) => {
    const params = {...values}
    let runAsync: Promise<ApiResult<any>>
    if (id) {
      runAsync = updateRes.runAsync({id: parseInt(id as string), ...params});
    } else {
      runAsync = createRes.runAsync(params);
    }
    toast.promise(
      runAsync,
      {
        loading: t('settings.table.action.processing.title') || 'loading...',
        success: (data: ApiResult<any>) => data.message,
        error: (err) => err.response?.data.message || err.message || 'Server Error'
      }
    ).then(() => {
    })
  }

  const handleSkuDialog = () => {
    setSkuChecked(true)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={'flex items-center content-between justify-between mb-4'}>
          <SingleBreadcrumb breadList={breadList}/>
          <div className='space-x-2 flex items-center'>
            <Button type='submit' size={'sm'} className='w-[120px]' loading={createRes.loading || updateRes.loading}>
              <Save size={14} className={'mr-2'}/>
              {t('settings.search.save')}
            </Button>
            <Button variant="outline" size={'sm'} className='w-[80px]' onClick={() => {
              navigate('/products/index')
            }}>
              {t('settings.search.cancel')}
            </Button>
          </div>
        </div>
        <ScrollArea
          className={cn(
            `md:h-[calc(100svh-160px)] lg:h-[calc(100svh-160px)] rounded-md`,
          )}>
          <div className="flex flex-row gap-4">
            <div className="basis-7/12">
              <Card className={'border-none shadow'}>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle className='text-md font-medium flex items-center space-x-2'>
                    <Info size={'18'}/> <span>基础信息</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid space-y-6 items-center'>
                    <FormField
                      control={form.control}
                      name='goods_title'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>名称<span className="text-destructive"> *</span></FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input placeholder='输入名称' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='goods_subtitle'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>副标题</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input type='textarea' placeholder='输入名称' {...field} />
                            </FormControl>
                            <FormDescription>注：此项有助于SEO优化</FormDescription>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardContent>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='final_price'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>售价<span className="text-destructive"> *</span></FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input placeholder='输入名称' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='origin_price'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>原价</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input placeholder='输入名称' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    {/*<FormField*/}
                    {/*  control={form.control}*/}
                    {/*  name='promote_price'*/}
                    {/*  render={({field}) => (*/}
                    {/*    <FormItem>*/}
                    {/*      <FormLabel>促销价</FormLabel>*/}
                    {/*      <div className='w-full relative'>*/}
                    {/*        <FormControl>*/}
                    {/*          <Input placeholder='输入名称' {...field} />*/}
                    {/*        </FormControl>*/}
                    {/*        <FormMessage className='text-xs absolute left-0 pt-1'/>*/}
                    {/*      </div>*/}
                    {/*    </FormItem>*/}
                    {/*  )}*/}
                    {/*/>*/}
                    <FormField
                      control={form.control}
                      name='total_stock'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>总库存<span className="text-destructive"> *</span></FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input type='number' placeholder='请输入库存总数' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='unit'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>计量单位</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input placeholder='请输入计量单位 如：件' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='weight'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>商品重量 (单位：千克)</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input type='number' placeholder='请输入商品重量 如：12.5' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className='flex flex-nowrap mt-8 items-center justify-between'>
                      <div className='flex flex-row space-x-4'>
                        <FormField
                          control={form.control}
                          name='is_new'
                          render={({field}) => (
                            <FormItem>
                              <div className='w-full relative'>
                                <FormControl>
                                  <div className="flex items-center space-x-2">
                                    <Switch id="airplane-mode" {...field}/>
                                    <Label htmlFor="airplane-mode">新品</Label>
                                  </div>
                                </FormControl>
                                <FormMessage className='text-xs absolute left-0 pt-1'/>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='is_hot'
                          render={({field}) => (
                            <FormItem>
                              <div className='w-full relative'>
                                <FormControl>
                                  <div className="flex items-center space-x-2">
                                    <Switch id="airplane-mode" {...field}/>
                                    <Label htmlFor="airplane-mode">热门</Label>
                                  </div>
                                </FormControl>
                                <FormMessage className='text-xs absolute left-0 pt-1'/>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='is_recommend'
                          render={({field}) => (
                            <FormItem>
                              <div className='w-full relative'>
                                <FormControl>
                                  <div className="flex items-center space-x-2">
                                    <Switch id="airplane-mode" {...field}/>
                                    <Label htmlFor="airplane-mode">推荐</Label>
                                  </div>
                                </FormControl>
                                <FormMessage className='text-xs absolute left-0 pt-1'/>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
              <Card className={'border-none shadow mt-4'}>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle className='text-md font-medium flex items-center space-x-2'>
                    <BookText size={'18'}/> <span>多属性设置</span>
                  </CardTitle>
                  {/*<Switch checked={featureChecked} onCheckedChange={setFeatureChecked}/>*/}
                  <Button size={'sm'} variant={'link'} className='text-indigo-500'
                          onClick={handleSkuDialog}>添加颜色或尺码等信息</Button>
                  {skuChecked &&
                    <SkuForm width={'1000px'} height={'800px'} row={''} open={skuChecked} onOpen={setSkuChecked}/>}
                </CardHeader>
                {skuChecked &&
                  <CardContent>
                    <div className='border rounded-md'>
                    </div>
                  </CardContent>}
              </Card>
              <Card className={'border-none shadow mt-4'}>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle className='text-md font-medium flex items-center space-x-2'>
                    <ReceiptText size={'18'}/> <span>商品详情</span>
                  </CardTitle>
                  <Switch checked={contentChecked} onCheckedChange={setContentChecked}/>
                </CardHeader>
                {contentChecked &&
                  <CardContent>
                    <div className='border rounded-md'>
                      <PlateEditor/>
                    </div>
                  </CardContent>}
              </Card>
              <Card className={'border-none shadow mt-4'}>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle className='text-md font-medium flex items-center space-x-2'>
                    <Feather size={'18'}/> <span>营销设置</span>
                  </CardTitle>
                  <Switch checked={promoteChecked} onCheckedChange={setPromoteChecked}/>
                </CardHeader>
                {promoteChecked && <CardContent>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='detail_title'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>详细页标题</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input placeholder='输入名称' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='detail_desc'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>详细页描述</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input type='textarea' placeholder='输入名称' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='goods_keyword'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>商品关键词</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input type='textarea' placeholder='输入名称' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='goods_remark'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>商品备注</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input type='textarea' placeholder='请输入商品备注' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='integral'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>赠送积分</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input placeholder='输入名称' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='view_num'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>商品浏览量</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input placeholder='输入名称' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='collect_num'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>商品收藏量</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input placeholder='输入名称' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='like_num'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>商品点赞量</FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Input placeholder='输入名称' {...field} />
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='my-5 space-y-2'>
                    <Label
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>服务保证</Label>
                    <div className="space-y-4 p-4 rounded-md border">
                      <FormField
                        control={form.control}
                        name="service_info"
                        render={({field}) => (
                          <FormItem
                            className="flex flex-row items-center justify-between space-y-0">
                            <FormDescription>可配送海外</FormDescription>
                            <FormControl>
                              <Switch
                                checked={field.value as unknown as boolean}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service_info"
                        render={({field}) => (
                          <FormItem
                            className="flex flex-row items-center justify-between space-y-0">
                            <FormDescription>店铺发货</FormDescription>
                            <FormControl>
                              <Switch
                                checked={field.value as unknown as boolean}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service_info"
                        render={({field}) => (
                          <FormItem
                            className="flex flex-row items-center justify-between space-y-0">
                            <FormDescription>7天无理由退货</FormDescription>
                            <FormControl>
                              <Switch
                                checked={field.value as unknown as boolean}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service_info"
                        render={({field}) => (
                          <FormItem
                            className="flex flex-row items-center justify-between space-y-0">
                            <FormDescription>闪电退款，极速审核</FormDescription>
                            <FormControl>
                              <Switch
                                checked={field.value as unknown as boolean}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>}
              </Card>
            </div>

            <div className="basis-5/12">
              <Card className={'border-none shadow'}>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle className='text-md font-medium flex items-center space-x-2'>
                    <Images size={'18'}/> <span>图片信息</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name='goods_title'
                    render={({field}) => (
                      <FormItem>
                        <div className='w-full relative'>
                          <FormControl {...field}>
                            <ResourceUpload></ResourceUpload>
                          </FormControl>
                          <FormMessage className='text-xs absolute left-0 pt-1'/>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card className={'border-none shadow mt-4'}>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle className='text-md font-medium flex items-center space-x-2'>
                    <Shell size={'18'}/> <span>分类和品牌</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='cate_id'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>所属分类<span className="text-destructive"> *</span></FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value as unknown as string}>
                                <SelectTrigger>
                                  <SelectValue placeholder='请选择分类'/>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="1">Apple</SelectItem>
                                    <SelectItem value="2">Banana</SelectItem>
                                    <SelectItem value="3">Blueberry</SelectItem>
                                    <SelectItem value="4">Grapes</SelectItem>
                                    <SelectItem value="5">Pineapple</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='brand_id'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>所属品牌<span className="text-destructive"> *</span></FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value as unknown as string}>
                                <SelectTrigger>
                                  <SelectValue placeholder="请选择品牌"/>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="1">Apple</SelectItem>
                                    <SelectItem value="2">Banana</SelectItem>
                                    <SelectItem value="3">Blueberry</SelectItem>
                                    <SelectItem value="4">Grapes</SelectItem>
                                    <SelectItem value="5">Pineapple</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className={'border-none shadow mt-4'}>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle className='text-md font-medium flex items-center space-x-2'>
                    <SwatchBook size={'18'}/> <span>发布状态</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name='status'
                    render={({field}) => (
                      <FormItem>
                        <div className='w-full relative'>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={String(field.value)}>
                              <div></div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1" id="r1"/>
                                <Label htmlFor="r1">立即发布</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="2" id="r2"/>
                                <Label htmlFor="r2">定时发布</Label>
                                {String(field.value) === '2' && (
                                  <div className="flex items-center space-x-2">
                                    <Input type={'date'} placeholder='输入日期' {...field}/>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="0" id="r3"/>
                                <Label htmlFor="r3">临时保存</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className='text-xs absolute left-0 pt-1'/>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card className={'border-none shadow mt-4'}>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle className='text-md font-medium flex items-center space-x-2'>
                    <Truck size={'18'}/> <span>配送信息</span>
                  </CardTitle>
                  <Switch checked={shippingChecked} onCheckedChange={setShippingChecked}/>
                </CardHeader>
                {shippingChecked &&
                  <CardContent>
                    <div className='mb-4 space-y-2'>
                      <Label
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>发货地址</Label>

                      <div className="grid grid-cols-3 space-x-2">
                        <FormField
                          control={form.control}
                          name='shipping_province_id'
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>省份<span className="text-destructive"> *</span></FormLabel>
                              <div className='w-full relative'>
                                <FormControl>
                                  <Select onValueChange={field.onChange}
                                          defaultValue={field.value as unknown as string}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="请选择省份"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="1">Apple</SelectItem>
                                        <SelectItem value="2">Banana</SelectItem>
                                        <SelectItem value="3">Blueberry</SelectItem>
                                        <SelectItem value="4">Grapes</SelectItem>
                                        <SelectItem value="5">Pineapple</SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage className='text-xs absolute left-0 pt-1'/>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='shipping_city_id'
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>城市<span className="text-destructive"> *</span></FormLabel>
                              <div className='w-full relative'>
                                <FormControl>
                                  <Select onValueChange={field.onChange}
                                          defaultValue={field.value as unknown as string}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="请选择城市"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="1">Apple</SelectItem>
                                        <SelectItem value="2">Banana</SelectItem>
                                        <SelectItem value="3">Blueberry</SelectItem>
                                        <SelectItem value="4">Grapes</SelectItem>
                                        <SelectItem value="5">Pineapple</SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage className='text-xs absolute left-0 pt-1'/>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='shipping_area_id'
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>区域<span className="text-destructive"> *</span></FormLabel>
                              <div className='w-full relative'>
                                <FormControl>
                                  <Select onValueChange={field.onChange}
                                          defaultValue={field.value as unknown as string}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="请选择区域"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="1">Apple</SelectItem>
                                        <SelectItem value="2">Banana</SelectItem>
                                        <SelectItem value="3">Blueberry</SelectItem>
                                        <SelectItem value="4">Grapes</SelectItem>
                                        <SelectItem value="5">Pineapple</SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage className='text-xs absolute left-0 pt-1'/>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name='shipping_free'
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>是否包邮<span className="text-destructive"> *</span></FormLabel>
                          <div className='w-full relative'>
                            <FormControl>
                              <RadioGroup onValueChange={field.onChange}
                                          defaultValue={String(field.value)}>
                                <div></div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="1" id="r1"/>
                                  <Label htmlFor="r1">包邮</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="0" id="r2"/>
                                  <Label htmlFor="r2">不包邮</Label>
                                  {String(field.value) === '0' && (
                                    <div className="flex items-center space-x-2">
                                      <Input placeholder='请输入配送费'/>
                                    </div>
                                  )}
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage className='text-xs absolute left-0 pt-1'/>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>}
              </Card>
            </div>
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
}
