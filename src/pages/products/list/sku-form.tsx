import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import FormDialog from "@/components/custom/form-dialog.tsx";
import {useTranslation} from "react-i18next";
import {SkuColumnSchemaType, skuFormSchema, SkuFormSchemaType} from "./data/schema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRequest} from "ahooks";
import {ProductCreate, ProductUpdate} from "@/apis/product.ts";
import {Input} from "@/components/ui/input.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ReceiptText} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/custom/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";
import ResourceUpload from "@/components/custom/resource-upload.tsx";

interface SkuFormProps {
  row: any;
  width?: string;
  height?: string;
  open: boolean;
  onOpen: (value: boolean) => void;
}

export default function SkuForm({...props}: SkuFormProps) {
  // ============================ Params =====================================
  const {t} = useTranslation()
  const [uploadOpen, setUploadOpen] = useState<boolean>(false)
  const info = props.row as SkuColumnSchemaType
  const form = useForm<Partial<SkuFormSchemaType>>({
    resolver: zodResolver(skuFormSchema),
    defaultValues: {
      ...info
    }
  })
  const [skuList, setSkuList] = useState([
    {
      id: 1,
      attr_name: "黑色 / M",
      attr_hash: '022acb2d288417c5b8aa34a160bcd4c1',
      attr_values: ['黑色', 'M'],
      price: "$250.00",
      sku_no: "639483058591903744-1",
      stock: 20,
      stock_warning: 10,
      thumb_full_url: '',
      thumb_url: ''
    },
    {
      id: 2,
      attr_name: "黑色 / XL",
      attr_hash: '022acb2d288417c5b8aa34a160bcd4c3',
      attr_values: ['黑色', 'XL'],
      price: "$250.00",
      sku_no: "639483058591903744-2",
      stock: 20,
      stock_warning: 10,
      thumb_full_url: '',
      thumb_url: ''
    },
  ])

  // ============================ API request =====================================
  const createRes = useRequest(ProductCreate, {manual: true})
  const updateRes = useRequest(ProductUpdate, {manual: true})

  // ============================ Method ======================================
  const handleCancel = () => {
    props.onOpen(false)
  }
  const onSubmit = (values: Partial<SkuFormSchemaType>) => {
    console.log(values)
    // const params = {
    //   sku_id: values.sku_id,
    // }
    // let runAsync: Promise<ApiResult<any>>
    // if (info && info.id) {
    //   runAsync = updateRes.runAsync({id: info.id, ...params});
    // } else {
    //   runAsync = createRes.runAsync(params);
    // }
    // toast.promise(
    //   runAsync,
    //   {
    //     loading: t('settings.table.action.processing.title') || 'loading...',
    //     success: (data: ApiResult<any>) => data.message,
    //     error: (err) => err.response?.data.message || err.message || 'Server Error'
    //   }
    // ).then(() => {
    //   props.onOpen(false)
    // })
  }

  return (
    <>
      <FormDialog
        className={'h-[800px] p-4 overflow-y-scroll'}
        title={t('product.attr.dialog.title')}
        submitTitle={t('product.attr.dialog.save')}
        loading={createRes.loading || updateRes.loading}
        width={props.width}
        height={props.height}
        open={props.open}
        onOpenChange={props.onOpen}
        onCancel={handleCancel}
        onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <FormField
            control={form.control}
            name='name'
            render={({field}) => (
              <FormItem>
                <FormLabel>属性类型<span className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value as unknown as string}>
                      <SelectTrigger>
                        <SelectValue placeholder='请选择分类'/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">服装-T恤</SelectItem>
                          <SelectItem value="2">服装-裤装</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className='text-xs absolute left-0 pt-1'/>
                </div>
              </FormItem>
            )}
          />
          <Card className={'shadow-none mt-4'}>
            <CardHeader className='flex flex-row items-center justify-between pb-4'>
              <CardTitle className='text-md font-medium flex items-center space-x-2'>
                <ReceiptText size={'18'}/> <span>商品规格</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                <ul className="[&>li]:mt-2">
                  <li>
                    <div className="mt-4 flex items-center space-x-4">
                      <Label>颜色</Label>
                      <ToggleGroup className={'space-x-2'} variant="outline" type="multiple">
                        <ToggleGroupItem
                          variant={'outline'}
                          className='h-8 w-8 rounded-full bg-white'
                          value="bold" aria-label="">
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          className='h-8 w-8 rounded-full bg-gray-200'
                          value="italic" aria-label="">
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          className='h-8 w-8 rounded-full bg-gray-900'
                          value="underline" aria-label="">
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </li>
                  <li>
                    <div className="mt-4 flex items-center space-x-4">
                      <Label>尺码</Label>
                      <ToggleGroup className={'space-x-2'} variant="outline" type="multiple">
                        <ToggleGroupItem value="M">M</ToggleGroupItem>
                        <ToggleGroupItem value="XL">XL</ToggleGroupItem>
                        <ToggleGroupItem value="XXL">XXL</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </li>
                  <li>
                    <div className='flex flex-row mt-6 space-x-2'>
                      <Button variant={'indigo'}>生成列表</Button>
                      <Button variant={'outline'}>同步价格</Button>
                      <Button variant={'outline'}>同步库存</Button>
                      <Button variant={'outline'}>同步预警值</Button>
                      <Button variant={'outline'}>批量生成编码</Button>
                    </div>
                  </li>
                </ul>
              </div>
              <Separator className="mt-6"/>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">图片</TableHead>
                    <TableHead className="w-[100px] text-center">规格</TableHead>
                    <TableHead className="w-[150px] text-center">库存 / 价格</TableHead>
                    <TableHead className="w-[80px] text-center">库存预警</TableHead>
                    <TableHead className="w-[180px] text-center">sku编码</TableHead>
                    <TableHead className="w-[120px] text-center">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skuList.map((item) => (
                    <TableRow key={item.attr_hash}>
                      <TableCell className={'text-center'}>
                        <Avatar className={'rounded-md m-auto'} onClick={() => setUploadOpen(true)}>
                          <AvatarImage src="https://github.com/shadcn.png" alt={item.attr_name}/>
                          <AvatarFallback>{item.attr_name}</AvatarFallback>
                        </Avatar>
                        {/*<img className='w-10 h-10' src={item.thumb_full_url} alt={item.attr_name}/>*/}
                      </TableCell>
                      <TableCell className="font-medium text-center">{item.attr_name}</TableCell>
                      <TableCell className={'flex flex-row justify-center space-x-2'}>
                        <Input type={'number'} value={item.stock}/>
                        <Input value={item.price}/>
                      </TableCell>
                      <TableCell className={'text-center'}><Input type={'number'}
                                                                  value={item.stock_warning}/></TableCell>
                      <TableCell className={'text-center'}><Input value={item.sku_no}/></TableCell>
                      <TableCell className="text-center">
                        <Button size={'sm'} variant={'link'}>排序</Button>
                        <Button size={'sm'} variant={'link'}>删除</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Form>
      </FormDialog>

      {uploadOpen &&
        <FormDialog
          width={'800px'}
          height={'600px'}
          loading={false}
          open={uploadOpen}
          title={'图片管理'}
          onOpenChange={setUploadOpen}
          onCancel={handleCancel}>
          <div className='h-[600px]'>
            <ResourceUpload></ResourceUpload>
          </div>
        </FormDialog>
      }
    </>
  )
}