import Exception404 from "@/pages/exception/404";

export default {
  path: 'products',
  lazy: async () => ({
    Component: (await import('@/pages/products')).default,
  }),
  errorElement: <Exception404/>,
  children: [
    {
      index: true,
      path: 'index',
      lazy: async () => ({
        Component: (await import('@/pages/products/list')).default,
      }),
    },
    {
      path: 'cates',
      lazy: async () => ({
        Component: (await import('@/pages/products/cate')).default,
      }),
    },
    {
      path: 'brands',
      lazy: async () => ({
        Component: (await import('@/pages/products/brand')).default,
      }),
    },
    {
      path: 'attrs',
      lazy: async () => ({
        Component: (await import('@/pages/products/attrs')).default,
      }),
    },
  ]
};
