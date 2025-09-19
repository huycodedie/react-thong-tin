import React from 'react'
import './style.css'

const Input_pages = ({TextTable , valuaInput, handOnchaneValue}) => {
  return (
    <div className='form-field'>
      <input className='form-input' placeholder=' ' type="text" value={valuaInput} onChange={handOnchaneValue}/>
      <label className='form-label'>
        {TextTable}
      </label>
    </div>
  )
}

export default Input_pages