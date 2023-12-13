import { ChangeEvent, FC, useState, useRef } from 'react'
import Title from './components/UI/Title/Title'
import Form from './components/UI/Form/Form'
import Field from './components/UI/Field/Field'
import Button from './components/UI/Button/Button'
import PosterButtons from './components/PosterButtons'
import { ButtonType, FieldTypes } from './types/common.types'
import { useCopyToClipboard } from './hooks/use-copy'
import './App.scss'
import 'normalize.css'

const App: FC = () => {
  const [ isArticleFetching, setArticleFetching ] = useState<boolean>(false)
  const [ subject, setSubject ] = useState<string>('')
  const [ article, setArticle ] = useState<string>('')
  const [ value, copy ] = useCopyToClipboard()

  const changeSubjectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  const changeArticleHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setArticle(e.target.value)
  }

  const rewriteArticleHandler = (article: string) => {
    setArticle(article)
  }

  const fetchingArticle = (payload: boolean) => {
    setArticleFetching(payload)
  }

  const copyHandler = () => {
    copy(article)
  }
  
  return (
    <div className='poster'>
      <Title leavel={1} classes='poster__title'>Auto Poster</Title>
      <Form 
        classes='poster__form poster-form'
        subject={subject}
        article={article}
        rewriteArticleHandler={rewriteArticleHandler}
        fetchingArticle={fetchingArticle}
      >
        <Field 
          classes='poster-form__field'
          fieldType={FieldTypes.Input}
          name='subject' 
          type='text' 
          placeholder='Subject'
          value={subject}
          onChange={changeSubjectHandler}
        />
        <PosterButtons>
          <Button 
            classes='poster-form__btn'
            text='Generate Article'
            isFetching={isArticleFetching}
            type={ButtonType.Submit}
            disabled={subject.length < 5}
          />
          <Button 
            classes='poster-form__btn'
            text='Post to Facebook'
            type={ButtonType.Button}
            disabled={article.length < 10}
          />
          <Button 
            classes='poster-form__btn'
            text='Post to Linked In'
            type={ButtonType.Button}
            disabled
          />
          <Button 
            classes='poster-form__btn'
            text='Copy'
            type={ButtonType.Button}
            disabled={article.length < 10}
            onClick={copyHandler}
          />
        </PosterButtons>
        <Field
          classes='poster-form__field'
          fieldType={FieldTypes.Textarea}
          copyValue={value}
          name='article' 
          placeholder='Article'
          value={article}
          onChange={changeArticleHandler}
        />
      </Form>
    </div>
  )
}

export default App