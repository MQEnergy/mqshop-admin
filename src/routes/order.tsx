import Layout from "@/layout.tsx";
import Exception404 from "@/pages/exception/404";

export default {
  path: '/orders',
  element: <Layout/>,
  errorElement: <Exception404/>,
  children: [
    {
      index: true,
      path: 'index',
      lazy: async () => ({
        Component: (await import('@/pages/permission/member')).default,
      })
    }
  ]
}