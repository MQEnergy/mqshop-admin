import {CacheReq} from "@/apis/models/base-model";

export interface LoginReq extends CacheReq {
  account: string; //
  password: string; //
}
export interface LogoutReq extends CacheReq {}