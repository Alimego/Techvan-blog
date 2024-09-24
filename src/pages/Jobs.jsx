import { useEffect } from "react";
import Layout from "../layouts/Layout";

const Jobs = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
        <div className="flex items-center justify-center m-auto pt-16 md:pt-24 px-6 md:px-20 pb-6 text-2xl font-[Lato]">
            <p className="text-center">There are no jobs currently, please come back later.</p>
        </div>
    </Layout>
  )
}

export default Jobs
