import { ReactNode } from 'react'

export interface NavHamburguerProps {
  active: boolean
  onClick: VoidFunction
}

export interface NavLinkProps {
  buttonStyle?: boolean
  children: ReactNode
  onClick: VoidFunction
  path: string
}
