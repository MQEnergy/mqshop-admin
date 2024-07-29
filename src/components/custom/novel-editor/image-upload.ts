import {createImageUpload} from "novel/plugins";
import {AttachmentUpload} from "@/apis/common";
import {toast} from "sonner";


const onUpload = (file: File) => {
  const formData = new FormData();
  formData.append('file', file)
  formData.append('file_path', 'product')

  const promise = AttachmentUpload(formData)

  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then(async (res) => {
        // Successfully uploaded image
        if (res.errcode === 0) {
          const url = res.data.file_path ? import.meta.env.VITE_RESOURCE_URL + res.data.file_path : res.data.file_path
          // preload the image
          const image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };
          // No blob store configured
        } else {
          resolve('');
          throw new Error("Error uploading image. Please try again.");
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => {
          reject(e);
          return e.message;
        },
      },
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});
