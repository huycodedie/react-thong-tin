import React from 'react'
import './style_login_register.css'

const Input_login_register = ({TextTable,Texttype}) => {
  return (
    <div className='form-field-login'>
      <input type={Texttype} className='form-input-login' placeholder=' ' />
      <label className='form-label-login'>
        {TextTable}
      </label>
    </div>
  )
}

export default Input_login_register