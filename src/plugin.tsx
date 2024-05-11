import manifestJson from "@/plugins/manifest.json";

const pluginRouters = async () => {
  const routers: any[] = [];
  for (const [key, value] of Object.entries(manifestJson)) {
    routers.push((await import(`@/plugins/${key}/${value}.tsx`)).default)
  }
  return routers
}

export {pluginRouters}