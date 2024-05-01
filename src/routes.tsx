import {createBrowserRouter} from 'react-router-dom'
import Exception500 from "@/pages/exception/500";
import Exception401 from "@/pages/exception/401";
import Exception404 from "@/pages/exception/404";

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/login')).default,
    }),
  },

  // Main routes
  {
    path: '/',
    lazy: async () => {
      return {Component: (await import('./App')).default}
    },
    errorElement: <Exception404 onErrorCapture={e => console.log(e)}/>,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
    ],
  },

  // Error routes
  {path: '/500', Component: Exception500},
  {path: '/404', Component: Exception404},
  {path: '/401', Component: Exception401},

  // Fallback 404 route
  {path: '*', Component: Exception404},
])

export default router
