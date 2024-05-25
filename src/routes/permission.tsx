import Exception404 from "@/pages/exception/404";

export default {
  path: 'permissions',
  lazy: async () => ({
    Component: (await import('@/pages/permission')).default,
  }),
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