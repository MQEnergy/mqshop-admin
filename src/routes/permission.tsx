import Exception404 from "@/pages/exception/404";
import Layout from "@/layout.tsx";

export default {
  path: '/permissions',
  element: <Layout/>,
  errorElement: <Exception404/>,
  children: [
    {
      index: true,
      path: 'member',
      lazy: async () => ({
        Component: (await import('@/pages/permission/member')).default,
      }),
    },
    {
      path: 'role',
      lazy: async () => ({
        Component: (await import('@/pages/permission/role')).default,
      }),
    },
    {
      path: 'resource',
      lazy: async () => ({
        Component: (await import('@/pages/permission/resource')).default,
      }),
    },
  ]
}