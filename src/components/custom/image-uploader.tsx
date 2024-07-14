import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem, FileSvgDraw,
} from "@/components/custom/file-uploader";
import {Accept, DropzoneOptions} from "react-dropzone";
import 'react-photo-view/dist/react-photo-view.css';
import {PhotoProvider, PhotoView} from "react-photo-view";


interface FileUploadDropzoneProps {
  files: File[] | null;
  onValueChange: (files: File[] | null) => void;
  accept?: Accept;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
}

const FileUploadDropzone = ({...props}: FileUploadDropzoneProps) => {

  const dropzone = {
    accept: props.accept || {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: props.multiple || true,
    maxFiles: props.maxFiles || 4,
    maxSize: props.maxSize || 1 * 1024 * 1024,
  } satisfies DropzoneOptions;

  return (
    <FileUploader
      value={props.files}
      onValueChange={props.onValueChange}
      dropzoneOptions={dropzone}
      orientation='horizontal'
    >
      <FileInput className="outline-dashed outline-1 outline-white">
        <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full border-2 border-dashed rounded-md">
          <FileSvgDraw/>
        </div>
      </FileInput>
      <FileUploaderContent className="flex items-center flex-row gap-2">
        <PhotoProvider>
          {props.files?.map((file, i) => (
            <FileUploaderItem
              key={i}
              index={i}
              className="size-20 p-0 border border-dashed"
              aria-roledescription={`file ${i + 1} containing ${file.name}`}
            >
              <PhotoView key={i} src={URL.createObjectURL(file)}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  height={60}
                  width={60}
                  className="size-20 p-0 rounded-md"
                />
              </PhotoView>
            </FileUploaderItem>
          ))}
        </PhotoProvider>
      </FileUploaderContent>
    </FileUploader>
  );
};

export default FileUploadDropzone;
