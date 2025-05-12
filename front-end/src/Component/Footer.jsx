import React from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Footer = () => {

  const ListLinks =[
    {titel:'Home' , link :'/'},
    {titel:'Books' , link :'/Books'},
    {titel:'Top Books' , link :'/topRatedBooks'},
    {titel:'Contact' , link :'/About'},
    {titel:'About Us' , link :'/About'},
  ]



  return (
    <div className='py-10 relative overflow-hidden'>
      <video
        autoPlay
        loop
        muted
        className='absolute right-0 top-0 overflow-hidden h-full w-full object-cover z-[-1]'
      >
        <source src='../video/footer_2.mp4' type='video/mp4' />

      </video>
      <div className='container'>
        <div className='grid  md:grid-cols-3  py-5 bg-white/80 backdrop-blur-sm rounded-t-xl  '>
          <div className='py-8 px-4'>
            <h1 className='flex items-center gap-3 text-xl sm:text-3xl font-bold text-justify sm:text-left'>
              <img src="https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.967060102.1710720000&semt=sph" alt="" srcset="" className='max-h-[60px] rounded-full ' />
              {/* logo */} K.Lorem
            </h1>

            <p className='text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              A officia suscipit veniam quidem dolorem architecto autem eum.
              Laudantium culpa mollitia libero! Eum optio esse quam sit temporibus dignissimos perspiciatis voluptates!
            </p>

            <div className='flex items-center gap-3 mt-3'>
              <FaLocationArrow />
              <p>Mirleft .Maroc Agadir</p>
            </div>

            <div className='flex items-center gap-3 mt-3'>
              <FaMobileAlt />
              <p>+212 606 606</p>
            </div>
            {/* social logo */}
            <div className='flex items-center gap-3 mt-6'>
              <a href="/">
                <FaInstagram className='text-3xl' />
              </a>
              <a href="/">
                <FaXTwitter className='text-3xl' />
              </a>
              <a href="/">
                <FaFacebook className='text-3xl' />
              </a>
              <a href="/">
                <FaLinkedin className='text-3xl' />
              </a>
            </div>
          </div>
          {/* links */}
          <div className='grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10'>
            <div>
              <div className='py-8 px-4'>
                <h1 className='text-xl font-bold text-justify sm:text-left mb-3'>Important Links</h1>
                <ul className='flex flex-col gap-3'>
                  {
                    ListLinks.map(({titel,link})=>{
                    return(  <li >
                        <Link to={link}
                        onClick={()=>{
                          window.scrollTo(0,0)
                        }}
                        className='flex  items-center gap-3 my-4 hover:text-blue-500'
                        >
                          <span>
                           <FaArrowAltCircleRight/>
                          </span>
                          <span>{titel}</span>
                        
                        </Link>
                      </li>
                    )
                    })


                  }
                </ul>
              </div>
            </div>
            {/* links 2 */}
            <div>
              <div className='py-8 px-4'>
                <h1 className='text-xl font-bold text-justify sm:text-left mb-3'>Important Links</h1>
                <ul className='flex flex-col gap-3'>
                  {
                    ListLinks.map(({titel,link})=>{
                    return(  <li >
                        <Link to={link}
                        onClick={()=>{
                          window.scrollTo(0,0)
                        }}
                        className='flex  items-center gap-3 my-4 hover:text-blue-500'
                        >

                          <span>{titel}</span>
                        
                        </Link>
                      </li>
                    )
                    })


                  }
                </ul>
              </div>
            </div>
            {/* links 3 */}
            <div>
              <div className='py-8 px-4'>
                <h1 className='text-xl font-bold text-justify sm:text-left mb-3'>Important Links</h1>
                <ul className='flex flex-col gap-3'>
                  {
                    ListLinks.map(({titel,link})=>{
                    return(  <li >
                        <Link to={link}
                        onClick={()=>{
                          window.scrollTo(0,0)
                        }}
                        className='flex  items-center gap-3 my-4 hover:text-blue-500'
                        >
                       
                          <span>{titel}</span>
                        
                        </Link>
                      </li>
                    )
                    })


                  }
                </ul>
              </div>
            </div>
          </div>
          
        </div>
        <section class="text-gray-600 body-font">
  <div class="container px-5 py-3 mx-auto flex items-center md:flex-row flex-col">
    <div class="flex flex-col md:pr-10 md:mb-0  pr-0 w-full md:w-auto md:text-left text-center">
      <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">ROOF PARTY POLAROID</h2>
      <h1 class="md:text-3xl text-2xl font-medium title-font text-gray-900">Master Cleanse Reliac Heirloom</h1>
    </div>
    <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">

    </div>
  </div>
</section>

      
    

         




      </div>

    </div>

  )
}

export default Footer