import { FC } from 'react'
import { ButtonProps } from '../../../types/common.types'
import Loader from '../Loader/Loader'
import './Button.scss'
import copy from '../../../assets/icons/copy.svg'

const Button: FC<ButtonProps> = ({ classes, text, isFetching, icon, ...props }) => {
  return (
    <button 
      className={`btn ${classes} ${isFetching ? 'fetching' : ''}`}
      {...props}
    >
      { icon ? <img src={copy} alt="" /> : text }
      <Loader />
    </button>
  )
}

export default Button