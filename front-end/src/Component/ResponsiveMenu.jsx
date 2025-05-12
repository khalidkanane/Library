import React from 'react'
import { Link } from 'react-router-dom'

const NavbarLink = [
    { name: "home", link: "/" },
    { name: "about", link: "/About" },
    { name: "blogs", link: "/Blogs" },
    { name: "places", link: "/Places" }
]


const ResponsiveMenu = ({ showMenu, setMenu }) => {
    return (
        <div className={`${showMenu ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-800 drak:text-white px-8 pb-6 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}>
            <div className='Navbar_card'>
                {/* top section */}
                <div>
                    <div className='hover:text-sky-800'>
                        <div>

                            <Link to={'/'} className='flex justify-berween items-center ' onClick={() => window.scrollTo(0, 0)}>
                                <img src="https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.967060102.1710720000&semt=sph" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">K.Lorem</span>
                            </Link>

                        </div>

                    </div>
                    {/* link */}
                    <div>
                        <ul className='mt-7 space-y-4 '>
                            { 
                                NavbarLink.map(({name , link})=>(
                                   <li className='hover:bg-blue-700 hover:text-white rounded px-3 p-y-1'>
                                        <Link to={link} onClick={()=>setMenu(false)} className=' mb-5 inline-block'>{name}</Link>
                                    </li>
                                ))

                            }
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResponsiveMenu