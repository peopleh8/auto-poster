import { FC } from 'react'
import Title from './components/UI/Title/Title'
import Form from './components/UI/Form/Form'
import Field from './components/UI/Field/Field'
import Button from './components/UI/Button/Button'
import PosterButtons from './components/PosterButtons'
import { ButtonType, FieldTypes } from './types/common.types'
import './App.scss'
import 'normalize.css'

const App: FC = () => {
  return (
    <div className='poster'>
      <Title leavel={1} classes='poster__title'>Auto Poster</Title>
      <Form classes='poster__form poster-form'>
        <Field 
          classes='poster-form__field'
          fieldType={FieldTypes.Input}
          name='subject' 
          type='text' 
          placeholder='Subject'
        />
        <PosterButtons>
          <Button 
            classes='poster-form__btn'
            type={ButtonType.Submit}
          >
            Generate Article
          </Button>
          <Button 
            classes='poster-form__btn'
            type={ButtonType.Button}
            disabled
          >
            Post to Facebook
          </Button>
          <Button 
            classes='poster-form__btn'
            type={ButtonType.Button}
            disabled
          >
            Post to Linked In
          </Button>
          <Button 
            classes='poster-form__btn'
            type={ButtonType.Button}
            disabled
          >
            Copy
          </Button>
        </PosterButtons>
        <Field 
          classes='poster-form__field'
          fieldType={FieldTypes.Textarea}
          name='article' 
          placeholder='Article'
        />
      </Form>
    </div>
  )
}

export default App