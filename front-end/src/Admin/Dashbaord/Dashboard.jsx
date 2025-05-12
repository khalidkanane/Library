import React, { useEffect, useState } from 'react'
import Blogs from '../../Pages/Blogs/Blogs'
import axios from 'axios'
import Comment from '../Comment/Comment'

const Dashboard = () => {



  const [ nb_users ,setCountU]=useState(0)
  const [ nb_books ,setCountB]=useState(0)
  const [ nb_authors ,setCountA]=useState(0)



  useEffect(() => {
      const fetchData = async (e) => {



          await axios.get(`http://127.0.0.1:8000/api/state`)
              .then((response) => {
                  if (response.status === 200) {
                      console.log((response.data.userCount))

                      setCountU(response.data.userCount)
                      setCountB(response.data.bookCount)
                      setCountA(response.data.authorCount)
                     


                  } else {


                      alert((response.data.error))
                  }
              }
              ).catch((response) => {
                  console.log(response.error)
              })


      }
      fetchData()

  }, [])




  return (
    <div className=' p-3 sm:p-5 w-full pt-2 pb-2 '>

      <div class="m-10 grid gap-5 sm:grid-cols-3 mx-auto max-w-screen-lg">
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
  <svg  class="h-14 w-14 rounded-xl bg-blue-100 p-4 text-blue-300" viewBox="0 0 24 24" id="Artwork" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.86,11.62h2v.06c0,5.91-3.44,8-4.58,8.54v1.53l.25-.08c.23-.08,5.77-2.08,5.77-10V10.2H14.13Z" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.13,10.2l.7-1.27V2.25l-1.12.87c-2.44,1.79-5,5.08-4.84,8.94a8,8,0,0,0,3.4,6.39l.1.07.75-1.22-.1-.06a6.24,6.24,0,0,1-.82-.71L14.86,15V11.62Zm-.7,1.42v2.56L11.3,15.41a6.49,6.49,0,0,1-1-3.42c-.13-3.33,2.13-5.85,3.11-6.78V8.53l-1.68,3.09h1.72" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.24,20.22a9.28,9.28,0,0,1-5.06-8.76V10.15H5.75v1.31c0,7.52,5.6,10,6.24,10.2l.24.09" />
  </svg>
    <p class="mt-4 font-medium">Author</p>
    <p class="mt-2 text-xl font-medium">
      {nb_authors}

    </p>
   
  </div>
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 rounded-xl bg-rose-50 p-4 text-rose-300" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
    </svg>
    <p class="mt-4 font-medium">Users</p>
    <p class="mt-2 text-xl font-medium"> 
      {nb_users}

    </p>
    <span class="text-xs text-gray-400"></span>
  </div>
  <div class="px-4 py-6 shadow-lg shadow-blue-100">
  <svg version="1.1" id="Layer_1"  class="h-14 w-14 rounded-xl bg-green-100 p-4 text-green-300" xmlns="http://www.w3.org/2000/svg" link="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 92 92" enable-background="new 0 0 92 92" space="preserve">
<path  fill-rule="evenodd" id="XMLID_1960_" d="M76,2H16c-2.2,0-4,1.8-4,4v80c0,2.2,1.8,4,4,4h60c2.2,0,4-1.8,4-4V6C80,3.8,78.2,2,76,2z M72,82H20V10h52
	V82z M28.5,65c0-2.2,1.8-4,4-4h27c2.2,0,4,1.8,4,4s-1.8,4-4,4h-27C30.3,69,28.5,67.2,28.5,65z M29.1,46c0-2.2,1.8-4,4-4h26.3
	c2.2,0,4,1.8,4,4s-1.8,4-4,4H33.1C30.9,50,29.1,48.2,29.1,46z M29.1,27c0-2.2,1.8-4,4-4h26.3c2.2,0,4,1.8,4,4s-1.8,4-4,4H33.1
	C30.9,31,29.1,29.2,29.1,27z"/>
</svg>
    <p class="mt-4 font-medium">Book</p>
    <p class="mt-2 text-xl font-medium">
    {nb_books}

    </p>
    <span class="text-xs text-gray-400"></span>
  </div>





<div className='w-[1000px]'>
<h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white border-l-2 border-sky-500 ps-2 ">Activity</h1>
<Comment/>
</div>

</div>
        
    </div>
  )
}

export default Dashboard