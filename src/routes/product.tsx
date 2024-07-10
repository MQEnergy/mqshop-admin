import Exception404 from "@/pages/exception/404";
import Layout from "@/layout.tsx";

export default {
  path: '/products',
  element: <Layout/>,
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
      children: [
        {
          index: true,
          path: '',
          lazy: async () => ({
            Component: (await import('@/pages/products/attrs')).default,
          }),
        },
        {
          path: 'attr-list/:id',
          lazy: async () => ({
            Component: (await import('@/pages/products/attrs/attr-list')).default,
          }),
        },
      ]
    },
  ]
};
