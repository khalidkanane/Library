import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBare from '../Component/SideBare/SideBare'
import Header from '../Component/Header/Header'
import './Admin.css'
import { selectSession } from '../Store/authenticationSlice'
import { useSelector } from 'react-redux'

const Admin = () => {

  const session = useSelector(selectSession)

  console.log(session.user)




  return (
    <div className='lol h-screen '>

      <Header session={session.user}/>


      <div className='flex  h-screen  '>
        <div className=''>
          <SideBare session={session.user}/>
        </div>

        <div className='w-full custom-scrollbar'>
          <Outlet />
        </div>


      </div>
    </div>
  )
}

export default Admin