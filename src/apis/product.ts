import {HttpClient} from "@/lib/request.ts";
import {
  ProductCateCreateReq, ProductCateDeleteReq,
  ProductCateIndexReq, ProductCateListReq, ProductCateUpdateReq, ProductCateViewReq,
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
  return HttpClient.post(`/backend/product/create`, data);
}
export const ProductUpdate = (data: ProductUpdateReq) => {
  return HttpClient.post(`/backend/product/update`, data);
}
export const ProductView = (params: ProductViewReq) => {
  return HttpClient.get(`/backend/product/view`, {params});
}
export const ProductDelete = (data: ProductDeleteReq) => {
  return HttpClient.post(`/backend/product/delete`, data);
}

// ============================ product cate =====================================
export const ProductCateIndex = (params: ProductCateIndexReq) => {
  return HttpClient.get(`/backend/cate/index`, {params});
}
export const ProductCateList = (params: ProductCateListReq) => {
  return HttpClient.get(`/backend/cate/list`, {params});
}
export const ProductCateCreate = (data: ProductCateCreateReq)  => {
  return HttpClient.post(`/backend/cate/create`, data);
}
export const ProductCateUpdate = (data: ProductCateUpdateReq)  => {
  return HttpClient.post(`/backend/cate/update`, data);
}
export const ProductCateView = (params: ProductCateViewReq) => {
  return HttpClient.get(`/backend/cate/view`, {params});
}
export const ProductCateDelete = (data: ProductCateDeleteReq)  => {
  return HttpClient.post(`/backend/cate/delete`, data);
}



