import axios from 'axios'
import { Button, Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import ReactQuill from 'react-quill'

const Update_Author = ({id,name,daye_death,birthday,image,content}) => {

    const [editorHtml, setEditorHtml] = useState(content);

    const [openModal, setOpenModal] = useState(false)

    const [state,setState]=useState({
        name:name,
        daye_death:daye_death,
        birthday:birthday,
        image:image,

        


    })


    const handleChange = (html) => {
        setEditorHtml(html);
      };


    const handeler =(e)=>{

        const {value,name} = e.target


        setState({...state,[name]:value})

    }

    const handleImageChange = (event) => {
        setState({...state,['image']:event.target.files[0]});
    };

    


    // useEffect(()=>{

    //     const fetch =async()=>{


    //         await axios.get(`http://127.0.0.1:8000/api/Authors/${state.id}`)
    //         .then((response)=>{
    //                 setState(response.data.author)
    //         }).catch((error)=>{
    //             console.log(error)
    //         })
    //     }

    //     fetch()



    // }
    
    
    // ,[])


const Update_Author = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", state.name);
  formData.append("daye_death", state.daye_death);
  formData.append("birthday", state.birthday);
  formData.append("image", state.image);
  formData.append("content",editorHtml);

  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/Authors/update/${id}`,
      formData,
    );

    console.log(response.data.author);
    alert(response.data.message)
    setOpenModal(false)


    // Dispatch any action if needed
  } catch (error) {
    console.log(error);
  }
};









  return (
<>
<button onClick={() => setOpenModal(true)}  type='button' class="flex items-center  border border-green-600 p-1 rounded-md hover:bg-green-600 ms-1 text-green-500 hover:text-white">
                                                                <FaEdit />
                                                                Edit
</button>
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add New Author</Modal.Header>
        <Modal.Body>

        {/* <!-- Modal content --> */}


            {/* <!-- Modal body --> */}
            <form  onSubmit={(e)=>Update_Author(e)}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div className='grid col-start-1 col-end-3'>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input onChange={(e)=>handeler(e)}  type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={name}  required="" />
                    </div>
                    <div>
                        <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">date of birth</label>
                        <input onChange={(e)=>handeler(e)}  type="date" name="birthday" id="birthday" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={state.birthday} required="" />
                    </div>
                    <div>
                        <label for="daye_death" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">date of death</label>
                        <input onChange={(e)=>handeler(e)}  type="date" name="daye_death" id="daye_death" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={state.daye_death} required="" />
                    </div>

                    <div class="sm:col-span-2">
                        <label for="adresse" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>

                        <ReactQuill
                theme="snow"
                value={editorHtml}
                onChange={handleChange}
                modules={{
                  toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' },
                    { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image', 'video'],
                    ['clean']
                  ],
                }}
              />

                        
                    
                    </div>
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
                            <input onChange={(e)=>handleImageChange(e)}  name='image' id="dropzone-file" type="file" class="hidden" />
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

export default Update_Author