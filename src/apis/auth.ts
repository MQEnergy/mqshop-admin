import {HttpClient} from '@/lib/request';
import {LoginReq} from './models/user-model';

export const Login = (data: LoginReq) => {
  const noCache = data.noCache === true
  return HttpClient.post(`/backend/auth/login?noCache=${noCache}`, data)
}
export const Logout = () => {
  return HttpClient.post(`/backend/auth/logout?noCache=true`, {})
}