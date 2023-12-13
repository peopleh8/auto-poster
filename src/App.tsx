import { ChangeEvent, FC, useState } from 'react'
import Title from './components/UI/Title/Title'
import Form from './components/UI/Form/Form'
import Field from './components/UI/Field/Field'
import Button from './components/UI/Button/Button'
import PosterButtons from './components/PosterButtons'
import Modal from './components/UI/Modal/Modal'
import { ButtonType, FieldTypes } from './types/common.types'
import { useCopyToClipboard } from './hooks/use-copy'
import { FBAxios } from './config/axios'
import 'normalize.css'
import './styles/pages/App.scss'

const App: FC = () => {
  const [ isModalOpen, setModalOpen ] = useState<boolean>(false)
  const [ modalTitleText, setModalTitleText ] = useState<string>('')
  const [ isArticleFetching, setArticleFetching ] = useState<boolean>(false)
  const [ isArticlePostingToFB, setArticlePostingToFB ] = useState<boolean>(false)
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

  const postingArticleToFB = (payload: boolean) => {
    setArticlePostingToFB(payload)
  }

  const toggleModalOpen = (payload: boolean) => {
    setModalOpen(payload)
  }

  const setModalTextHander = (title: string) => {
    setModalTitleText(title)
  }

  const copyHandler = () => {
    copy(article)
    setModalTitleText('The text has been copied!')
    toggleModalOpen(true)
  }

  const postToFB = async () => {
    try {
      postingArticleToFB(true)
      await FBAxios.post(`/feed?message=${article}`)

      setModalTitleText('Article has been sent!')
      toggleModalOpen(true)
    } catch (e: unknown) {
      console.error((e as Error).message)

      setModalTitleText('Something went wrong, please try again!')
      toggleModalOpen(true)
    } finally {
      postingArticleToFB(false)
    }
  }
  
  return (
    <div className='poster'>
      <Title leavel={1} classes='poster__title'>Auto Poster</Title>
      <Form 
        classes='poster__form poster-form'
        subject={subject}
        rewriteArticleHandler={rewriteArticleHandler}
        fetchingArticle={fetchingArticle}
        setModalTextHander={setModalTextHander}
        toggleModalOpen={toggleModalOpen}
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
            isFetching={isArticlePostingToFB}
            type={ButtonType.Button}
            disabled={article.length < 10}
            onClick={postToFB}
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
            icon
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
      <Modal
        isOpen={isModalOpen}
        setOpen={toggleModalOpen}
      >
        <Title leavel={1} classes='modal__title'>{modalTitleText}</Title>
        <Button 
          classes='modal__btn'
          text='Close'
          type={ButtonType.Button}
          onClick={() => toggleModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default App