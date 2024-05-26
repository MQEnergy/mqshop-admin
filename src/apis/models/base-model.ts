export interface CacheReq {
  noCache?: boolean
}
export interface AttachmentUploadReq extends FormData, CacheReq{}
