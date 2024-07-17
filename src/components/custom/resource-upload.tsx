import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import FileUploadDropzone from "@/components/custom/image-uploader.tsx";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/custom/button.tsx";
import {ClipboardPaste} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

interface ResourceUploadProps {

}

export default function ResourceUpload({...props}: ResourceUploadProps) {
  const [files, setFiles] = useState<File[] | null>([]);

  return (
    <Tabs defaultValue="1" className="">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="1">本地图片</TabsTrigger>
        <TabsTrigger value="2">图库图片</TabsTrigger>
        <TabsTrigger value="3">网络图片</TabsTrigger>
        <TabsTrigger value="4">网络视频</TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <FileUploadDropzone files={files} onValueChange={setFiles} maxFiles={10}/>
      </TabsContent>
      <TabsContent value="2">
        <div className='grid grid-cols-5'>
          <Avatar className={'rounded-md m-auto'}>
            <AvatarImage src="https://github.com/shadcn.png" alt=''/>
            <AvatarFallback>图片</AvatarFallback>
          </Avatar>
          <Avatar className={'rounded-md m-auto'}>
            <AvatarImage src="https://github.com/shadcn.png" alt=''/>
            <AvatarFallback>图片</AvatarFallback>
          </Avatar>
        </div>
      </TabsContent>
      <TabsContent value="3" className='flex flex-row items-center space-x-2'>
        <Input placeholder='请输入网络图片地址' />
        <Button variant={'secondary'}><ClipboardPaste size={16}/></Button>
      </TabsContent>
      <TabsContent value="4" className='flex flex-row items-center space-x-2'>
        <Input placeholder='请输入网络视频地址' />
        <Button variant={'secondary'}><ClipboardPaste size={16}/></Button>
      </TabsContent>
    </Tabs>
  )
}