interface PageReq {
  page: number; // 页码
  limit: number; // 每页数量
  search?: any // 搜索
}
interface ViewReq {
  id: number;
}
interface MemberReq {
  account: string;
  real_name: string;
  password: string;
  phone: string;
  avatar: string;
  status: number;
}
export interface MemberIndexReq extends PageReq {}
export interface MemberUpdateReq extends ViewReq, MemberReq {}
export interface MemberDeleteReq extends ViewReq {}
export interface MemberCreateReq extends MemberReq {}
// ============================ role =====================================
interface RoleReq {
  name: string;
  desc: string;
  status: number;
}
export interface RoleIndexReq extends PageReq {}
export interface RoleUpdateReq extends ViewReq, RoleReq {}
export interface RoleDeleteReq extends ViewReq {}
export interface RoleCreateReq extends RoleReq {}
// ============================ resource =====================================
interface ResourceReq {
  name: string;
  alias: string;
  desc: string;
  f_url: string;
  b_url: string;
  icon: string;
  parent_id: number;
  path: string;
  menu_type: number;
  status: number;
  sort_order: number;
}
export interface ResourceIndexReq extends PageReq {}
export interface ResourceUpdateReq extends ViewReq, ResourceReq {}
export interface ResourceDeleteReq extends ViewReq {}
export interface ResourceCreateReq extends ResourceReq {}