import { UserType } from './userTypes'

export interface PostType {
  id?: string
  content?: string
  coverImage?: string
  createdAt?: string
  hashtags?: string
  title?: string
  userId?: number
}

export interface PostWithUserType {
  id?: string
  content?: string
  coverImage?: string
  createdAt?: string
  createdBy?: UserType
  hashtags?: string
  title?: string
}

export interface UsePostsStateType {
  post?: PostWithUserType | undefined
  suggestionsPosts?: PostWithUserArrType | undefined
  isLoading?: boolean
  onError?: boolean
}

export type PostArrType = PostType[]
export type PostWithUserArrType = PostWithUserType[]
