import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import NavLink from './NavLink'
import NavHamburguerButton from './NavHamburguerButton'

import { navBarLinks } from '../../constants'

export default function NavBar() {
  const [navBarOpen, setNavBarOpen] = useState(false)

  const handleToggleNav = () => {
    setNavBarOpen(!navBarOpen)
  }

  const handleCloseNav = () => {
    setNavBarOpen(false)
  }

  return (
    <nav className='flex relative max-w-screen-2xl mx-auto h-16 items-center justify-between px-6 md:h-20'>
      <div className='w-full h-full bg-white absolute top-0 z-10 left-0' />
      <Link className='relative z-50' href='/'>
        <Image
          src='/Logo_Programadores_argentina_final_sin_fondo.svg'
          width={173}
          height={46}
          priority
          alt='Programadores Argentina'
          className='w-40 h-full lg:w-44'
        />
      </Link>
      <div className={`absolute left-0 top-0 w-full md:static md:w-max md:h-auto ${navBarOpen && 'h-screen'}`} onClick={handleCloseNav}>
        <ul
          className={`relative flex flex-col w-full justify-center bg-white border-b-[1px] border-neutral-200 pb-4 text-lg transition-transform ${
            navBarOpen ? 'translate-y-[4rem]' : 'translate-y-[-100%]'
          } md:z-20 md:border-none md:text-base md:flex-row md:gap-2 md:w-auto md:bg-transparent md:transform-none md:transition-none md:px-0 md:pb-0 lg:gap-2`}
        >
          {navBarLinks.map(({ name, path, buttonStyle }) => (
            <NavLink key={name} path={path} onClick={handleCloseNav} buttonStyle={buttonStyle}>
              {name}
            </NavLink>
          ))}
        </ul>
      </div>
      <NavHamburguerButton active={navBarOpen} onClick={handleToggleNav} />
    </nav>
  )
}
