import PostAsideActions from './PostAsideActions'
import PostAsideUserInfo from './PostAsideUserInfo'
import PostAsideSuggestions from './PostAsideSuggestions'
import PostAsideLoginButton from './PostAsideLoginButton'
import { UsePostsStateType } from '../../interface/postTypes'

export default function PostAside({ post, suggestionsPosts }: UsePostsStateType) {
  const { name, username, avatar, description, linkedIn, facebook, twitter } = post.createdBy

  return (
    <aside className='w-full md:max-w-[22rem] p-6'>
      <PostAsideActions linkedIn={linkedIn} facebook={facebook} twitter={twitter} />
      <PostAsideLoginButton />
      <div className='hidden md:flex flex-col gap-4'>
        <PostAsideUserInfo name={name} username={username} avatar={avatar} description={description} />
        <PostAsideSuggestions suggestionsPosts={suggestionsPosts} />
      </div>
    </aside>
  )
}
