import Link from 'next/link'
import { PostWithUserType } from '../../interface/postTypes'

export default function PostContentInfo({ createdAt, createdBy }: PostWithUserType) {
  const { avatar, name, username } = createdBy

  return (
    <div>
      <div className='flex items-center gap-3 w-max'>
        <Link
          href={`/user/${username}`}
          title={name}
          className='w-12 min-w-[3rem] aspect-square rounded-full shadow-[0_4px_4px_#0002] flex items-center justify-center overflow-hidden object-cover'
        >
          <img src={avatar} alt='Programadores Argentina' width={1000} height={1000} className='w-[110%] h-[120%] object-cover' />
        </Link>
        <div className='flex flex-col'>
          <Link href={`/user/${username}`} title={name} className='text-base tracking-wide leading-6 font-medium'>
            {name}
          </Link>
          <div className='flex gap-2 text-xs tracking-wide font-thin cursor-default text-[#AAAAAA]'>
            <span title={createdAt}>{createdAt.split('T')[0]}</span>
            <span>&middot;</span>
            <span title='5 min read'>5 min read</span>
          </div>
        </div>
      </div>
    </div>
  )
}
