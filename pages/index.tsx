import { NextPage } from 'next'
import { Hero } from '../components/Hero/Hero'
import ProjectsSection from '../components/ProjectsSection'

const Home: NextPage = () => (
  <div className='w-full min-h-screen'>
    <Hero />
    <ProjectsSection />
  </div>
)

export default Home
