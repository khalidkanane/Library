import React, { useEffect, useState } from 'react'
import { Link,  useParams } from 'react-router-dom'
import Testiomontial from '../../Component/Testiomontial/Testiomontial';
import axios from 'axios';
import moment from 'moment';
import BlogComp from '../../Component/Blogs/BlogComp';
import { FaDownload } from 'react-icons/fa';
import Comment from '../../Component/Comment/Comment';
import RatingComponent from '../../Component/RatingComponent/RatingComponent';
import Aos from 'aos';


const BlogDetails = () => {

    const [data, setData] = useState({
        created_at:""
    });

    // const location = useLocation();
    // console.log(location, 'useLocation')


    const handleDownload = () => {

        // const pdfUrl = `http://127.0.0.1:8000/${data.pdf}`;
   
        // const link = document.createElement('a');
        // link.href = pdfUrl;
        // link.download =' data.pdf.name'; // Set the file name for the downloaded file
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);



        const link = document.createElement('a');
        link.href = `http://127.0.0.1:8000/${data.pdf}`;
        link.setAttribute('download', data.pdf);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      };
   

   

    const { id } = useParams()

    


    useEffect(() => {
      Aos.init();
        const fetchData = async () => {
    
          const response = await axios.get(`http://127.0.0.1:8000/api/Books/${id}`);
          setData(response.data.book[0]);
          console.log(response.data.book[0])

        
    
    
        }
        fetchData();
      }, [id]);


    //   const date = moment(data.date_public);
    //   data.date_public= date.format('MMMM DD YYYY');
    
    return (

     
        <div  className=' '>
            {
                  
                  
            
            
            
            data==null?(""):(   

              


            <div className=' min-h-[550px]  '>
              <section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">Book NAME</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{data.title}</h1>
        <div class="flex mb-4">
          <a class="flex-grow text-blue-500 border-b-2 border-blue-500 py-2 text-lg px-1">Description</a>
        </div>
        <div class="leading-relaxed mb-4 line-clamp-6" dangerouslySetInnerHTML={{ __html:data.content  }} >

        </div>
        <div class="flex border-t border-gray-200 py-2">
    <div className='flex '>
        <img class="object-cover object-center w-8 h-8 rounded-full ms-1 " src={`http://127.0.0.1:8000/${data.author_image}`} alt=""/>
        <Link to={`/Authors/${data.author_id}`} class="flex items-center ml-auto ms-2 text-gray-900 hover:underline">by {data.author_name}  </Link>
    </div>      
        
        </div>
        <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500">Category :</span>
          <span class="ml-auto px-3 text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100/60">{data.category}</span>
        </div>
        <div class="flex border-t border-b mb-6 border-gray-200 py-2">
          <span class="text-gray-500">date of publication :</span>
          <span class="ml-auto text-gray-900">{data.date_public}</span>
        </div>
        <div class="flex">
          <span class="title-font font-medium text-2xl text-gray-900">Download</span>
          <button onClick={()=>handleDownload()} class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"><FaDownload /></button>
          <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div data-aos="fade-up"  data-aos-duration="7000" className='lg:w-1/2 lg:h-[550px] w-full lg:h-auto  shadow-lg'>
      <img alt="" class="h-5/6 object-cover object-center rounded w-full" src={`http://127.0.0.1:8000/${data.image}`}/>
      <div className='lg:flex iw-full items-center justify-center  pt-5 '>
       <RatingComponent bookId={data.id} />
      </div>
      </div>
    </div>
  </div>
</section>
                <div className='container' dangerouslySetInnerHTML={{ __html:data.content  }} >

</div>
                

            </div>
            )}

<Comment />
<div className='min-h-[650px] pt-20 bg-gray-100 pb-2'>
<BlogComp/>
</div>
<Testiomontial/>
        </div>
    )
}

export default BlogDetails