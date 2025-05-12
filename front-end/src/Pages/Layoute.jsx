import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbare from '../Component/Navbare'
import Footer from '../Component/Footer'

const Layoute = () => {
  return (
    <div className=''>

    <Navbare/>
        <Outlet/>
    <Footer />


    </div>
  )
}

export default Layoute