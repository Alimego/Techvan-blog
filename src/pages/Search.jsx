import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import postData from "../data/postData"
import Layout from '../layouts/Layout'
import SearchIcon from '../components/utils/icons/SearchIcon'
import { slugify } from '../hooks/slugify'

const Search = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("") // Trck what the user is typing
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState("") // Track the term used for the search result display
  const [searchResults, setSearchResults] = useState([])
  const [noResults, setNoResults] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    setDisplayedSearchTerm(searchTerm)
    const lowerCaseTerm = searchTerm.toLowerCase()
    const results = postData.filter((item)=>
      item.category.toLowerCase().includes(lowerCaseTerm) ||
      item.title.toLowerCase().includes(lowerCaseTerm) ||
      item.writer.toLowerCase().includes(lowerCaseTerm) ||
      item.date.toLowerCase().includes(lowerCaseTerm)
  );
    if(results.length > 0) {
      setSearchResults(results)
      setNoResults(false)
    } else{
      setNoResults(true)
      setSearchResults([])
    }
  }

  const handlePostClick = (title) => {
    const slug = slugify(title)
    navigate(`/${slug}`)
  }

  const handleCategoryClick = (category) => {
    const slug = slugify(category)
    navigate(`/category/${slug}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className="pt-16 md:pt-24 px-6 md:px-20 pb-6">
        <form className="py-4 md:pb-8" onSubmit={handleSearch}>
          <div className='w-full flex items-center justify-center bg-[#f7f7f7] p-4 border-1 border-black rounded-lg'>
            <input 
              type="type"
              name="search" 
              value={searchTerm} 
              onChange={(e)=>setSearchTerm(e.target.value)} 
              placeholder='Search' 
              required 
              className='w-full bg-[#f7f7f7] text-xl text-black outline-none'
            />
            <button className='cursor-pointer'>
              <SearchIcon />
            </button>
          </div>
        </form>

        {/* Results */}
        {noResults ? (
          <div className="grid gap-2">
            <p>Sorry, we couldn&apos;t find any results for <span className="font-bold">{displayedSearchTerm}</span>.</p>
            <p>Try the following suggestions to imporove your search:</p>
            <ul className="flex flex-col gap-2 list-disc pl-8">
              <li>Check your spelling.</li>
              <li>Try using different keywords</li>
              <li>Use more general search terms.</li>
            </ul>
          </div>
        ) : (
          <div>
            <div className="md:grid md:grid-cols-2 md:gap-10">
              {searchResults.map((item)=>(
                <div key={item?.id}>
                  <div className="flex justify-between gap-3 w-full py-4 md:h-[200px]">
                    <div className="w-[60%] flex flex-col gap-1">
                        <div onClick={()=> handleCategoryClick(item?.category)}>
                          <p className="text-[18px] text-primary font-semibold cursor-pointer">{item?.category}</p>
                        </div>
                        <div onClick={()=> handlePostClick(item?.title)}>
                          <p className="text-xl text-black font-bold hover:underline cursor-pointer ">{item?.title}</p>
                        </div>
                        <div className="flex flex-col gap-1 text-[#777676]">
                            <p>{item?.writer}</p>
                            <p>{item?.date}</p>
                        </div>
                    </div>
                    <div className="w-[40%] flex items-center" onClick={()=> handlePostClick(item?.title)}>
                      <img src={item?.image} alt="Arduino" className='w-full h-[100px] md:h-[180px] rounded-md cursor-pointer'/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {searchResults.length >= 20 && (
              <div className="flex items-center justify-center">
                <button className='p-2 my-4 text-xl text-primary border border-1 cursor-pointer w-1/2 hover:bg-[#e4e4e4] rounded-sm'>Read more</button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Search



