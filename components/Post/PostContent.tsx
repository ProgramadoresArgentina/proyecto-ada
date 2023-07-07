import PostContentUserInfo from './PostContentInfo'
import PostContentHeader from './PostContentHeader'
import { UsePostsStateType } from '../../interface/postTypes'
import PostContentFooter from './PostContentFooter'

export default function PostContent({ post }: UsePostsStateType) {
  const { title, content, hashtags, createdBy, createdAt, coverImage } = post

  return (
    <article className='w-full max-w-[45rem] min-h-screen flex flex-col gap-6'>
      <PostContentUserInfo createdBy={createdBy} createdAt={createdAt} />
      <div className='flex flex-col gap-6'>
        <PostContentHeader title={title} coverImage={coverImage} />
        <div className='flex flex-col gap-3'>
          <h1 className='font-semibold text-5xl tracking-tighter'>{title}</h1>
          <div className='break-words leading-8 whitespace-pre-line text-lg pt-3 text-[#555252]'>{content}</div>
          <PostContentFooter hashtags={hashtags} />
        </div>
      </div>
    </article>
  )
}
