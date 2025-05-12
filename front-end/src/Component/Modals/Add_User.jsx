import axios from 'axios'
import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Add_User = () => {

    const [openModal, setOpenModal] = useState(false)

    const [state,setState]=useState({
        name:"looo",
        tel:'',
        email:"",
        type:'',
        image:null,
        adresse:""
        


    })


    const handeler =(e)=>{

        const {value,name} = e.target


        setState({...state,[name]:value})

    }

    const handleImageChange = (event) => {
        setState({...state,['image']:event.target.files[0]});
    };

    


    const AddUser =async(e)=>{
        e.preventDefault()
        const User = new FormData()
            User.append("name",state.name)
            User.append("tel",state.tel)
            User.append("adresse",state.adresse)
            User.append("email",state.email)
            User.append("type",state.type)
            User.append('image',state.image)



        await axios.post("http://127.0.0.1:8000/api/users/add",User,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
        .then((response)=> {
            console.log(response.data.user)
            toast.success('new user has add')
            setOpenModal(false)

            
         })
         .catch((error)=> {
            console.log(error)
        })

     

    }











  return (
<>
    <button onClick={() => setOpenModal(true)} type="button" class="flex items-center justify-center  bg-sky-500 hover:bg-sky-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">

    +  Add User
  </button>
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add New User</Modal.Header>
        <Modal.Body>

        {/* <!-- Modal content --> */}


            {/* <!-- Modal body --> */}
            <form  onSubmit={(e)=>AddUser(e)}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input onChange={(e)=>handeler(e)}  type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="User name" required />
                    </div>
                    <div><label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type authorisation</label><select onChange={(e)=>handeler(e)} name='type'  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"><option value="admin">Admin</option><option  value="user">User</option></select></div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input onChange={(e)=>handeler(e)}  type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="User@email.com" required />
                    </div>
                    <div>
                        <label for="tel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tel</label>
                        <input onChange={(e)=>handeler(e)}  type="text" name="tel" id="tel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="060-060-06" required />
                    </div>

                    <div class="sm:col-span-2"><label for="adresse" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label><input onChange={(e)=>handeler(e)}  name="adresse" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product Adresse here"></input></div>
                </div>
                <div class="mb-4">
                    <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</span>
                    <div class="flex justify-center items-center w-full">
                        <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div class="flex flex-col justify-center items-center pt-5 pb-6">
                                <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span class="font-semibold">Click to upload</span>
                                    or drag and drop
                                </p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input onChange={(e)=>handleImageChange(e)} name='image' id="dropzone-file" type="file" class="hidden" />
                        </label>
                    </div>
                </div>
                <button className='bg-sky-700 hover:bg-sky-800 text-white w-full h-full rounded-md' type="submit">Add</button>

            </form>

        </Modal.Body>
        <Modal.Footer>
          
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Discard
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add_User