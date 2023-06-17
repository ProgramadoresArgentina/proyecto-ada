import { NextPage } from 'next'
import PostAside from '../../components/Post/PostAside'
import PostContent from '../../components/Post/PostContent'

import { UsePostsStateType } from '../../interface/postTypes'
import { usePosts } from '../../hooks/usePosts'

import Spinner from '../../components/Spinner'

const Post: NextPage = () => {
  const { post, suggestionsPosts, isLoading, onError }: UsePostsStateType = usePosts()

  if (isLoading)
    return (
      <div className='full-screen-center-container'>
        <Spinner />
      </div>
    )

  if (onError)
    return (
      <div className='full-screen-center-container animate-fadeIn'>
        <h1 className='text-6xl font-extrabold text-indigo-500'>ERROR 404 🤕</h1>
      </div>
    )

  return (
    <section className='animate-fadeIn relative z-20 w-full min-h-[80vh] flex flex-col-reverse md:flex-row items-start justify-evenly px-4 gap-8 max-w-[80rem] m-auto font-manrope text-[#151515]'>
      <PostContent post={post} />
      <PostAside post={post} suggestionsPosts={suggestionsPosts} />
    </section>
  )
}

export default Post
