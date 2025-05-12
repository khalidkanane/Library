import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { editUser, logout, selectSession } from '../../Store/authenticationSlice'
import { useDispatch, useSelector } from 'react-redux'
import {  Label } from 'flowbite-react'
import axios from 'axios'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';



const Profile = () => {

  const session = useSelector(selectSession)
  const dispatch = useDispatch();
  const navigate = useNavigate()



  const handleLogout = () => {
   


  
    dispatch(logout())
    navigate('/')
    


};


  const [state,setState]=useState({
    name:session.user.name,
    image:session.user.image,
    tel :session.user.tel,
    adresse:session.user.adresse
    


})


const Update_user = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", state.name);
  formData.append("tel", state.tel);
  formData.append("adresse", state.adresse);
  formData.append("image", state.image);
   console.log(session.user.id)
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/users/update/${session.user.id}`,
      formData,
    );

    console.log(response.data.user);
    // console.log(formData);
    dispatch(editUser({ user: response.data.user}))

    // Dispatch any action if needed
  } catch (error) {
    console.log(error);
  }
};



const DeleteAccount =async()=>{

 
    
 
  




  await axios.delete('http://127.0.0.1:8000/api/DeleteAccount', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })
    .then((response)=>{
      if (response.status==200) {
        console.log(response.data.message)
        navigate('/')
        handleLogout()
      } else {
        toast.success(response.data.message)
      }
        
    }
    )
    .catch( (error)=>{
    console.error('Error deleting data:', error);
    
  })

}





const handeler =(e)=>{

    const {value,name} = e.target


    setState({...state,[name]:value})

}

const handleImageChange = (event) => {
    setState({...state,['image']:event.target.files[0]});
};




  


  return (
    <div>
    <div className="px-4 mx-2 my-2 shadow-md">
    <div className="relative h-96 rounded-b flex justify-center">
      <img
        src="https://picsum.photos/id/1018/3000"
        className="object-cover w-full h-full rounded-b"
        alt="cover"
      />
      <div className="absolute -bottom-6">

        <img
          src={`http://127.0.0.1:8000/${session.user.image}`}
          className="object-cover border-4 border-white w-40 h-40 rounded-full relative"
          alt=''
          
        />
        
      </div>
    </div>
    <div className="text-center mt-6 text-3xl font-bold text-fBlack">
      {session.user.name}
    </div>
  </div>

  <div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    {/* <!-- text - start --> */}

    {/* <!-- text - end --> */}

    {/* <!-- form - start --> */}
    <form onSubmit={(e)=>Update_user(e)} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
      <div>
        <label for="name" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">name</label>
        <input onChange={(e)=>handeler(e)} name="name" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-300 transition duration-100 focus:ring" placeholder={session.user.name} />
      </div>

      <div>
        <label for="tel" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Phone Number</label>
        <input onChange={(e)=>handeler(e)} name="tel"   class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-300 transition duration-100 focus:ring" placeholder={session.user.tel} />
      </div>

      <div class="sm:col-span-2">
        <label for="adresse" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Adresse</label>
        <input onChange={(e)=>handeler(e)} name="adresse" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-300 transition duration-100 focus:ring" placeholder={session.user.adresse} />
      </div>

      <div class="sm:col-span-2">
        <label for="email" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
        <input onChange={(e)=>handeler(e)} name="email" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-300 transition duration-100 focus:ring" disabled placeholder={session.user.email} />
      </div>



      <div class="sm:col-span-2">
              <label for="subject" class="mb-2 font-serif inline-block text-sm text-gray-800 sm:text-base">Image</label>
            <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input onChange={(e)=>handleImageChange(e)} name='image' type='file' id="dropzone-file" className="hidden" />
      </Label>
    </div>

       </div>

      <div class="flex items-center justify-between sm:col-span-2">
        <button type='submit' class="inline-block rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-300 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base shadow-lg shadow-sky-500/50">Edit</button>
        <Link to={'/user/changePassword'} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base shadow-lg shadow-indigo-500/50">Change Password</Link>

      
      </div>

     
    </form>
    <div className='flex w-full  justify-center py-5'>
    <button type="button" onClick={()=>DeleteAccount()} class="inline-block rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-red-300 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-700 md:text-base shadow-lg shadow-red-500/50">Delete account !</button>
    </div>
  </div>
</div>



</div>
    
  )
}

export default Profile