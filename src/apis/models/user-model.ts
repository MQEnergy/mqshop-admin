// 定义请求参数
import {CacheReq} from "@/apis/models/base-model";

export interface LoginReq extends CacheReq {
  account: string; //
  password: string; //
}