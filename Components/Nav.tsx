import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const links = [
  { name: 'Proyectos', path: '/' },
  { name: 'Bolsa de Talentos', path: '/' },
  { name: 'Contacto', path: '/' },
  { name: 'Nosotros', path: '/' },
]

export default function Nav() {
  const [navBarOpen, setNavBarOpen] = useState(false)

  const handleToggleNav = () => {
    setNavBarOpen(!navBarOpen)
  }

  const handleCloseNav = () => {
    setNavBarOpen(false)
  }

  const NavLink = ({ children, path }: { children: ReactNode; path: string }) => {
    return (
      <li className='min-w-max w-full px-4 flex md:px-0 md:block'>
        <Link
          className='transition-opacity px-6 py-4 w-full rounded-xl hover:bg-slate-50 md:px-4 md:py-2 md:rounded-md md:hover:opacity-80'
          onClick={handleCloseNav}
          href={path}
        >
          {children}
        </Link>
      </li>
    )
  }

  const NavButton = ({ children }: { children: ReactNode }) => {
    return (
      <li className='min-w-max w-full px-4 flex md:px-0 md:block'>
        <Link
          className='transition-opacity px-8 py-4 mt-2 w-full text-center hover:opacity-90 bg-[#607FF2] text-white text-sm rounded-xl '
          onClick={handleCloseNav}
          href='/'
        >
          {children}
        </Link>
      </li>
    )
  }

  const NavHamburguerButton = () => {
    return (
      <button className='flex flex-col justify-around items-center relative z-10 w-8 h-8 md:hidden' onClick={handleToggleNav}>
        <span className={`w-full bg-black h-0.5 transition-all rounded-sm ${navBarOpen && 'translate-y-[8px] rotate-[-45deg]'}`}></span>
        <span className={`w-full bg-black h-0.5 transition-all rounded-sm ${navBarOpen && 'w-0'}`}></span>
        <span className={`w-full bg-black h-0.5 transition-all rounded-sm ${navBarOpen && 'translate-y-[-8px] rotate-[45deg]'}`}></span>
      </button>
    )
  }

  return (
    <nav className='flex relative max-w-screen-2xl mx-auto h-24 items-center justify-between px-8 md:h-28 md:px-16'>
      {/* Background */}
      <div className='w-full h-full bg-white absolute top-0 z-10 left-0'></div>

      {/* Logo */}
      <Link className='relative z-50' href='/'>
        <Image src='/Logo Programadores argentina final sin fondo3 1.svg' width={173} height={46} alt='Programadores Argentina' />
      </Link>

      {/* Nav List */}
      <div className={`absolute left-0 top-0 w-full md:static md:w-max md:h-auto ${navBarOpen && 'h-screen'}`} onClick={handleCloseNav}>
        <ul
          className={`relative flex flex-col w-full justify-center bg-white border-b-[1px] border-neutral-200 pb-8 text-xl transition-transform ${
            navBarOpen ? 'translate-y-[6rem]' : 'translate-y-[-100%]'
          } md:z-20 md:border-none md:text-lg md:flex-row md:gap-8 md:w-auto md:bg-transparent md:transform-none md:transition-none md:px-0 md:pb-0`}
        >
          {links.map(({ name, path }) => {
            return (
              <NavLink key={name} path={path}>
                {name}
              </NavLink>
            )
          })}
          <NavButton>Generar Mi CV</NavButton>
        </ul>
      </div>

      {/* Hamburguer Button For Mobile */}
      <NavHamburguerButton />
    </nav>
  )
}
