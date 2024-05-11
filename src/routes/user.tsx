import Exception404 from "@/pages/exception/404";

export default {
  path: 'users',
  lazy: async () => ({
    Component: (await import('@/pages/users')).default,
  }),
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