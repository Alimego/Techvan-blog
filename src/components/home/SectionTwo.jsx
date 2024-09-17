import sectionTwodata from "../../data/sectionTwoData"
const SectionTwo = () => {
  return (
    <div className='pt-10'>
      {sectionTwodata.map((dataOne)=>(
        <div key={dataOne?.id}>
            <div className="flex justify-between gap-3 w-full py-4">
                <div className="w-[70%] flex flex-col gap-1">
                    <p className="text-[18px] text-[#EE4B2B] font-semibold">{dataOne?.category}</p>
                    <p className="text-xl text-black font-bold">{dataOne?.title}</p>
                    <div className="flex flex-col gap-1 text-[#777676]">
                        <p>{dataOne?.writer}</p>
                        <p>{dataOne?.date}</p>
                    </div>
                </div>
                <div className="w-[30%] flex items-center">
                    <img src={dataOne?.image} alt="Arduino" className='w-full h-[70px] rounded-md'/>
                </div>
            </div>
            {dataOne?.id !== sectionTwodata?.length && <div className="bg-[#e4e4e4] w-full h-[1px]"></div>}
        </div>
      ))}
    <button className='p-2 w-full text-[#EE4B2B] border border-1 text-center hover:bg-[#e4e4e4] text-xl'>See More</button>
    </div>
  )
}

export default SectionTwo
