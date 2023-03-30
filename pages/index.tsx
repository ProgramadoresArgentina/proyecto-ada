import { NextPage } from 'next'
import { useState } from 'react'
import { CommentsSection } from '../components'
import { Hero } from '../components/Hero/Hero'
import ProjectsSection from '../components/ProjectsSection'
import StaffSection from '../components/StaffSection'
import { commentsList } from '../data/dummy-data'

const Home: NextPage = () => {

    
    return (    
    <div className='w-full min-h-screen'>
        <Hero />
        <ProjectsSection />
        <CommentsSection commentsList={commentsList} />
        <StaffSection />
    </div>
    )
}

export default Home
