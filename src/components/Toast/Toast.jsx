import React from 'react'
import './Toast.css'

export const Toast = (props) => {
  return (
    <div className='toastBox'>
    <span className='toastMessage'>{props.toastMessage}</span>
    </div>
  )
}
