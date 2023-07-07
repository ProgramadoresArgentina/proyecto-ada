import Link from 'next/link'
import PostUserInfoPopup from './PostUserInfoPopup'
import { useState } from 'react'
import { PostWithUserType } from '../../interface/postTypes'

export default function PostAsideSuggestionsCard({ title, coverImage, id, createdBy }: PostWithUserType) {
  const [showPopup, setShowPopup] = useState(false)
  const { avatar, name, description, username } = createdBy

  return (
    <div className='flex gap-3 '>
      <div className='w-16 h-16 min-w-[4rem] min-h-[4rem] rounded-md overflow-hidden'>
        <Link title={title} href={`/blog/${id}`}>
          <img src={coverImage} alt='Programadores Argentina' width={1000} height={1000} className='w-full h-full object-cover' />
        </Link>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex gap-1.5 items-center'>
          <Link href={`/user/${username}`} title={name} className='w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] rounded-full overflow-hidden'>
            <img src={avatar} alt='Programadores Argentina' width={1000} height={1000} className='w-full h-full object-cover' />
          </Link>
          <Link
            href={`/user/${username}`}
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
            className='text-xs tracking-wide font-thin text-[#757575] hover:underline hover:text-[#353535] relative inline-flex items-center justify-center'
          >
            {showPopup && <PostUserInfoPopup avatar={avatar} name={name} description={description} username={username} />}
            {name}
          </Link>
        </div>
        <p className='text-sm font-semibold tracking-tighter'>
          <Link href={`/blog/${id}`}>{title}</Link>
        </p>
      </div>
    </div>
  )
}
