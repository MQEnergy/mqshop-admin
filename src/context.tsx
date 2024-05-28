import { createContext } from 'react';

// table context
export const TableContext = createContext<{
  setInfo?: (values: any) => void; // set detail info
  onRefresh?: () => void;
}>({})

export const MemberContext = createContext<{
  onResetPassword?: () => void;
}>({});

