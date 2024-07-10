import Exception404 from "@/pages/exception/404";
import Layout from "@/layout.tsx";

export default {
  path: '/users',
  element: <Layout/>,
  errorElement: <Exception404/>,
  children: [
    {
      index: true,
      path: 'index',
      lazy: async () => ({
        Component: (await import('@/pages/users/list')).default,
      })
    }
  ]
}