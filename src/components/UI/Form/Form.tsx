import { FC, FormEvent } from 'react'
import { FormProps } from '../../../types/common.types'
import './Form.scss'

const Form: FC<FormProps> = ({ children, classes }) => {
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/completions';

  const prompt = 'Згенеруйте для мене нову статтю на тему погода';
  
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Запит до API OpenAI
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "gpt-3.5-turbo-0301",
        max_tokens: 200, // Максимальна кількість токенів у відповіді
      }),
    })
      .then(response => response.json())
      .then(data => {
        // const generatedText = data.choices[0].text;
        console.log(data);
        // Далі ви можете вставити згенерований текст на ваш веб-сайт або використовувати його як вам зручно
      })
      .catch(error => console.error('Помилка під час запиту до API:', error));
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