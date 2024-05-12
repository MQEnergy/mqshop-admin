export default {
  path: 'demo3',
  lazy: async () => ({
    Component: (await import('./index')).default,
  }),
}
