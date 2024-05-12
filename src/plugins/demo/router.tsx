import Exception404 from "@/pages/exception/404";

export default {
  path: 'demo',
  lazy: async () => ({
    Component: (await import('./index')).default,
  }),
  errorElement: <Exception404/>,
  children: [
    {
      index: true,
      lazy: async () => ({
        Component: (await import('./list')).default,
      })
    }
  ]
}
