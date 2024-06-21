import {HttpClient} from '@/lib/request';
import {LoginReq, LogoutReq} from './models/user-model';

export const Login = (data: LoginReq) => {
  return HttpClient.post(`/backend/auth/login?noCache=${data.noCache || true}`, data)
}
export const Logout = (data?: LogoutReq) => {
  return HttpClient.post(`/backend/auth/logout?noCache=${data?.noCache || true}`, {})
}