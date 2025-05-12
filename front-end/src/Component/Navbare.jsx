import React, { useState } from 'react'
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ResponsiveMenu from './ResponsiveMenu';
import { logout, selectSession } from '../Store/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HiLogout, HiUser } from 'react-icons/hi';




const Navbare = () => {

    const [showMenu ,setShowMenu] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

   
  

    const session = useSelector(selectSession)
   

    const handleLogout = () => {
   


  
        dispatch(logout())
        navigate('/')
        
  
  
    };

    

    const toggelMenu =()=>{
        setShowMenu(!showMenu)
    }

    return (


        <Navbar className='' fluid rounded ><Link className='hover:text-sky-800 hover:underline '>
            <Navbar.Brand >

                <Link to={'/'} className='flex justify-berween items-center ' onClick={() => window.scrollTo(0, 0)}>
                    <img src="https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.967060102.1710720000&semt=sph" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">K.Lorem</span>
                </Link>

            </Navbar.Brand>
        </Link>

            <Navbar.Collapse className=''>



                <NavLink activeClassName="active" className='hover:text-sky-800 hover:underline' to="/" onClick={() => window.scrollTo(0, 0)}>
                    Home
                </NavLink>


                <NavLink activeClassName="active" className='hover:text-sky-800 hover:underline' to={'/About'} onClick={() => window.scrollTo(0, 0)} >About as</NavLink>
                <NavLink activeClassName="active" className='hover:text-sky-800 hover:underline' to={'/Books'} onClick={() => window.scrollTo(0, 0)} >Books</NavLink>
                <NavLink activeClassName="active" className='hover:text-sky-800 hover:underline' to={'/topRatedBooks'} onClick={() => window.scrollTo(0, 0)} >Top Books</NavLink>

            </Navbar.Collapse>

        {   

        session.isAuthenticated?(
            <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={`http://127.0.0.1:8000/${session.user.image}`} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{session.name}</span>
              <span className="block truncate text-sm font-medium">{session.email}</span>
            </Dropdown.Header>
            <Dropdown.Item  icon={HiUser}><Link to={'/user/profile'}>Profile</Link> </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={()=>handleLogout()} icon={HiLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ):(

            <div className="flex   md:order-2 ">

                <Link to={"/login"} className='bg-gradient-to-r from-sky-500 to-sky-900 transition-all duration-600 hover:bg-gradient-to-r hover:bg-sky-500 hover:from-sky-900 transition-all duration-800   px-4 py-1 rounded-full text-white '>Sign in</Link>

            </div>
        )


}

        <div className=" md:hidden block">

            {showMenu ?(
                    <img src='../image/menuAlt2.png' alt='' onClick={toggelMenu}
                    className='cursor-pointer transition-all h-8' size={30} />
                ) : (
                    <img src='../image/menuAlt1.png' alt='' onClick={toggelMenu}
                    className='cursor-pointer transition-all h-8'  />
            )

            }


        </div>

            <ResponsiveMenu  showMenu={showMenu} setShowMenu={setShowMenu} />

        </Navbar>

    )
}

export default Navbare