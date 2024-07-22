import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import FileUploadDropzone from "@/components/custom/image-uploader.tsx";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/custom/button.tsx";
import {CircleMinus, CirclePlus, ClipboardPaste, Eye, ImageOff, RotateCw, SquarePlus} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useDataTable} from "@/hooks/use-data-table.tsx";
import {usePagination} from "@/hooks/use-pagination.tsx";
import {useDebounce, useRequest} from "ahooks";
import {AttachmentIndex, AttachmentUpload} from "@/apis/common.ts";
import {ColumnDef, Row} from "@tanstack/react-table";
import {z} from "zod";
import {PhotoSlider} from "react-photo-view";
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
  const [resources, setResources] = useState<ColumnSchemaType[]>([]);
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
  const [visible, setVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

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
    if (!files || (files && files.length === 0)) {
      toast.error('上传失败')
      return
    }
    const formData = new FormData();
    formData.append('file', files[files.length - 1])
    formData.append('file_path', 'product')
    const runAsync: Promise<ApiResult<any>> = uploadRes.runAsync(formData);

    toast.promise(
      runAsync,
      {
        loading: t('settings.table.action.processing.title') || 'loading...',
        success: (data: ApiResult<any>) => data.message,
        error: (err) => err.response?.data.message || err.message || 'Server Error'
      }
    ).then((res) => {
      console.log(res)
      setResources([
        ...resources,
        {
          attach_name: res.data?.file_name || '',
          attach_origin_name: res.data?.origin_name || '',
          attach_url: res.data?.file_path || '',
          attach_mine_type: res.data?.mime_type || '',
          attach_extension: res.data?.extension || '',
          attach_size: res.data?.file_size || 0,
        }
      ])
      setFiles(files)
    })
  }

  const handleShowSlider = (index: number) => {
    setPhotoIndex(index)
    setVisible(true);
  }

  const handleCloseSlider = () => {
    setVisible(false);
  }

  const handleResourceAdd = (row: Row<any>) => {
    setResources([
      ...resources,
      {
        attach_name: row.original.attach_name,
        attach_origin_name: row.original.attach_origin_name,
        attach_url: row.original.attach_url,
        attach_mine_type: row.original.attach_mine_type,
        attach_extension: row.original.attach_extension,
        attach_size: row.original.attach_size,
      }
    ])
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
        <div className='mt-4'>
          <TabsContent value="1">
            <FileUploadDropzone files={files} onValueChange={handleFileChange} maxFiles={10} noPreview={true}/>
          </TabsContent>
          <TabsContent value="2">
            <SearchInput className={'min-w-[400px] m-auto mb-2'}
                         placeholder={`请输入关键词搜索...`} value={searchForm.keyword}
                         onKeyword={(keyword: string) => setSearchForm({keyword})}/>
            {table.getRowModel().rows.length > 0 ?
              <div className='grid grid-cols-6 grid-rows-2 gap-2 my-4'>
                {table.getRowModel().rows.map((row, index) => {
                  return (
                    <div key={row.original.id}
                         className='relative aspect-square p-0 border rounded-md border-dashed group'>
                      <Avatar className='w-full h-full aspect-square p-0 rounded-md'>
                        <AvatarImage src={row.original.attach_url ? uploadHostUrl + row.original.attach_url : ''}
                                     alt={row.original.attach_name}/>
                        <AvatarFallback className='rounded-md text-gray-300'>
                          <ImageOff size={24}/>
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className="absolute inset-0 bg-black bg-opacity-80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-center h-full text-white space-x-2 cursor-pointer">
                          <Eye size={16} onClick={() => handleShowSlider(index)}/>
                          <SquarePlus size={16} onClick={() => handleResourceAdd(row)}/>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <PhotoSlider
                  images={table.getRowModel().rows.map((row) => ({
                    src: row.original.attach_url ? uploadHostUrl + row.original.attach_url : '',
                    key: row.original.id
                  }))}
                  visible={visible}
                  onClose={handleCloseSlider}
                  index={photoIndex}
                  onIndexChange={setPhotoIndex}
                  toolbarRender={({rotate, onRotate, onScale, scale}) => {
                    return (
                      <div className='flex flex-row space-x-3'>
                        <CirclePlus size={19}
                                    className='cursor-pointer opacity-75 transition-opacity duration-200 ease-linear hover:opacity-100'
                                    onClick={() => onScale(scale + 0.2)}/>
                        <CircleMinus size={19}
                                     className='cursor-pointer opacity-75 transition-opacity duration-200 ease-linear hover:opacity-100'
                                     onClick={() => onScale(scale - 0.2)}/>
                        <RotateCw size={19}
                                  className='cursor-pointer opacity-75 transition-opacity duration-200 ease-linear hover:opacity-100'
                                  onClick={() => onRotate(rotate + 90)}/>
                      </div>
                    );
                  }}
                />
              </div>
              :
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
      {
        resources.length > 0 && <Separator className="my-4"/>
      }
      <div className="grid grid-cols-6 grid-rows-2 gap-2">
        {resources.map((file, i) => {
          const removeFileFromSet = (index: number) => {
            const newFiles = resources.filter((_, i) => index !== i);
            setResources(newFiles)
          }
          return (
            <div key={i} className={cn('relative aspect-square p-0 border rounded-md border-dashed')}>
              <img
                src={uploadHostUrl + file.attach_url}
                alt={file.name}
                className="w-full h-full aspect-square p-0 rounded-md"
              />
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
        <PhotoSlider
          images={resources.map((file, index) => ({
            src: uploadHostUrl + file.attach_url,
            key: index
          }))}
          visible={visible}
          onClose={handleCloseSlider}
          index={photoIndex}
          onIndexChange={setPhotoIndex}
          toolbarRender={({rotate, onRotate, onScale, scale}) => {
            return (
              <div className='flex flex-row space-x-3'>
                <CirclePlus size={19}
                            className='cursor-pointer opacity-75 transition-opacity duration-200 ease-linear hover:opacity-100'
                            onClick={() => onScale(scale + 0.2)}/>
                <CircleMinus size={19}
                             className='cursor-pointer opacity-75 transition-opacity duration-200 ease-linear hover:opacity-100'
                             onClick={() => onScale(scale - 0.2)}/>
                <RotateCw size={19}
                          className='cursor-pointer opacity-75 transition-opacity duration-200 ease-linear hover:opacity-100'
                          onClick={() => onRotate(rotate + 90)}/>
              </div>
            );
          }}
        />
      </div>
    </>
  )
}