export interface CacheReq {
  noCache: boolean
}

export interface PageReq {
  page: number; // 页码
  limit: number; // 每页数量
  search?: any // 搜索
}

export interface ViewReq {
  id: number;
}

export interface AttachmentUploadReq extends FormData, CacheReq {
}
