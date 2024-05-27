import * as React from "react";
import {Accept, FileError, useDropzone} from "react-dropzone";
import {Input} from "@/components/ui/input";
import {Loader2, Plus} from "lucide-react";
import {ApiResult} from "@/lib/request";
import {IconCircleXFilled} from "@tabler/icons-react";

export interface ImageUploaderProps {
  preview: string | ArrayBuffer | null
  onPreview: (preview: string | ArrayBuffer | null) => void
  loading?: boolean
  onLoading?: (loading: boolean) => void
  onUpload: (file: File) => Promise<ApiResult<any>>
  onSuccess: (res: ApiResult<any>) => void
  onError: (err: Error) => void
  maxSize?: number
  accept?: Accept
  validator?: (file: File) => FileError | FileError[] | null
  multiple?: boolean
  maxFiles: number
}

export function AvatarUploader(props: ImageUploaderProps) {
  const maxSize = props.maxSize || 2097152// 默认2M
  const accept = props.accept || {"image/png": [], "image/gif": [], "image/jpg": [], "image/jpeg": []}
  const maxFiles = props.maxFiles

  const customValidator = (file: File): FileError | FileError[] | null => {
    if (file.size > maxSize) {
      return {
        code: 'file-too-large',
        message: '文件大小不能超过2M'
      }
    }
    return null
  }

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    props.onLoading && props.onLoading(true)
    const reader = new FileReader();
    if (acceptedFiles.length > 0 && fileRejections.length == 0) {
      props.onUpload(acceptedFiles[0]).then((res) => {
        props.onSuccess(res)
        reader.onload = () => props.onPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);

      }).catch(err => {
        props.onError(err)
        props.onPreview(null)
        props.onLoading && props.onLoading(false)
      })
    } else {
      props.onLoading && props.onLoading(false)
    }
  }, []);

  const {getRootProps, getInputProps, fileRejections} = useDropzone({
    onDrop,
    maxFiles,
    accept,
    multiple: !(maxFiles === 1),
    validator: props.validator || customValidator
  });
  const errorMessage = () => {
    let fileErrors: FileError[] = []
    if (fileRejections.length > 0) {
      fileErrors = fileRejections[0].errors
    }
    return fileErrors
  }

  const handleClose = () => {
    props.onPreview(null)
    props.onLoading && props.onLoading(false)
  }

  return (
      <div className='flex flex-col relative w-[80px] h-[80px]'>
        {props.preview &&
          <div className='bg-background absolute z-10 cursor-pointer -top-2 -right-2 rounded-full'
               onClick={handleClose}>
            <IconCircleXFilled size={18} className='text-gray-500'/>
          </div>}
        <div
            {...getRootProps()}
            className={`flex cursor-pointer relative flex-col items-center justify-center rounded-lg border-2 border-dashed w-[80px] h-[80px] ${fileRejections.length !== 0 && 'border-red-500'}`}
        >
          {props.preview && (
              <img
                  src={props.preview as string}
                  alt="Uploaded image"
                  className="h-[80px] w-[80px] rounded-lg"
              />
          )}
          <div className={`flex flex-col items-center text-gray-500 text-sm ${props.preview ? "hidden" : "block"}`}>
            {!props.loading ? <Plus/> : <Loader2 className='animate-spin'/>}
            {!props.loading ? '上传' : '上传中'}
          </div>
          {!props.loading && <Input {...getInputProps()} type="file"/>}
        </div>

        <div className='flex flex-row items-end'>
          {fileRejections.length !== 0 && (
              errorMessage().map(item => <p key={item.code} className='text-red-500 text-sm'>
                {item.message}
              </p>)
          )}
        </div>
      </div>
  );
};