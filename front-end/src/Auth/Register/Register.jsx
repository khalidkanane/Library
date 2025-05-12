import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { Carousel } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';


// import {   selectSession } from '../../Store/authenticationSlice';





const Register = () => {




    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirme, setConfirme] = useState('');
    const [name, setName] = useState('');

    const [modal, setModal] = useState(false)

    // const dispatch = useDispatch()












    const sendRegisterRequest = async (e) => {
        e.preventDefault()




        if (confirme!=password) {
            alert('errore password')
            return ''
        }





        
        const RegisterData = new FormData();
        RegisterData.append("email", email)
        RegisterData.append("password", password)
        RegisterData.append("name", name)
       
        console.log(name)


        await axios.post("http://127.0.0.1:8000/api/register",RegisterData)
            .then((response) => {
                if (response.status === 200) {
                    console.log((response.data))


                    

                    navigate('/login');
                } else {

                    setModal(true)
                    alert((response.data.error))
                }


            })
            .catch((response) => {
                if (response.status === 202) {

                    console.log((response.data.error + " \n" + modal))

                }



            }
        )





    }




    return (
        <div class="bg-white dark:bg-gray-900">
            <div class="flex justify-center h-screen">
                <div class="hidden bg-cover  lg:block lg:w-2/3" style={{ backgroundImage: ' url(https://offloadmedia.feverup.com/secretnyc.co/wp-content/uploads/2023/08/31124140/The-Morgan-Library-1024x683.jpg)' }}>
                    <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <h2 class="text-2xl font-bold text-white sm:text-3xl">Meraki UI</h2>

                            <p class="max-w-xl mt-3 text-gray-300">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                                autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                                molestiae
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div class="flex-1">
                        <div class="text-center">
                            <div class="flex justify-center mx-auto">
                            <Link to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img src="https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.967060102.1710720000&semt=sph" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">K.Lorem</span>
        </Link>
                            </div>

                            <p class="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                        </div>

                        <div class="mt-8">
                            <form onSubmit={(e)=>sendRegisterRequest(e)} class="w-full max-w-md">


                                <div class="relative flex items-center mt-8">
                                    <span class="absolute">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>

                                    <input  onChange={(e)=>setName(e.target.value)} type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" required />
                                </div>



                                <div class="relative flex items-center mt-6">
                                    <span class="absolute">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </span>

                                    <input onChange={(e)=>setEmail(e.target.value)} type="email" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" required />
                                </div>

                                <div class="relative flex items-center mt-4">
                                    <span class="absolute">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </span>

                                    <input onChange={(e)=>setPassword(e.target.value)} type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" required />
                                </div>

                                <div class="relative flex items-center mt-4">
                                    <span class="absolute">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </span>

                                    <input onChange={(e)=>setConfirme(e.target.value)} type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" required />
                                </div>

                                <div class="mt-6">
                                    <button type='submit' class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Sign Up
                                    </button>

                                    <div class="mt-6 text-center ">

                                    </div>
                                </div>
                            </form>

                            <p class="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet?                     <Link to={'/login'} class="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                sing in
                            </Link>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Register;