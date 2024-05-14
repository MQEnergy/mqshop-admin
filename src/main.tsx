import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './style/globals.css'
import './style/index.css'
import {RouterProvider} from "react-router-dom";
import router from "@/routes";
import {ThemeProvider} from "@/components/custom/theme-provider";
import i18next from "@/locale";
import {I18nextProvider} from "react-i18next";
import {Toaster} from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18next} defaultNS={'translation'}>
        <ThemeProvider defaultTheme='system' storageKey='mqshop-ui-theme'>
          <RouterProvider router={router}/>
        </ThemeProvider>
        <Toaster/>
      </I18nextProvider>
    </React.StrictMode>
)
