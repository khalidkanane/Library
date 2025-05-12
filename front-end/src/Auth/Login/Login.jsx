import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { Carousel } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';


import { login, selectSession } from '../../Store/authenticationSlice';
import toast from 'react-hot-toast';




import {
  selectUserEmail,
  selectUserName,
  selectUserPic,
  setActiveState,
} from "../../Store/apiGoogle";
import { auth, provider } from "../../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";





const Login = () => {




  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('')
  const [modal, setModal] = useState(false)

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const pic = useSelector(selectUserPic);

  // console.log('userName',userName)
  // console.log('userEmail',userEmail)
  // console.log('pic',pic)

  const dispatch = useDispatch()












  const sendLoginRequest = async (e) => {
    e.preventDefault();
    const loginData = new FormData();
    loginData.append("email", email)
    loginData.append("password", password)


    await axios.post("http://127.0.0.1:8000/api/login", loginData)
      .then((response) => {
        if (response.status === 200) {
          console.log((response.data))
          dispatch(login({ user: response.data.user, token: response.data.token }));




          navigate('/user');
        } else {

          setModal(true)
          toast.error(response.data.error)
        }


      })
      .catch((response) => {
        if (response.status === 202) {

          console.log((response.data.error + " \n" + modal))

        }



      })





  }









  /* Function SignIn with Google Account */

  const handelSignInGoogle = async (e) => {

    signInWithPopup(auth, provider)
    .then((data) => {

      dispatch(
        setActiveState({
          userName: data.user.displayName.split(" ")[0],
          userEmail: data.user.email,
          pic: data.user.photoURL,
        })
      );



      setEmail(data.user.email)
      setPassword(data.user.uid)
      setImage(data.user.photoURL)


    }).catch((response) => {
      if (response.status) {

        console.log((response.data.error))

      }})
    
    
    
    
    
    
    ;

    const loginData = new FormData();
    loginData.append("email", email)
    loginData.append("password", password)
    loginData.append("name", userName)
    loginData.append("image", image)





    await axios.post("http://127.0.0.1:8000/api/loginGoogle", loginData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log((response.data))
          dispatch(login({ user: response.data.user, token: response.data.token }));




          navigate('/user/profile');
        }
      }).catch((response) => {
        if (response.status === 202) {

          console.log((response.data.error))

        }



      })








  };




  return (
    <section class="flex bg-gray-50 dark:bg-gray-900">



      <div className='w-1/2  '>
        <Carousel className='h-full'>

          <img className='h-full ' src="https://culturefly.co.uk/wp-content/uploads/2021/11/fantasy-books.png" alt="" />


          <img className='h-full' src="https://miro.medium.com/v2/resize:fit:1200/1*e2erq2sTLN1C60JGqYbs7w.png" alt="" />


          <img className='h-full' src="https://www.writersdigest.com/.image/t_share/MTg3NjUxNDUyOTA1MjAzNTk5/rewards_of_writing_epic_fantasy_fiction_gr_macallister.png" alt="" />

          <img className='h-full' src="https://www.infostourismemaroc.com/uploads/images/gallery/5ebab1352c13f_visiter-jamaa-lafna-marrakech-infos-tourisme-maroc.jpg" alt="" />


          <img className='h-full' src="https://www.mifuguemiraison.com/wp-content/uploads/2019/06/medina-marrakech-maroc-900x600.jpg" alt="" />

        </Carousel>

      </div>

      <div class="flex flex-col w-1/2  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img src="https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.967060102.1710720000&semt=sph" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">K.Lorem</span>
        </Link>
        <div class="w-full border hover:border-sky-500  rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={(e) => sendLoginRequest(e)}>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" class="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Sign in</button>
            </form>
            <button className="group w-full h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
              <div
                onClick={(e) => handelSignInGoogle(e)}
                className="relative flex items-center space-x-4 justify-center "
              >
                <img
                  src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                  className="absolute left-0 w-5"
                  alt="google_logo"
                />

                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                  withGoogle
                </span>
              </div>
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <Link to={"/register"} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
            </p>


          </div>
        </div>
      </div>


    </section>
  )

}


export default Login;