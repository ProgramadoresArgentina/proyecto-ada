import Link from 'next/link'
import { UserType } from '../../interface/userTypes'

export default function PostAsideUserInfo({ name, username, avatar, description }: UserType) {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-3 w-max'>
        <Link
          href={`/user/${username}`}
          title={name}
          className='w-16 h-16 min-w-[4rem] min-h-[4rem] rounded-full shadow-[0_4px_4px_#0002] flex items-center justify-center overflow-hidden object-cover'
        >
          <img src={avatar} alt='Programadores Argentina' width={1000} height={1000} className='w-[110%] h-[120%] object-cover' />
        </Link>
        <div className='flex flex-col'>
          <Link href={`/user/${username}`} title={name} className='text-xl tracking-wide leading-6 font-medium'>
            {name}
          </Link>
          <Link
            href={`/user/${username}`}
            title={`@${username}`}
            className='text-xs tracking-wide font-thin text-[#757575] hover:text-[#151515]'
          >
            {`@${username}`}
          </Link>
        </div>
      </div>
      <p className='text-sm tracking-wide font-thin text-[#757575]'>{description}</p>
    </div>
  )
}
