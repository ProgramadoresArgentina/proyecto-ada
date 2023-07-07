import { PostWithUserType, UsePostsStateType } from '../../interface/postTypes'
import PostAsideSuggestionsCard from './PostAsideSuggestionsCard'

export default function PostAsideSuggestions({ suggestionsPosts }: UsePostsStateType) {
  if (suggestionsPosts.length)
    return (
      <div className='flex flex-col gap-3'>
        <h2 className='font-normal text-xl'>Sugerencias para leer</h2>
        <div className='flex flex-col gap-3'>
          {suggestionsPosts.map(({ title, coverImage, id, createdBy }: PostWithUserType) => (
            <PostAsideSuggestionsCard title={title} coverImage={coverImage} createdBy={createdBy} id={id} key={id} />
          ))}
        </div>
      </div>
    )
}
