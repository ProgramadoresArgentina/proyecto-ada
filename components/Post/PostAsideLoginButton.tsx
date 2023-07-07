import Link from 'next/link'

export default function PostAsideLoginButton() {
  return (
    <div className='text-right my-6'>
      <Link href='/' className='text-[#0665BC] tracking-wider font-normal text-base hover:opacity-75'>
        Iniciar Sesión
      </Link>
    </div>
  )
}
