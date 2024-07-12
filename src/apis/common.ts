import {HttpClient} from "@/lib/request";
import {AttachmentUploadReq} from "@/apis/models/base-model";

export const AttachmentUpload = (data: AttachmentUploadReq) => {
  return HttpClient.post(`/backend/attachment/upload?noCache=${data.noCache}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}