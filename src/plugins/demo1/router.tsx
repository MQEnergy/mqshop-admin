export default {
  path: 'demo1',
  lazy: async () => ({
    Component: (await import('./index')).default,
  }),
  children: [
    {
      index: true,
      path: 'index',
      lazy: async () => ({
        Component: (await import('./index')).default,
      }),
    }
  ]
}
