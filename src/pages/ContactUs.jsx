import { useEffect } from "react"
import Layout from "../layouts/Layout"

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
   <Layout>
    <div className="pt-20 pb-6 px-6 md:px-20">
      <p className="font-semibold text-2xl md:text-3xl py-3 md:py-6">Contact Us</p>
      <form className="w-full md:w-[90%] flex flex-col gap-6">
        <input 
          type="type"
          placeholder='Name*' 
          required 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg'
        /> 
        <input 
          type="type"
          placeholder='Email*' 
          required 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg'
        />
        <input 
          type="type"
          placeholder='Phone Number' 
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg'
        />
        <textarea 
          required
          placeholder='Message*'
          className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-1 border-black rounded-lg' 
        />
        <button className="bg-primary p-4 text-white text-2xl font-semibold rounded-lg">Send</button>
      </form>
    </div>
   </Layout>
  )
}

export default ContactUs
