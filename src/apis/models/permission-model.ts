interface PageReq {
  page: number; // 页码
  limit: number; // 每页数量
}

export interface MemberIndexReq extends PageReq {
  search?: any // 搜索
}

export interface MemberCreateReq {
  account: string;
  real_name: string;
  password: string;
  phone: string;
  avatar: string;
  status: number;
}
export interface MemberUpdateReq extends MemberCreateReq {
  id: number;
}
export interface MemberDeleteReq {
  id: number;
}