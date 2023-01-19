import Link from 'next/link'
import { NavLinkProps } from '../../interfaces'

export default function NavLink({ children, path, onClick, buttonStyle }: NavLinkProps) {
  return (
    <li className='min-w-max w-full px-4 flex md:px-0 md:block'>
      <Link
        className={`${
          buttonStyle
            ? 'transition-colors px-6 py-3 mt-2 w-full text-center hover:bg-[#4965cc] bg-[#607FF2] text-white text-sm rounded-xl lg:ml-3'
            : 'transition-opacity px-4 py-2 w-full rounded-xl hover:bg-slate-50 md:px-2 md:py-1 md:rounded-md md:hover:opacity-80'
        }`}
        href={path}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  )
}
