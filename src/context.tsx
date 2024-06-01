import { createContext } from 'react';
import {UseTranslationResponse} from "react-i18next";

// table context
export const TableContext = createContext<{
  setInfo?: (values: any) => void; // set detail info
  onRefresh?: () => void;
  trans?: UseTranslationResponse<'translation', undefined>;
}>({})

export const MemberContext = createContext<{
  onResetPassword?: () => void;
}>({});

