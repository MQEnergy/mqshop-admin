import {createBrowserRouter} from 'react-router-dom'
import Exception404 from "@/pages/exception/404";
import Product from "@/routes/product";
import Order from "@/routes/order";
import Exception from "@/routes/exception";
import User from "@/routes/user";
import {pluginRouters} from "@/plugin";

const staticRoutes = [
  // 静态的路由配置
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/login')).default,
    }),
  },
  // Main routes
  {
    path: '/',
    lazy: async () => ({
      Component: (await import('./App')).default,
    }),
    errorElement: <Exception404/>,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      Product,
      Order,
      User,
      ...Exception,
    ],
  },
];
const Routers = async () => {
  const pRoutes = await pluginRouters();
  return [
      ...staticRoutes,
      ...pRoutes,
  ];
}
const router = createBrowserRouter((await Routers()))

export default router
