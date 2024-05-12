import HttpClient from '@/lib/request';
import {ListReq, ListResp} from './models/userModel';

export const getList = (params: ListReq) => {
  return HttpClient.get<ListResp>('/backend/user/list', {params});
};
