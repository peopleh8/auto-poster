import { FC, FormEvent } from 'react'
import { FormProps } from '../../../types/common.types'
import { openai } from '../../../config/openai'
import './Form.scss'

const Form: FC<FormProps> = ({ 
  children, 
  classes, 
  subject, 
  article, 
  rewriteArticleHandler,
  fetchingArticle 
}) => {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      fetchingArticle(true)
      
      const chatCompletion = await openai.chat.completions.create({ 
        messages: [{ role: 'user', content: subject }], 
        model: 'gpt-3.5-turbo',
        temperature: 0.9,
      })
  
      if (chatCompletion?.choices[0]?.message?.content) {
        rewriteArticleHandler(chatCompletion.choices[0].message.content)
      }
    } catch (e: unknown) {
      console.error((e as Error).message)
    } finally {
      fetchingArticle(false)
    }
  }
  
  return (
    <form 
      autoComplete='off'
      className={`form ${classes}`}
      onSubmit={submitHandler}
    >
      {children}
    </form>
  )
}

export default Form