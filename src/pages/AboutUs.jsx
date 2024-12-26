import { useEffect } from "react"
import Layout from "../layouts/Layout"

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
   <Layout>
    <div className="pt-20 pb-6 px-6 md:px-20">
      <p className="font-semibold text-2xl md:text-3xl pb-3 md:py-6">About Us</p>
      <div>
        <p className="text-[17px] flex flex-col gap-3 font-[Lato]">
          <p>At Techvan, our mission is to provide you with fast, accurate, and reliable updates on the latest technology. We’re passionate about keeping you informed, whether it&apos;s new gadgets, software updates, or major breakthroughs in the tech world. Our goal is to build a community of tech enthusiasts who are always in the know and ready to share their knowledge with others.</p>
          <p>We started in 2024 with the belief that staying connected to technology is more important than ever. As technology continues to shape our lives in new and exciting ways, we’re here to help you stay ahead of the curve. From daily updates to deep dives into trends.</p> 
          <p>Our vision is to become a leading platform that inspires the next generation of tech lovers, innovators, and curious minds. Whether you’re a professional in the industry or just someone who enjoys keeping up with the latest advancements, Techvan is here to make sure you never miss a beat.</p>
          <p>Technology never stands still, and neither do we. Our team is committed to bringing you the information that matters, helping you stay informed and engaged in a world that’s constantly changing. We believe that by staying connected to new ideas and developments, you can be part of the future of technology.</p>
        </p>
      </div>
    </div>
   </Layout>
  )
}

export default AboutUs
