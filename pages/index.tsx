import { NextPage } from 'next'
import { Hero } from '../components/Hero/Hero'
import ProjectsSection from '../components/ProjectsSection'
import StaffSection from '../components/StaffSection'

const Home: NextPage = () => (
  <div className='w-full min-h-screen'>
    <Hero />
    <ProjectsSection />
    <StaffSection />
  </div>
)

export default Home
