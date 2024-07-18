import {HttpClient} from "@/lib/request";
import {AttachmentIndexReq, AttachmentUploadReq} from "@/apis/models/base-model";

export const AttachmentIndex = (params: AttachmentIndexReq) => {
  return HttpClient.get(`/backend/attachment/index`, {params});
}

export const AttachmentUpload = (data: AttachmentUploadReq) => {
  return HttpClient.post(`/backend/attachment/upload?noCache=${data.noCache}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
