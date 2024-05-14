import {HttpClient} from '@/lib/request';
import {LoginReq} from './models/user-model';

export const Login = (data: LoginReq) => {
  return HttpClient.post('/backend/auth/login', data)
}
export const Logout = () => {
  return HttpClient.post('/backend/auth/logout', {})
}