import React from 'react'
import HeaderComponents from '../HeaderComponents/HeaderComponents'

const Default_Components = ({children}) => {
  return (
    <div>
        <HeaderComponents/>
        {children}
    </div>
  )
}

export default Default_Components