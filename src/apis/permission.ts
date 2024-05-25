import {
  MemberCreateReq,
  MemberDeleteReq,
  MemberIndexReq,
  MemberUpdateReq,
  ResourceCreateReq,
  ResourceDeleteReq,
  ResourceIndexReq,
  ResourceUpdateReq,
  RoleCreateReq,
  RoleDeleteReq,
  RoleIndexReq,
  RoleUpdateReq
} from "@/apis/models/permission-model";
import {HttpClient} from "@/lib/request";

// ============================ member =====================================
export const MemberList = (params: MemberIndexReq) => {
  return HttpClient.get("/backend/admin/index", {params});
}
export const MemberView = (params: MemberDeleteReq) => {
  return HttpClient.get("/backend/admin/view", {params});
}
export const MemberCreate = (data: MemberCreateReq) => {
  return HttpClient.post("/backend/admin/create", data);
}
export const MemberUpdate = (data: MemberUpdateReq) => {
  return HttpClient.post("/backend/admin/update", data);
}
export const MemberDelete = (data: MemberDeleteReq) => {
  return HttpClient.post("/backend/admin/delete", data);
}
// ============================ role =====================================
export const RoleList = (params: RoleIndexReq) => {
  return HttpClient.get("/backend/role/index", {params});
}
export const RoleView = (params: RoleDeleteReq) => {
  return HttpClient.get("/backend/role/view", {params});
}
export const RoleCreate = (data: RoleCreateReq) => {
  return HttpClient.post("/backend/role/create", data);
}
export const RoleUpdate = (data: RoleUpdateReq) => {
  return HttpClient.post("/backend/role/update", data);
}
export const RoleDelete = (data: RoleDeleteReq) => {
  return HttpClient.post("/backend/role/delete", data);
}
// ============================ resource =====================================
export const ResourceList = (params: ResourceIndexReq) => {
  return HttpClient.get("/backend/resource/index", {params});
}
export const ResourceView = (params: ResourceDeleteReq) => {
  return HttpClient.get("/backend/resource/view", {params});
}
export const ResourceCreate = (data: ResourceCreateReq) => {
  return HttpClient.post("/backend/resource/create", data);
}
export const ResourceUpdate = (data: ResourceUpdateReq) => {
  return HttpClient.post("/backend/resource/update", data);
}
export const ResourceDelete = (data: ResourceDeleteReq) => {
  return HttpClient.post("/backend/resource/delete", data);
}