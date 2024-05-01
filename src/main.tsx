import * as React from 'react'
import ReactDOM from 'react-dom/client'
import './locale'
import './style/globals.css'
import './style/index.css'
import {RouterProvider} from "react-router-dom";
import router from "@/routes";
import {ThemeProvider} from "@/components/custom/theme-provider";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='mq-ui-theme'>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>,
)
