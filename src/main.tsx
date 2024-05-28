import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './style/globals.css'
import './style/index.css'
import {RouterProvider} from "react-router-dom";
import router from "@/routes";
import {ThemeProvider} from "@/components/custom/theme-provider";
import i18next from "@/locale";
import {I18nextProvider} from "react-i18next";
import {Toaster} from 'react-hot-toast';
import {IconFidgetSpinner} from "@tabler/icons-react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <IconFidgetSpinner className='ml-2 h-4 w-4 animate-spin'/>
      <p className="text-sm ml-2">Loading...</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next} defaultNS={'translation'}>
      <ThemeProvider defaultTheme='system' storageKey='mqshop-ui-theme'>
        <RouterProvider router={router} fallbackElement={<Loading/>}/>
      </ThemeProvider>
      <Toaster/>
    </I18nextProvider>
  </React.StrictMode>
)
