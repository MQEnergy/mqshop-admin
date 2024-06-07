import {
  MemberChangePassReq,
  MemberCreateReq,
  MemberDeleteReq,
  MemberIndexReq, MemberInfoReq,
  MemberRoleDistributionReq,
  MemberUpdateReq,
  MemberViewReq,
  ResourceCreateReq,
  ResourceDeleteReq,
  ResourceIndexReq,
  ResourceUpdateReq, ResourceViewReq,
  RoleCreateReq,
  RoleDeleteReq,
  RoleIndexReq,
  RoleListReq,
  RoleUpdateReq
} from "@/apis/models/permission-model";
import {HttpClient} from "@/lib/request";

// ============================ member =====================================
export const MemberIndex = (params: MemberIndexReq) => {
  return HttpClient.get(`/backend/admin/index`, {params});
}
export const MemberView = (params: MemberViewReq) => {
  return HttpClient.get(`/backend/admin/view`, {params});
}
export const MemberInfo = (params: MemberInfoReq) => {
  return HttpClient.get(`/backend/admin/info`, {params});
}
export const MemberCreate = (data: MemberCreateReq) => {
  return HttpClient.post(`backend/admin/create?noCache=${data.noCache}`, data);
}
export const MemberUpdate = (data: MemberUpdateReq) => {
  return HttpClient.post(`/backend/admin/update?noCache=${data.noCache}`, data);
}
export const MemberDelete = (data: MemberDeleteReq) => {
  return HttpClient.post(`/backend/admin/delete?noCache=${data.noCache}`, data);
}
export const MemberChangePass = (data: MemberChangePassReq) => {
  return HttpClient.post(`/backend/admin/change-pass?noCache=${data.noCache}`, data);
}
export const MemberRoleDistribution = (data: MemberRoleDistributionReq) => {
  return HttpClient.post(`/backend/admin/role-distribution?noCache=${data.noCache}`, data);
}

// ============================ role =====================================
export const RoleIndex = (params: RoleIndexReq) => {
  return HttpClient.get(`/backend/role/index`, {params});
}
export const RoleList = (params: RoleListReq) => {
  return HttpClient.get(`/backend/role/list`, {params});
}
export const RoleView = (params: RoleDeleteReq) => {
  return HttpClient.get(`/backend/role/view`, {params});
}
export const RoleCreate = (data: RoleCreateReq) => {
  return HttpClient.post(`/backend/role/create?noCache=${data.noCache}`, data);
}
export const RoleUpdate = (data: RoleUpdateReq) => {
  return HttpClient.post(`/backend/role/update?noCache=${data.noCache}`, data);
}
export const RoleDelete = (data: RoleDeleteReq) => {
  return HttpClient.post(`/backend/role/delete?noCache=${data.noCache}`, data);
}

// ============================ resource =====================================
export const ResourceIndex = (params: ResourceIndexReq) => {
  return HttpClient.get(`/backend/resource/index`, {params});
}
export const ResourceView = (params: ResourceViewReq) => {
  return HttpClient.get(`/backend/resource/view`, {params});
}
export const ResourceCreate = (data: ResourceCreateReq) => {
  return HttpClient.post(`/backend/resource/create?noCache=${data.noCache}`, data);
}
export const ResourceUpdate = (data: ResourceUpdateReq) => {
  return HttpClient.post(`/backend/resource/update?noCache=${data.noCache}`, data);
}
export const ResourceDelete = (data: ResourceDeleteReq) => {
  return HttpClient.post(`/backend/resource/delete?noCache=${data.noCache}`, data);
}