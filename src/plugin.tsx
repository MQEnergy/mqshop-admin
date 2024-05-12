// import manifestJson from "@/plugins/manifest.json";

const pluginRouters = () => {
  const routers: any[] = [];
  // for (const [key, value] of Object.entries(manifestJson)) {
  //   routers.push((await import(`@/plugins/${key}/${value}.tsx`)).default)
  // }
  const modules = import.meta.glob('@/plugins/*/router.tsx');
  Object.keys(modules).forEach(async (key) => {
    console.log(modules[key])
    // @ts-ignore
    const modulePath = (await modules[key]()).default;
    routers.push(modulePath)
  });
  console.log(routers.keys())
  return routers
}

export {pluginRouters}