import i18next, {Callback} from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Cache from 'i18next-localstorage-cache';

import enUS from "@/locale/en-US";
import zhCN from "@/locale/zh-CN";

const resources = {
  'zh-CN': {
    translation: zhCN
  },
  'en-US': {
    translation: enUS
  },
};

i18next
    .use(Cache)
    .use(new LanguageDetector(null, {lookupLocalStorage: "mqshop-lng"}))
    .use(initReactI18next)
    .init({
      // debug: true,
      resources: resources,
      fallbackLng: 'en-US',
      interpolation: {
        escapeValue: false
      },
    } as Callback)
    .then((t) => {
      t('menu.welcome');
    });

export default i18next;
