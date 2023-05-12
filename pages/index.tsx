import { NextPage } from 'next'
import { Hero } from '../components/Hero/Hero'
import StaffSection from '../components/StaffSection'

const Home: NextPage = () => (
  <div className='w-full min-h-screen'>
    <Hero />
    <StaffSection />
  </div>
)

export default Home;
