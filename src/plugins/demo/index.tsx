import {Layout, LayoutBody} from "@/components/layout";
import {Outlet} from "react-router-dom";

export default function PluginDemo() {
  return (
      <Layout fixedHeight>
        <LayoutBody className='flex flex-col'>
          <div className='flex-1 md:m-auto lg:m-auto lg:flex-row space-y-5 md:w-10/12 lg:w-10/12'>
            <Outlet/>
          </div>
        </LayoutBody>
      </Layout>
  )
}