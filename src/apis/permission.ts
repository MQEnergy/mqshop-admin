import {MemberCreateReq, MemberDeleteReq, MemberIndexReq, MemberUpdateReq} from "@/apis/models/permission-model";
import {HttpClient} from "@/lib/request";

// ============================ member =====================================
export const MemberList = (data: MemberIndexReq) => {
  return HttpClient.post("/backend/member/index", data);
}
export const MemberView = (params: MemberDeleteReq) => {
  return HttpClient.get("/backend/member/view", {params});
}
export const MemberCreate = (data: MemberCreateReq) => {
  return HttpClient.post("/backend/member/create", data);
}
export const MemberUpdate = (data: MemberUpdateReq) => {
  return HttpClient.post("/backend/member/update", data);
}
export const MemberDelete = (data: MemberDeleteReq) => {
  return HttpClient.post("/backend/member/delete", data);
}
// ============================ role =====================================


// ============================ resource =====================================
