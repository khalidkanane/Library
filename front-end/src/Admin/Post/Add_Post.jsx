import axios from 'axios';
import {  Button, Label } from 'flowbite-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { GiStarSattelites } from 'react-icons/gi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's Snow theme CSS


const Add_P = () => {
  const [editorHtml, setEditorHtml] = useState('');


  const [state,setState]=useState({
    title:"",
    category:'',
    image:null,
    author_name :'',
    pdf:null,
    date_public:''
    


})


const handeler =(e)=>{

    const {value,name} = e.target

   

    setState({...state,[name]:value})

}

const handleImageChange = (event) => {
    setState({...state,['image']:event.target.files[0]});
};

const handlePdfChange = (event) => {
  setState({...state,['pdf']:event.target.files[0]});
};










const AddPost =async(e)=>{
    e.preventDefault()

    console.log(state)



    const Books = new FormData()
        Books.append("title",state.title)
        Books.append("content",editorHtml)
        Books.append("author_name",state.author_name)
        Books.append("category",state.category)
        Books.append('image',state.image)
        Books.append("pdf",state.pdf)
        Books.append("date_public",state.date_public)



    await axios.post("http://127.0.0.1:8000/api/Books/add",Books,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    )
    .then((response)=> {
        console.log(response.data.book)
        toast.success('New Book Successfully  !')
        
     })
     .catch((error)=> {
        console.log(error)
    })

 

}







  const handleChange = (html) => {
    setEditorHtml(html);
  };



  const generateTextFromGemini = async () => {
    try {
      const response = await axios({
        url :'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBvuUf8mcsbwH337YnQE3SFwx_Ery_RuUw' ,
        method : 'post',
        data :{
          contents:[
            { 
              parts : [ { text:editorHtml } ] 
            }
        ]
        }

      })
    
      const generatedText = response.data.candidates[0].content.parts[0].text;
      const text = generatedText
      setEditorHtml(generatedText);
    } catch (error) {
      // Log the error details for better debugging
      console.error('Error fetching from Gemini:', error.response ? error.response.data : error.message);
    }
  };






  return (
    <div>


      <div class=" py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-screen-2xl  px-4 md:px-8 ">
          {/* <!-- text - start --> */}
          <div class=" flex justify-center mb-10 md:mb-16">
            <h2 class="mb-4 w-96 text-center text-2xl font-serif text-gray-800 md:mb-6 lg:text-3xl border-t-4 border-sky-500">New Book</h2>
          </div>
          {/* <!-- text - end --> */}

          {/* <!-- form - start --> */}
          <form onSubmit={(e)=>AddPost(e)} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2  ">



            <div class="sm:col-span-2">
              <label for="title" class="mb-2 font-serif inline-block text-sm text-gray-800 sm:text-base">Titel</label>
              <input onChange={(e)=>handeler(e)} name="title" type='text' class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-300 transition duration-100 focus:ring" />
            </div>

            <div class="sm:col-span-2">
              <label for="author_name" class="mb-2 font-serif inline-block text-sm text-gray-800 sm:text-base">Author name</label>
              <input onChange={(e)=>handeler(e)} name="author_name" type='text' class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-300 transition duration-100 focus:ring" />
            </div>

            <div class="sm:col-span-2">
              <label for="title" class="mb-2 font-serif inline-block text-sm text-gray-800 sm:text-base">Category</label>
              <select onChange={(e)=>handeler(e)} name='category'  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"><option value="Derama">Derama</option><option  value="Action">Action</option><option  value="fantasy">fantasy</option><option  value="Romance">Romance</option></select>
              <label for="title" class="mb-2 mt-2 font-serif inline-block text-sm text-gray-800 sm:text-base">date of publication</label>
              <input type="date" name="date_public" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e)=>handeler(e)}  />
            </div>

  <div class=" sm:col-span-2">
<div className='flex w-full items-center mb-2 '>
              <label for="subject" class="mb-2 font-serif inline-block text-sm text-gray-800 sm:text-base">Content</label>
<div className='flex w-full justify-end'>
      <Button gradientDuoTone="purpleToBlue" size="md"  type='button' onClick={()=>generateTextFromGemini()} pill>
      <GiStarSattelites className='mr-1'/>   Generate Text
      </Button>
</div>
</div>
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

                className='font-mono'
              />



            </div>
<div class="sm:col-span-2 mt-4">              
<label for="subject" class="mb-2 mt-7 font-serif inline-block text-sm text-gray-800 sm:text-base">Select The file</label>
<input onChange={(e)=>handlePdfChange(e)} name='pdf' class="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="small_size" type="file"    accept="application/pdf"
          required/>
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
        <input type='file' onChange={(e)=>handleImageChange(e)} id="dropzone-file" className="hidden" />
      </Label>
    </div>

</div>
            <div class="flex items-center justify-between sm:col-span-2">
              <button type='submit' class="inline-block rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-serif text-white outline-none ring-sky-300 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base">Send</button>
            </div>

          </form>
          {/* <!-- form - end --> */}
        </div>
      </div>


    </div>
  )

}

export default Add_P