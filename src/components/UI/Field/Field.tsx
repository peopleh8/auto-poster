import { FC } from 'react'
import './Field.scss'
import { FieldProps, FieldTypes } from '../../../types/common.types'

const Field: FC<FieldProps> = ({ classes, fieldType, ...props }) => {
  return (
    <div className={`field ${classes}`}>
      { fieldType === FieldTypes.Input ? (
        <input 
          className='inp' 
          {...props}
        />
      ) : (
        <textarea
          className='area'
          {...props}
        />
      ) }
    </div>
  )
}

export default Field