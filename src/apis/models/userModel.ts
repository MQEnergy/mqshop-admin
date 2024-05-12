//定义请求参数
export interface ListReq {
  id: number; //用户id
}

//定义接口返回数据
export interface ListResp {
  errcode: number;
  requestid: string;
  message: string;
  data: any;
}