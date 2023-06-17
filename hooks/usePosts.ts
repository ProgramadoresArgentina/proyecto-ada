import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import getPosts from '../services/getPosts'
import getUsers from '../services/getUsers'

import { PostArrType, PostType, PostWithUserArrType, PostWithUserType, UsePostsStateType } from '../interface/postTypes'
import { UserArrType, UserType } from '../interface/userTypes'

export const usePosts = () => {
  const router = useRouter()
  const { id } = router.query
  const [state, setState] = useState<UsePostsStateType>({
    post: undefined,
    suggestionsPosts: undefined,
    isLoading: true,
    onError: false,
  })

  // Llama a la api para traer el post mediante el id
  // y buscara la data del usuario que lo creo tambien
  const getPostAndUser = useCallback(async (id: any) => {
    try {
      const post: PostType = await getPosts(id)
      const user: UserType = await getUsers(post.userId.toString())
      delete post.userId

      return { ...post, createdBy: user }
    } catch (err) {
      console.dir(err)
      throw new Error(err)
    }
  }, [])

  // Trae posts sugeridos dependiendo de los hashtags del post actual
  const getSuggestionsPosts = useCallback(async (currentPost: any) => {
    try {
      const { hashtags, id } = currentPost
      if (!hashtags) return

      const allPosts: PostArrType = await getPosts()
      const allUsers: UserArrType = await getUsers()

      const suggestionsPosts = allPosts
        .filter((post: PostType) => post.hashtags.includes(hashtags) && post.id != id)
        .map((post: PostType) => {
          const user = allUsers.filter((user: UserType) => parseInt(user.id) == post.userId)[0]
          delete post.userId
          return { ...post, createdBy: user }
        })

      return suggestionsPosts
    } catch (err) {
      throw new Error(err)
    }
  }, [])

  // Traer el post actual cuando cambie la url
  useEffect(() => {
    if (!id) return
    setState((prev) => ({ ...prev, isLoading: true, onError: false }))
    getPostAndUser(id)
      .then((post: PostWithUserType) => {
        setState((prev) => ({ ...prev, post }))
      })
      .catch((err) => {
        setState((prev) => ({ ...prev, isLoading: false, onError: true }))
      })
  }, [getPostAndUser, router.isReady, id])

  useEffect(() => {
    if (!state.post) return
    setState((prev) => ({ ...prev, isLoading: true, onError: false }))
    getSuggestionsPosts(state.post)
      .then((suggestionsPosts: PostWithUserArrType) => {
        setState((prev) => ({ ...prev, suggestionsPosts, isLoading: false }))
      })
      .catch((err) => {
        setState((prev) => ({ ...prev, isLoading: false, onError: true }))
      })
  }, [getSuggestionsPosts, state.post])

  return state
}
