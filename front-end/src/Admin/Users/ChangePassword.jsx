import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const ChangePassword = () => {



    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');




    const change =async()=>{

        await axios.post('http://127.0.0.1:8000/api/changePassword',
           {
               'new_password':newPassword,
               }
           ,{
               headers: {
                   Authorization: `Bearer ${localStorage.getItem('token')}`,
               }
           }).then((response)=>{
                   toast.success(response.data.message)
           }
   
           ).catch((error)=>{
               console.log(error)
           })
   
       }




    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            toast('Passwords do not match',{
                icon :'🚨',
            })
        } else {
            setErrorMessage('');
            change()
           
        }
    };


  





    
  return (
    <div className='h-full '>
        <h1 className='text-2xl mt-4 pl-2 border-l-4 border-sky-500 font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white'>Change Password</h1>
        <div className='flex items-center h-full w-full'>
        <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800">
    <div class="px-6 py-4">
        <div class="flex justify-center mx-auto">
            <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=" "/>
        </div>

        <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

        <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Change Your Password</p>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800  rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        aria-label="New Password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="px-6 py-2 w-full text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                        Submit
                    </button>
                </div>
                {errorMessage && <p className="text-center text-red-500 mt-2">{errorMessage}</p>}
            </form>
    </div>
</div>
    </div>
    </div>
  )
}

export default ChangePassword