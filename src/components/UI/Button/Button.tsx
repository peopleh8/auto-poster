import { FC } from 'react'
import './Button.scss'
import { ButtonProps } from '../../../types/common.types'

const Button: FC<ButtonProps> = ({ classes, children, ...props }) => {
  return (
    <button 
      className={`btn ${classes}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button