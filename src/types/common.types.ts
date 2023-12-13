import { ReactElement, ReactNode } from 'react'

export type ChildType = ReactNode | ReactElement

export interface ChildProps {
  children: ChildType
}

export enum FieldTypes {
  Input = 'input',
  Textarea = 'textarea'
}

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

export interface TitleProps {
  children: ChildType
  leavel: number
  classes: string
}

export interface FormProps {
  children: ChildType
  classes: string
  subject: string
  article: string
  rewriteArticleHandler: (article: string) => void
  fetchingArticle: (payload: boolean) => void
}

export interface FieldProps {
  [key: string]: any
}

export interface ButtonProps {
  [key: string]: any
}