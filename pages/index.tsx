import { NextPage } from 'next'
import StaffSection from '../components/StaffSection'
import Hero from '../components/Hero/Hero'
import { CommentsSection } from '../components'
import { commentsList } from '../data/dummy-data';
import { ContactSection } from '../components/Contact/ContactSection';
import { OurMission } from '../components/OurMission';

const Home: NextPage = () => {
    return (
        <div className='w-full min-h-screen'>
            <div>
                <Hero />
                <OurMission />
                <StaffSection />
                <CommentsSection commentsList={commentsList}></CommentsSection>
                <ContactSection />
            </div>
        </div>
      )
}

export default Home;
