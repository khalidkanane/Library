import { Avatar } from 'flowbite-react';
import moment from 'moment';
import React from 'react'
import {  useNavigate } from 'react-router-dom'

const BlogsCard = ({id,image,title,created_at,content,author_name,author_image}) => {

  const navigate = useNavigate();







  const handleClick = () => {
    window.scrollTo(0, 0)
    navigate(`/Books/${id}`);
  };
  

  const time = moment(created_at).fromNow()


  return (

    <div className='mb-3 shadow-md p-2 bg-white '>
    <div class="relative">
        <img class="object-cover object-center w-full h-64 rounded-lg lg:h-80 transition duration-700 hover:skew-x-0 hover:scale-110" src={`http://127.0.0.1:8000/${image}`}alt=""/>

        <div class="absolute bottom-0 flex p-3 bg-white dark:bg-gray-900 ">
            <img class="object-cover object-center w-10 h-10 rounded-full transition duration-700 hover:skew-x-2 hover:scale-110" src={`http://127.0.0.1:8000/${author_image}`} alt=""/>

            <div class="mx-4">
                <h1 class="text-sm text-gray-700 dark:text-gray-200">{author_name}</h1>
                <p  class="text-sm text-gray-500 dark:text-gray-400">{time}</p>
            </div>
        </div>
    </div>

    <h1 onClick={()=>handleClick()} class="mt-6 text-xl font-semibold text-gray-800 dark:text-white hover:underline ">
        {title}
    </h1>

    <hr class="w-32 my-6 text-blue-500"/>

    <div class="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 " dangerouslySetInnerHTML={{__html:content}}>
       
    </div>
   

</div>
  )




}

export default BlogsCard