import { NextPage } from 'next'
import StaffSection from '../components/StaffSection'
import Hero from '../components/Hero/Hero'
import { CommentsSection } from '../components'
import { commentsList } from '../data/dummy-data';
import { ContactSection } from '../components/Contact/ContactSection';

const Home: NextPage = () => {
    return (
        <div className='w-full min-h-screen'>
          <Hero />
          <StaffSection />
          <ContactSection />
          <CommentsSection commentsList={commentsList}></CommentsSection>
        </div>
      )
}

export default Home;
