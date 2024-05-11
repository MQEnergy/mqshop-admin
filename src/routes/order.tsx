import Exception404 from "@/pages/exception/404";

export default {
  path: 'orders',
  lazy: async () => ({
    Component: Exception404,
  }),
  children: [
    {
      index: true,
      lazy: async () => ({
        Component: (await import('@/pages/products')).default,
      })
    }
  ]
}