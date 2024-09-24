import { useEffect } from "react";
import Layout from "../layouts/Layout";

const NoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
        <div className="flex items-center flex-col gap-6 justify-center m-auto pt-16 md:pt-24 px-6 md:px-20 pb-6 text-2xl font-[Lato]">
            <p className="text-center">Page Not Found. It seems you’ve landed in the wrong place</p>
            <button className="bg-primary p-4 text-white text-2xl font-semibold rounded-lg">Back home</button>
        </div>
    </Layout>
  )
}

export default NoPage
