import {CacheReq, PageReq, ViewReq} from "@/apis/models/base-model.ts";

// ============================ product =====================================
export interface ProductModel {
  uuid: string;
  goods_title: string;
  goods_subtitle: string;
  cate_id: number;
  brand_id: number;
  attr_cate_id: number;
  thumb_url: string;
  photo_urls: string;
  origin_price: number;
  promote_price: number;
  final_price: number;
  total_stock: number;
  is_hot: number;
  is_new: number;
  is_recommend: number;
  sort_order: number;
  status: number;
}
export interface ProductIndexReq extends PageReq, CacheReq {}
export interface ProductCreateReq extends ProductModel, CacheReq {
  name: string;
  price: number;
  description: string;
  image: string;
  status: number;
  categoryId: number;
}
export interface ProductUpdateReq extends ProductModel, ViewReq, CacheReq {}
export interface ProductDeleteReq extends ViewReq, CacheReq {}
export interface ProductViewReq extends ViewReq, CacheReq {}
export interface ProductDeleteReq extends ViewReq, CacheReq {}

// ============================ cate =====================================
export interface ProductCateModel {
  cate_name: string;
  cate_url: string;
  cate_desc: string;
  sort_order: number;
  parent_id: number;
  is_hot: number;
  is_index: number;
  status: number;
}
export interface ProductCateIndexReq extends PageReq, CacheReq {}
export interface ProductCateListReq extends CacheReq {
  id: number;
}
export interface ProductCateCreateReq extends ProductCateModel, CacheReq {}
export interface ProductCateUpdateReq extends ProductCateModel, ViewReq, CacheReq {}
export interface ProductCateDeleteReq extends CacheReq {
  ids: string;
}
export interface ProductCateViewReq extends ViewReq, CacheReq {}

export interface ProductCateStatusReq extends ViewReq, CacheReq {
  status: number;
}

// ============================ brand =====================================
export interface ProductBrandModel {
  brand_name: string;
  logo_url: string;
  desc: string;
  sort_order: number;
  is_hot: number;
  status: number;
}
export interface ProductBrandIndexReq extends PageReq, CacheReq {}
export interface ProductBrandCreateReq extends ProductBrandModel, CacheReq {}
export interface ProductBrandUpdateReq extends ProductBrandModel, ViewReq, CacheReq {}
export interface ProductBrandDeleteReq extends CacheReq {
  ids: string;
}
export interface ProductBrandViewReq extends ViewReq, CacheReq {}
export interface ProductBrandListReq extends CacheReq {}
export interface ProductBrandStatusReq extends ViewReq, CacheReq {
  status: number;
}

// ============================ attrs =====================================
export interface ProductAttrCateModel {
  cate_name: string;
  status: number;
}
export interface ProductAttrCateIndexReq extends PageReq, CacheReq {}
export interface ProductAttrCateListReq extends CacheReq {}
export interface ProductAttrCateViewReq extends ViewReq, CacheReq {}
export interface ProductAttrCateCreateReq extends ProductAttrCateModel, CacheReq {}
export interface ProductAttrCateUpdateReq extends ProductAttrCateModel, ViewReq, CacheReq {}
export interface ProductAttrCateDeleteReq extends CacheReq {
  ids: string;
}
export interface ProductAttrCateAttrListReq extends ViewReq, PageReq, CacheReq {
  attr_type: number;
}