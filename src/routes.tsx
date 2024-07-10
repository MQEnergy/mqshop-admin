import {createBrowserRouter, RouteObject} from 'react-router-dom'
import Exception404 from "@/pages/exception/404";
import Product from "@/routes/product";
import Order from "@/routes/order";
import Exception from "@/routes/exception";
import User from "@/routes/user";
import Permission from "@/routes/permission";
import Layout from "@/layout.tsx";

const staticRoutes: RouteObject[] = [
  // 静态的路由配置
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/login')).default
    })
  },
  // Main routes
  {
    path: '/',
    element: <Layout/>,
    errorElement: <Exception404/>,
    children: [
      {
        index: true,
        path: '',
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      ...Exception,
    ],
  },
  Product,
  Permission,
  Order,
  User,
];

const router = createBrowserRouter(staticRoutes)

export default router
