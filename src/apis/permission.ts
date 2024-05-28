import {
  MemberChangePassReq,
  MemberCreateReq,
  MemberDeleteReq,
  MemberIndexReq,
  MemberRoleDistributionReq,
  MemberUpdateReq,
  ResourceCreateReq,
  ResourceDeleteReq,
  ResourceIndexReq,
  ResourceUpdateReq,
  RoleCreateReq,
  RoleDeleteReq,
  RoleIndexReq,
  RoleListReq,
  RoleUpdateReq
} from "@/apis/models/permission-model";
import {HttpClient} from "@/lib/request";

// ============================ member =====================================
export const MemberIndex = (params: MemberIndexReq) => {
  const noCache = params.noCache === true
  return HttpClient.get(`/backend/admin/index?noCache=${noCache}`, {params});
}
export const MemberView = (params: MemberDeleteReq) => {
  const noCache = params.noCache === true
  return HttpClient.get(`/backend/admin/view?noCache=${noCache}`, {params});
}
export const MemberInfo = (params: MemberDeleteReq) => {
  const noCache = params.noCache === true
  return HttpClient.get(`/backend/admin/info?noCache=${noCache}`, {params});
}
export const MemberCreate = (data: MemberCreateReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`backend/admin/create?noCache=${noCache}`, data);
}
export const MemberUpdate = (data: MemberUpdateReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/admin/update?noCache=${noCache}`, data);
}
export const MemberDelete = (data: MemberDeleteReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/admin/delete?noCache=${noCache}`, data);
}
export const MemberChangePass = (data: MemberChangePassReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/admin/change-pass?noCache=${noCache}`, data);
}
export const MemberRoleDistribution = (data: MemberRoleDistributionReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/admin/role-distribution?noCache=${noCache}`, data);
}

// ============================ role =====================================
export const RoleIndex = (params: RoleIndexReq) => {
  const noCache = params.noCache === true
  return HttpClient.get(`/backend/role/index?noCache=${noCache}`, {params});
}
export const RoleList = (params: RoleListReq) => {
  const noCache = params.noCache === true
  return HttpClient.get(`/backend/role/list?noCache=${noCache}`);
}
export const RoleView = (params: RoleDeleteReq) => {
  const noCache = params.noCache === true
  return HttpClient.get(`/backend/role/view?noCache=${noCache}`, {params});
}
export const RoleCreate = (data: RoleCreateReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/role/create?noCache=${noCache}`, data);
}
export const RoleUpdate = (data: RoleUpdateReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/role/update?noCache=${noCache}`, data);
}
export const RoleDelete = (data: RoleDeleteReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/role/delete?noCache=${noCache}`, data);
}

// ============================ resource =====================================
export const ResourceIndex = (params: ResourceIndexReq) => {
  const noCache = params.noCache === true
  return HttpClient.get(`/backend/resource/index?noCache=${noCache}`, {params});
}
export const ResourceView = (params: ResourceDeleteReq) => {
  const noCache = params.noCache === true
  return HttpClient.get(`/backend/resource/view?noCache=${noCache}`, {params});
}
export const ResourceCreate = (data: ResourceCreateReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/resource/create?noCache=${noCache}`, data);
}
export const ResourceUpdate = (data: ResourceUpdateReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/resource/update?noCache=${noCache}`, data);
}
export const ResourceDelete = (data: ResourceDeleteReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/resource/delete?noCache=${noCache}`, data);
}