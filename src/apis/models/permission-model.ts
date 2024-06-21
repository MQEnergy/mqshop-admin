import {CacheReq, PageReq, ViewReq} from "@/apis/models/base-model";

// ============================ member =====================================
export interface MemberReq {
  account: string;
  real_name: string;
  password: string;
  phone: string;
  avatar: string;
  status: number;
  role_ids: string;
}
export interface MemberIndexReq extends PageReq, CacheReq {}
export interface MemberViewReq extends CacheReq {}
export interface MemberInfoReq extends ViewReq, CacheReq {}
export interface MemberUpdateReq extends ViewReq, MemberReq, CacheReq {}
export interface MemberCreateReq extends MemberReq, CacheReq {}
export interface MemberDeleteReq extends CacheReq {
  ids: string
}
export interface MemberChangePassReq extends CacheReq {
  uuid: string;
  new_pass: string;
  repeat_pass: string;
}
export interface MemberRoleDistributionReq extends ViewReq, CacheReq {
  role_ids: string
}

// ============================ role =====================================
interface RoleReq {
  name: string;
  desc: string;
  status: number;
}
export interface RoleIndexReq extends PageReq, CacheReq {}
export interface RoleListReq extends CacheReq {}
export interface RoleUpdateReq extends ViewReq, RoleReq, CacheReq {}
export interface RoleDeleteReq extends CacheReq {
  ids: string;
}
export interface RoleCreateReq extends RoleReq, CacheReq {}

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
export interface ResourceIndexReq extends PageReq, CacheReq {}
export interface ResourceUpdateReq extends ViewReq, ResourceReq, CacheReq {}
export interface ResourceViewReq extends ViewReq, CacheReq {}
export interface ResourceDeleteReq extends CacheReq {
  ids: string;
}
export interface ResourceCreateReq extends ResourceReq, CacheReq {}