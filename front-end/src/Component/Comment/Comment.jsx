import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { selectSession } from '../../Store/authenticationSlice';
import { useSelector } from 'react-redux';

const Comment = () => {

  const session = useSelector(selectSession)

  console.log(session.user)





    const [comments, setComments] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [count, setcount] = useState(false)
    const [content, setContent]=useState('')
  
  
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredData.slice(firstIndex, lastIndex);
    const Npage = Math.ceil(filteredData.length / recordsPerPage);
    const numbers = [...Array(Npage + 1).keys()].slice(1);
  
    function nextPage() {
      if (currentPage !== Npage) {
        setCurrentPage(currentPage + 1);
      }
    }
    function changeCurrentPage(num) {
      setCurrentPage(num);
    }
    function prevPage() {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  
  
  
  
    const { id } = useParams()
  
  
  
    useEffect(() => {
      const fetchData = async (e) => {
  
  
  
        await axios.get(`http://127.0.0.1:8000/api/Comments/${id}`)
          .then((response) => {
            if (response.status === 200) {
              console.log((response.data))
  
              setComments([...response.data.comments])
              setFilteredData([...response.data.comments])
  
  
            } else {
  
  
              alert((response.data.error))
            }
          }
          ).catch((response) => {
            console.log(response.error)
          })
  
  
      }
      fetchData()
  
    }, [count])
  
  
    const handleSearch = (e) => {
      setCurrentPage(1)
      const searchTerm = e.target.value.toLowerCase();
      setSearchTerm(searchTerm);
      const filtered = comments.filter(item => {
        return Object.values(item).some(value =>
          typeof value === 'string' && value.toLowerCase().includes(searchTerm)
        );
      });
      setFilteredData(filtered);
    };
  
  
    const deleteFunction = async (e) => {
  
      try {
        const response = await axios.delete('http://127.0.0.1:8000/api/comments/delete/' + e.target.value);
        console.log('Data deleted successfully:', response.data.message);
        setcount(!count)
  
      } catch (error) {
        console.error('Error deleting data:', error);
  
      }
  
  
  
  
    }
    


    const Add_Comment = async (e)=>{
        e.preventDefault()




        const Data = new FormData()
        Data.append('book_id',id)
        Data.append('user_id',session.user.id)
        Data.append('content',content)

     

        await axios.post("http://127.0.0.1:8000/api/Comments/add",Data)
        .then((response)=> {
            console.log(response.data.commentary)
            toast.success(response.data.message)
            setcount(!count)
            
         })
         .catch((error)=> {
            console.log(error)
        })





    }





    return (
        <>

            <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div class="max-w-2xl mx-auto px-4">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments.length})</h2>
                    </div>
{
  session.user?(
                    <form class="mb-6" onSubmit={(e)=>Add_Comment(e)}>
                        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <label for="comment" class="sr-only">Your comment</label>
                            <textarea onChange={(e)=>setContent(e.target.value)} id="comment" rows="6"
                                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..." required></textarea>
                        </div>
                        <button type="submit"
                            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Post comment
                        </button>
                    </form>
  ):(
    <p className='font-meduim'>you have to be authenticate if you want post comment ! <Link to={'/login'} className='text-blue-400 underline'> Sing in</Link> </p>
  )
}

                {
                
            records?(    
                records.map((comment)=>{
                    return(
                    <article class="p-6 text-base bg-white shadow-md mb-2 rounded-lg dark:bg-gray-900">
                        <footer class="flex justify-between items-center mb-2">
                            <div class="flex items-center">
                                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                    class="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    alt="Michael Gough"/>{comment.user.name}</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                                    title="February 8th, 2022">Feb. 8, 2022</time></p>
                            </div>

                        </footer>
                        <p className='text-gray-500 dark:text-gray-400 text-ellipsis overflow-hidden'>{comment.content}</p>
                        <div class="flex items-center mt-4 space-x-4">
                            <button type="button"
                                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                </svg>
                                
                            </button>
                        </div>
                    </article>
                    )
               
})

):(<p>No commentaries found for the specified book.</p>)




}







                    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500">
              Showing
              <span className="font-semibold text-gray-900">
                {firstIndex}-{lastIndex}
              </span>
              of
              <span className="font-semibold text-gray-900"></span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px flex-row-reverse">
              <li>
                <button onClick={nextPage} className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300  hover:text-gray-700">
                  <span className="sr-only">Next</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                  </svg>
                </button>

              </li>
              {numbers.map((number, index) => (
                <li key={index}>
                  <button onClick={() => { changeCurrentPage(number); }} className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300  hover:text-gray-700">
                    {number}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={prevPage} className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300  hover:text-gray-700">
                  <span className="sr-only">Previous</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  </svg>
                </button>
              </li>
            </ul>

          </nav>


                </div>
            </section>


        </>
    )
}

export default Comment