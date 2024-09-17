import sectionOnedata from '../../data/SectionOneData'

const SectionOne = () => {
  return (
    <div className='flex flex-col gap-10'>
      {sectionOnedata.map((dataOne)=>(
        <div key={dataOne?.id} className="flex flex-col gap-3">
        <p className="text-xl text-[#EE4B2B] font-semibold">{dataOne?.category}</p>
        <p className="text-2xl text-black font-bold">{dataOne?.title}</p>
        <div className="flex items-center gap-2 text-[#777676] text-[18px]">
          <p>{dataOne?.writer}</p>
          <p>|</p>
          <p>{dataOne?.date}</p>
        </div>
        <img src={dataOne?.image} alt="Arduino" className='w-full h-[220px] rounded-md'/>
      </div>
      ))}
    </div>
  )
}

export default SectionOne
