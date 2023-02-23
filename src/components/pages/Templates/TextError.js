import React from 'react'
import { object } from 'yup'

export default function TextError(props) {
  let error;
  if(typeof props.children === 'object'){
    error = props.children.value
  }else{
    error = props.children;
  }
  return (
    <span>
      <label className="error-label">
        {error}
      </label>
    </span>
  )
}
