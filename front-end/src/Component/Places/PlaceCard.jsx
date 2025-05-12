import moment from 'moment';
import React from 'react'

import { LuFileType } from 'react-icons/lu';
import {  Link, useNavigate } from 'react-router-dom/dist'

const PlaceCard = ({id,image,title,category,created_at,content}) => {


  const navigate = useNavigate();


  const date = moment(created_at);
  created_at= date.format('MMMM DD YYYY');




  // console.log(dataToPass)

  const handleClick = () => {
    window.scrollTo(0, 0)
    navigate(`/Books/${id}`);
  };




  return (
    <div className='shadow-lg transition-all rounded-lg duration-500 hover:shadow-xl hover:shadow-sky-300 '>

      <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <div className='overflow-hidden'>
          <img src={`http://127.0.0.1:8000/${image}`} alt="" className='max-auto h-[200px]  w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110' />

        </div>
        <div class="p-6 bg-transparent  sm:relative sm:h-[260px] ">
          <Link to={`/Books/Category/${category}`} class="title-font text-lg font-medium text-gray-900 mb-3">{category}</Link>
          <div className='flex'>
          <LuFileType />
            <span class="px-2 tracking-widest text-xs title-font font-medium text-gray-600 mb-1">{title}</span>
          </div>

          <div dangerouslySetInnerHTML={{ __html:content  }}  class="leading-relaxed mb-3 line-clamp-3"></div>
          <div class=" sm:absolute inset-x-2 bottom-0 mt-2   bg-gray-50 ">
            <div className='flex items-center flex-wrap border-t-2 py-2 '>
            <button onClick={()=>handleClick()} class="text-sky-400 hover:text-sky-600 inline-flex items-center md:mb-2 lg:mb-0">Learn More

              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
              
            </button>
            <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <img src='../image/horloge-murale.png' class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" alt='' />

              {created_at}
            </span>
</div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceCard


