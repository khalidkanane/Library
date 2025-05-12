import React from 'react'

import { Avatar, Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie,  HiUser, HiViewBoards ,HiOutlineBookOpen } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { PiPencilCircleFill } from 'react-icons/pi';





const SideBare = ({session}) => {





    return (
       



    <Sidebar className='shadow-2xl me-3  bg-gray-100 h-full' aria-label="Sidebar with logo branding example">
         <Avatar img={`http://127.0.0.1:8000/${session.image}`} size="lg"   rounded statusPosition="bottom-left"/>
         <div className='text-center m-1'>
            <p className='mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400'>{session.email}</p>
         </div>

      <Sidebar.Items className='py-4 '>
   
   {
   
   session.type == 'admin' ? (
        <Sidebar.ItemGroup className='flex flex-col'>

   
          <Sidebar.Item  className='py-3 flex items-center hover:bg-sky-500 hover:text-white' icon={HiChartPie}>
           <Link to='/user'>
           Dashboard
           </Link> 
          </Sidebar.Item>
          <Sidebar.Item  className='py-3 flex items-center hover:bg-sky-500 hover:text-white' icon={HiViewBoards}>
         <Link to={'Profile'}>
          Profile
         </Link>  
          </Sidebar.Item>
          <Sidebar.Item  className='py-3 flex items-center hover:bg-sky-500 hover:text-white' icon={HiOutlineBookOpen}>
       <Link to={'Books'}>
       Books
       </Link>     
          </Sidebar.Item>
          <Sidebar.Item  className='py-3 flex items-center hover:bg-sky-500 hover:text-white' icon={HiUser}>
       <Link to={'Users'}>
        Users
       </Link>    
          </Sidebar.Item>
          <Sidebar.Item  className='py-3 flex items-center hover:bg-sky-500 hover:text-white' icon={PiPencilCircleFill}>
       <Link to={'Author'}>
        Author
       </Link>    
          </Sidebar.Item>

          <Sidebar.Item  className='py-3 flex items-center hover:bg-sky-500 hover:text-white' icon={HiArrowSmRight}>
          <Link to={'/'}>
          Home 
          </Link>  
          </Sidebar.Item>
        </Sidebar.ItemGroup>
   ):(
      <Sidebar.ItemGroup>

      <Sidebar.Item  className='py-3 flex items-center hover:bg-sky-500 hover:text-white' icon={HiViewBoards}>
     <Link to={'Profile'}>
      Profile
     </Link>  
      </Sidebar.Item>


      <Sidebar.Item  className='py-3 flex items-center hover:bg-sky-500 hover:text-white' icon={HiArrowSmRight}>
      <Link to={'/'}>
      Home 
      </Link>  
      </Sidebar.Item>
    </Sidebar.ItemGroup>
   )
}

      </Sidebar.Items>
    </Sidebar>


    )
}

export default SideBare