import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import FileUploadDropzone from "@/components/custom/image-uploader.tsx";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/custom/button.tsx";
import {ClipboardPaste} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useDataTable} from "@/hooks/use-data-table.tsx";
import {usePagination} from "@/hooks/use-pagination.tsx";
import {useRequest} from "ahooks";
import {AttachmentIndex} from "@/apis/common.ts";
import {ColumnDef} from "@tanstack/react-table";
import {z} from "zod";
import {PhotoProvider, PhotoView} from "react-photo-view";
import PaginationSinglePage from "@/components/custom/data-table/data-table-pagination-single-page.tsx";

interface ResourceUploadProps {
}

export const columnSchema: z.ZodObject<any> = z.object({
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
export type ColumnSchemaType = z.infer<typeof columnSchema>

export default function ResourceUpload({}: ResourceUploadProps) {
  // =========================== Params ==========================================
  const [files, setFiles] = useState<File[] | null>([]);
  const {onPaginationChange, page, limit, pagination} = usePagination();
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

  // =========================== Method ===========================================
  const handleTabChange = (value: string) => {
    if (value === '2') {
      indexRes.run({page, limit})
    }
  }

  const table = useDataTable({
    columns,
    data: indexRes.data?.data.list || [] as ColumnSchemaType[],
    pageCount: indexRes.data?.data?.last_page || 0,
    rowCount: indexRes.data?.data?.total || 0,
    pagination: pagination,
    onPaginationChange: onPaginationChange,
  })

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
            <FileUploadDropzone files={files} onValueChange={setFiles} maxFiles={10} noPreview={true}/>
          </TabsContent>
          <TabsContent value="2">
            <div className='grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-2'>
              {table.getRowModel().rows.map((row) => {
                return (
                  <div>
                    <Avatar className={'rounded-md min-w-[80px] min-h-[80px]'}>
                      <AvatarImage src={uploadHostUrl + row.original.attach_url} alt={row.original.attach_name}/>
                      <AvatarFallback className='min-w-[80px] min-h-[80px] rounded-md w-auto h-auto'></AvatarFallback>
                    </Avatar>
                  </div>
                )
              })}
            </div>
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
      <div className="flex items-center my-4 flex-row gap-2">
        <PhotoProvider>
          {files?.map((file, i) => (
            <div key={i} className="w-[70px] h-[70px] p-0 border border-dashed">
              <PhotoView key={i} src={URL.createObjectURL(file)}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-[70px] h-[70px] p-0 rounded-md"
                />
              </PhotoView>
            </div>
          ))}
        </PhotoProvider>
      </div>
    </>
  )
}