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
  banner_cate_id: number;
  cate_url: string;
  cate_desc: string;
  sort_order: number;
  parent_id: number;
  path: string;
  is_hot: number;
  is_index: number;
  status: number;
}
export interface ProductCateIndexReq extends PageReq, CacheReq {}
export interface ProductCateListReq extends CacheReq {}
export interface ProductCateCreateReq extends ProductCateModel, CacheReq {}
export interface ProductCateUpdateReq extends ProductCateModel, ViewReq, CacheReq {}
export interface ProductCateDeleteReq extends CacheReq {
  ids: string;
}
export interface ProductCateViewReq extends ViewReq, CacheReq {}
