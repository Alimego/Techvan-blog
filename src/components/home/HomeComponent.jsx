import SectionOne from "./SectionOne"
import SectionOneLg from "./SectionOneLg"
import SectionTwo from "./SectionTwo"
import { useMediaQuery } from '@mui/material'
const HomeComponent = () => {
  const isMediumScreen = useMediaQuery('(max-width: 1024px)')

  return (
    <div className="pt-24 pb-6 px-6 md:px-20">
     { isMediumScreen ? <SectionOne /> : <SectionOneLg />}
      <SectionTwo />
    </div>
  )
}

export default HomeComponent
