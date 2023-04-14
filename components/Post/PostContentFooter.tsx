import Link from 'next/link'
import { PostWithUserType } from '../../interface/postTypes'
import { Key } from 'react'

export default function PostContentFooter({ hashtags }: PostWithUserType) {
  return (
    <small className='text-[#757575] flex gap-3'>
      {hashtags &&
        hashtags.split(' ').map((hashtag: string, index: Key) => (
          <Link title={hashtag} href={`search/${hashtag.toString()}`} key={index}>
            #{hashtag}
          </Link>
        ))}
    </small>
  )
}
