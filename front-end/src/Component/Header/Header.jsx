import React from 'react'

import { Avatar, Dropdown } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/authenticationSlice';
import { HiLogout, HiUser } from 'react-icons/hi';


const Header = ({session}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


   const handleLogout = () => {
   


  
      dispatch(logout())
      navigate('/')
      


  };











  return (
    <div className='bg-gray-100 w-full border boredr-b-3 boder-dark shadow-md'>
        <header class="antialiased">
  <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center">
          <div class="flex justify-start items-center">
              <button id="toggleSidebar" aria-expanded="true" aria-controls="sidebar" class="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h14M1 6h14M1 11h7"/> </svg>
              </button>
              <button aria-expanded="true" aria-controls="sidebar" class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="w-[18px] h-[18px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/></svg>
                <span class="sr-only">Toggle sidebar</span>
              </button>
              <Link to={'/'} className='flex justify-berween items-center ' onClick={() => window.scrollTo(0, 0)}>
                    <img src="https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.967060102.1710720000&semt=sph" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">K.Lorem</span>
                </Link>
              <form class="hidden lg:block lg:pl-2">
                <label for="topbar-search" class="sr-only">Search</label>
                <div class="relative mt-1 lg:w-96">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/> </svg>
                  </div>
                  <input type="text" name="email" id="topbar-search" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
                </div>
              </form>
            </div>
          <div class="flex items-center lg:order-2">
 
 
              {/* <!-- Apps --> */}

              {/* <!-- Dropdown menu --> */}
              <Dropdown
          arrowIcon={false}
          inline
          label={
          <Avatar alt="User settings" img={`http://127.0.0.1:8000/${session.image}`} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{session.name}</span>
            <span className="block truncate text-sm font-medium">{session.email}</span>
          </Dropdown.Header>
          <Dropdown.Item icon={HiUser}><Link to={'/user/profile'} >Profile</Link> </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={()=>handleLogout()} icon={HiLogout}>Sign out</Dropdown.Item>
        </Dropdown>
              
          </div>
      </div>
  </nav>
</header>
    </div>
  )
}

export default Header