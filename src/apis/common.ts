import {HttpClient} from "@/lib/request";
import {AttachmentUploadReq} from "@/apis/models/base-model";

export const AttachmentUpload = (data: AttachmentUploadReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/attachment/upload?noCache=${noCache}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}