import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import FileUploadDropzone from "@/components/custom/image-uploader.tsx";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/custom/button.tsx";
import {ClipboardPaste} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useDataTable} from "@/hooks/use-data-table.tsx";
import {usePagination} from "@/hooks/use-pagination.tsx";
import {useDebounce, useRequest} from "ahooks";
import {AttachmentIndex, AttachmentUpload} from "@/apis/common.ts";
import {ColumnDef} from "@tanstack/react-table";
import {z} from "zod";
import {PhotoProvider, PhotoView} from "react-photo-view";
import PaginationSinglePage from "@/components/custom/data-table/data-table-pagination-single-page.tsx";
import {cn} from "@/lib/utils.ts";
import {IconCircleXFilled} from "@tabler/icons-react";
import {SearchInput} from "@/components/custom/search-input.tsx";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request.ts";
import {useTranslation} from "react-i18next";
import {Separator} from "@/components/ui/separator.tsx";

interface SearchInfo {
  keyword: string;
}

const columnSchema: z.ZodObject<any> = z.object({
  id: z.number(),
  attach_name: z.string(),
  attach_origin_name: z.string(),
  attach_url: z.string(),
  attach_type: z.number(),
  attach_mine_type: z.string(),
  attach_extension: z.string(),
  attach_size: z.string(),
  status: z.number(),
})
type ColumnSchemaType = z.infer<typeof columnSchema>

interface ResourceUploadProps {
}

export default function ResourceUpload({}: ResourceUploadProps) {
  // =========================== Params ==========================================
  const {t} = useTranslation()
  const [files, setFiles] = useState<File[] | null>([]);
  const {onPaginationChange, page, limit, pagination} = usePagination(12);
  const [searchForm, setSearchForm] = useState<SearchInfo>({
    keyword: '',
  })
  const debouncedKeyword = useDebounce(searchForm.keyword, {wait: 200});
  const uploadHostUrl = import.meta.env.VITE_RESOURCE_URL
  const columns: ColumnDef<ColumnSchemaType>[] = [
    {accessorKey: 'id'},
    {accessorKey: 'attach_name'},
    {accessorKey: 'attach_origin_name'},
    {accessorKey: 'attach_url'},
    {accessorKey: 'attach_type'},
    {accessorKey: 'attach_mine_type'},
    {accessorKey: 'attach_extension'},
    {accessorKey: 'attach_size'},
    {accessorKey: 'status'},
  ]

  // =========================== API request ======================================
  const indexRes = useRequest(AttachmentIndex, {manual: true})
  const uploadRes = useRequest(AttachmentUpload, {manual: true})

  useEffect(() => {
    if (debouncedKeyword) {
      indexRes.run({page, limit, search: JSON.stringify(searchForm)})
    } else {
      indexRes.run({page, limit})
    }
  }, [page, limit, debouncedKeyword]);

  const table = useDataTable({
    columns,
    data: indexRes.data?.data.list || [] as ColumnSchemaType[],
    pageCount: indexRes.data?.data?.last_page || 0,
    rowCount: indexRes.data?.data?.total || 0,
    pagination: pagination,
    onPaginationChange: onPaginationChange,
  })

  // =========================== Method ===========================================
  const handleTabChange = (value: string) => {
    if (value === '2') {
      indexRes.run({page, limit, search: JSON.stringify(searchForm), noCache: true})
    }
  }

  const handleFileChange = (files: File[] | null) => {
    if (!files) return
    const formData = new FormData();
    formData.append('file', files[files.length - 1])
    formData.append('file_path', 'product')
    AttachmentUpload(formData).then(res => {
      console.log('res', res)
    })
    const runAsync: Promise<ApiResult<any>> = uploadRes.runAsync(formData);
    toast.promise(
      runAsync,
      {
        loading: t('settings.table.action.processing.title') || 'loading...',
        success: (data: ApiResult<any>) => data.message,
        error: (err) => err.response?.data.message || err.message || 'Server Error'
      }
    ).then(() => {
      setFiles(files)
    })
  }

  const handleImgClick = (row: any) => {
    console.log('handle', row)
  }

  return (
    <>
      <Tabs defaultValue="1" className="" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="1">本地图片</TabsTrigger>
          <TabsTrigger value="2">图库图片</TabsTrigger>
          <TabsTrigger value="3">网络图片</TabsTrigger>
          <TabsTrigger value="4">网络视频</TabsTrigger>
        </TabsList>
        <div className='mt-4 min-h-[280px]'>
          <TabsContent value="1">
            <FileUploadDropzone files={files} onValueChange={handleFileChange} maxFiles={10} noPreview={true}/>
          </TabsContent>
          <TabsContent value="2">
            <SearchInput className={'min-w-[400px] m-auto mb-2'}
                         placeholder={`请输入关键词搜索...`} value={searchForm.keyword}
                         onKeyword={(keyword: string) => setSearchForm({keyword})}/>
            {table.getRowModel().rows.length > 0 ?
              <div className='grid grid-cols-6 gap-2 my-4 items-center'>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <div key={row.original.id} className='relative m-auto p-0 border rounded-md border-dashed'
                         onClick={() => handleImgClick(row)}>
                      <Avatar className='w-[78px] h-[78px] p-0 rounded-md'>
                        <AvatarImage src={row.original.attach_url ? uploadHostUrl + row.original.attach_url : ''}
                                     alt={row.original.attach_name}/>
                        <AvatarFallback className='w-[78px] h-[78px] p-0 rounded-md'></AvatarFallback>
                      </Avatar>
                    </div>
                  )
                })}
              </div> :
              <div className='w-full h-24 flex items-center justify-center text-gray-500'>No results.</div>
            }
            <div className='mt-4'>
              <PaginationSinglePage key='resource-pagination' table={table}/>
            </div>
          </TabsContent>

          <TabsContent value="3">
            <div className='flex flex-row items-center space-x-2'>
              <Input placeholder='请输入网络图片地址'/>
              <Button variant={'secondary'}><ClipboardPaste size={16}/></Button>
            </div>
          </TabsContent>
          <TabsContent value="4">
            <div className='flex flex-row items-center space-x-2'>
              <Input placeholder='请输入网络视频地址'/>
              <Button variant={'secondary'}><ClipboardPaste size={16}/></Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
      {files && files.length > 0 && <Separator className="my-4"/>}
      <div className="grid grid-cols-6 gap-2 my-4 items-center">
        <PhotoProvider>
          {files?.map((file, i) => {
            const removeFileFromSet = (index: number) => {
              const newFiles = files?.filter((_, i) => index !== i);
              setFiles(newFiles)
            }
            return (
              <div key={i} className={cn('relative m-auto p-0 rounded-md border border-dashed')}>
                <PhotoView src={URL.createObjectURL(file)}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-[78px] h-[78px] p-0 rounded-md"
                  />
                </PhotoView>
                <button
                  type="button"
                  className={cn(
                    "absolute -top-2 -right-2"
                  )}
                  onClick={() => removeFileFromSet(i)}
                >
                  <span className="sr-only">remove item {i}</span>
                  <div className='bg-background rounded-full'>
                    <IconCircleXFilled size={18} className='cursor-pointer text-gray-500 hover:text-red-500'/>
                  </div>
                </button>
              </div>
            )
          })}
        </PhotoProvider>
      </div>
    </>
  )
}