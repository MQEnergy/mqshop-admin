export interface CacheReq {
  noCache?: boolean
}

export interface PageReq {
  page: number; // 页码
  limit: number; // 每页数量
  search?: any // 搜索
}

export interface ViewReq {
  id: number;
}

// =============================== attachment ==================================
export interface AttachmentModel {
  attach_name: string;
  attach_origin_name: string;
  attach_url: string;
  attach_type: number;
  attach_mine_type: string;
  attach_extension: string;
  attach_size: string;
  status: number;
}

export interface AttachmentIndexReq extends PageReq, CacheReq {
}

export interface AttachmentUploadReq extends FormData, CacheReq {
}

export interface AttachmentViewReq extends ViewReq, CacheReq {
}

export interface AttachmentDeleteReq extends ViewReq, CacheReq {
}

export interface AttachmentUpdateReq extends AttachmentModel, ViewReq, CacheReq {
}

// =============================== region ==================================
export interface CityModel {
  code: string;
  name: string;
  province_code: string;
  leter: string;
  status: string;
  spelling: string;
  acronym: string;
}
export interface AreaModel {
  code: string;
  name: string;
  city_code: string;
  province_code: string;
}

export interface CityIndexReq extends PageReq, CacheReq {
}

export interface CityViewReq extends ViewReq, CacheReq {
}

export interface CityCreateReq extends CityModel, CacheReq {
}

export interface CityUpdateReq extends CityModel, ViewReq, CacheReq {
}

export interface CityDeleteReq extends ViewReq, CacheReq {
}

export interface CityListReq extends CacheReq {
}
