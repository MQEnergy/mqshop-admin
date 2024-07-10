import {HttpClient} from "@/lib/request.ts";
import {
  ProductAttrCateAttrListReq,
  ProductAttrCateCreateReq, ProductAttrCateDeleteReq,
  ProductAttrCateIndexReq, ProductAttrCateListReq, ProductAttrCateUpdateReq, ProductAttrCateViewReq,
  ProductBrandCreateReq, ProductBrandDeleteReq,
  ProductBrandIndexReq, ProductBrandListReq, ProductBrandStatusReq, ProductBrandUpdateReq, ProductBrandViewReq,
  ProductCateCreateReq, ProductCateDeleteReq,
  ProductCateIndexReq, ProductCateListReq, ProductCateStatusReq, ProductCateUpdateReq, ProductCateViewReq,
  ProductCreateReq,
  ProductDeleteReq,
  ProductIndexReq,
  ProductUpdateReq, ProductViewReq
} from "@/apis/models/product-model.ts";

// ============================ product =====================================
export const ProductIndex = (params: ProductIndexReq) => {
  return HttpClient.get(`/backend/product/index`, {params});
}
export const ProductCreate = (data: ProductCreateReq) => {
  return HttpClient.post(`/backend/product/create?noCache=${data.noCache || true}`, data);
}
export const ProductUpdate = (data: ProductUpdateReq) => {
  return HttpClient.post(`/backend/product/update?noCache=${data.noCache || true}`, data);
}
export const ProductView = (params: ProductViewReq) => {
  return HttpClient.get(`/backend/product/view`, {params});
}
export const ProductDelete = (data: ProductDeleteReq) => {
  return HttpClient.post(`/backend/product/delete?noCache=${data.noCache || true}`, data);
}

// ============================ product cate =====================================
export const ProductCateIndex = (params: ProductCateIndexReq) => {
  return HttpClient.get(`/backend/cate/index`, {params});
}
export const ProductCateList = (params: ProductCateListReq) => {
  return HttpClient.get(`/backend/cate/list`, {params});
}
export const ProductCateCreate = (data: ProductCateCreateReq) => {
  return HttpClient.post(`/backend/cate/create?noCache=${data.noCache || true}`, data);
}
export const ProductCateUpdate = (data: ProductCateUpdateReq) => {
  return HttpClient.post(`/backend/cate/update?noCache=${data.noCache || true}`, data);
}
export const ProductCateView = (params: ProductCateViewReq) => {
  return HttpClient.get(`/backend/cate/view`, {params});
}
export const ProductCateDelete = (data: ProductCateDeleteReq) => {
  return HttpClient.post(`/backend/cate/delete?noCache=${data.noCache || true}`, data);
}
export const ProductCateStatus = (data: ProductCateStatusReq) => {
  return HttpClient.post(`/backend/cate/status?noCache=${data.noCache || true}`, data);
}

// ==================== product brand =====================================
export const ProductBrandIndex = (params: ProductBrandIndexReq) => {
  return HttpClient.get(`/backend/brand/index`, {params});
}
export const ProductBrandList = (params: ProductBrandListReq) => {
  return HttpClient.get(`/backend/brand/list`, {params});
}
export const ProductBrandCreate = (data: ProductBrandCreateReq) => {
  return HttpClient.post(`/backend/brand/create?noCache=${data.noCache || true}`, data);
}
export const ProductBrandUpdate = (data: ProductBrandUpdateReq) => {
  return HttpClient.post(`/backend/brand/update?noCache=${data.noCache || true}`, data);
}
export const ProductBrandView = (params: ProductBrandViewReq) => {
  return HttpClient.get(`/backend/brand/view`, {params});
}
export const ProductBrandDelete = (data: ProductBrandDeleteReq) => {
  return HttpClient.post(`/backend/brand/delete?noCache=${data.noCache || true}`, data);
}
export const ProductBrandStatus = (data: ProductBrandStatusReq) => {
  return HttpClient.post(`/backend/brand/status?noCache=${data.noCache || true}`, data);
}

// ==================== product attrs =====================================
export const ProductAttrCateIndex = (params: ProductAttrCateIndexReq) => {
  return HttpClient.get(`/backend/attr-cates/index`, {params});
}
export const ProductAttrCateList = (params: ProductAttrCateListReq) => {
  return HttpClient.get(`/backend/attr-cates/list`, {params});
}
export const ProductAttrCateView = (params: ProductAttrCateViewReq) => {
  return HttpClient.get(`/backend/attr-cates/view`, {params});
}
export const ProductAttrCateCreate = (data: ProductAttrCateCreateReq) => {
  return HttpClient.post(`/backend/attr-cates/create?noCache=${data.noCache || true}`, data);
}
export const ProductAttrCateUpdate = (data: ProductAttrCateUpdateReq) => {
  return HttpClient.post(`/backend/attr-cates/update?noCache=${data.noCache || true}`, data);
}
export const ProductAttrCateDelete = (data: ProductAttrCateDeleteReq) => {
  return HttpClient.post(`/backend/attr-cates/delete?noCache=${data.noCache || true}`, data);
}
export const ProductAttrCateAttrList = (data: ProductAttrCateAttrListReq) => {
  return HttpClient.post(`/backend/attr-cates/attr-list?noCache=${data.noCache || true}`, data);
}


