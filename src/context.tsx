import { createContext } from 'react';

export const GlobalContext = createContext<{
  setInfo?: (values: any) => void; // set detail info
  onRefresh?: () => void; // refresh page
}>({});
