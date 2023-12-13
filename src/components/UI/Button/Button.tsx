import { FC } from 'react'
import { ButtonProps } from '../../../types/common.types'
import './Button.scss'
import Loader from '../Loader/Loader'

const Button: FC<ButtonProps> = ({ classes, text, isFetching, ...props }) => {
  return (
    <button 
      className={`btn ${classes} ${isFetching ? 'fetching' : ''}`}
      {...props}
    >
      {text}
      <Loader />
    </button>
  )
}

export default Button