import HttpClient from '@/lib/request';
import type { ListParams, ListModel } from './models/userModel';

export const getList = (params: ListParams) => {
  return HttpClient.get<ListModel>('/backend/user/list', { params });
};
