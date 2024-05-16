import {MemberCreateReq, MemberDeleteReq, MemberIndexReq, MemberUpdateReq} from "@/apis/models/permission-model";
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


// ============================ resource =====================================
