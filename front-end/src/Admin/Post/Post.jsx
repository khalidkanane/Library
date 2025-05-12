import axios from 'axios';
import { Avatar, Dropdown, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

const Post = () => {

  const [Books, setBooks] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [count, setcount] = useState(false)



  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);
  const Npage = Math.ceil(filteredData.length / recordsPerPage);
  const numbers = [...Array(Npage + 1).keys()].slice(1);



  const navigate = useNavigate();





  const dataToPass = {
    id: Books.id,
    image: Books.image,
    title: Books.title,
    type: Books.type,
    created_at: Books.created_at,
    content: Books.content,
    author_name: Books.author_name,
    author_image: Books.author_image
  };





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





  useEffect(() => {
    const fetchData = async (e) => {



      await axios.get(`http://127.0.0.1:8000/api/Books`)
        .then((response) => {
          if (response.status === 200) {
            console.log((response.data))

            setBooks([...response.data.books])
            setFilteredData([...response.data.books])


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
    const filtered = Books.filter(item => {
      return Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredData(filtered);
  };


  const deleteFunction = async (e) => {

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/Books/${e.target.value}`);
      toast.success(response.data.message);
      console.log(response);
  
      setcount(!count)

    } catch (error) {
      console.error('Error deleting data:', error);

    }




  }




  return (



    <section class="bg-white dark:bg-gray-900 h-screen-min m-2">
      <div class="container px-6 py-5 mx-auto ">

        <div className='flex  justify-between '>
          <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">From the Books</h1>
          <div class="relative mt-1 lg:w-96">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" /> </svg>
            </div>
            <input type="text" value={searchTerm} onChange={handleSearch} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:hidden-text rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search " required="" />
          </div>
        </div>
        <div className='flex justify-end '>
          <Link to={'/user/Books/Add'} className='bg-sky-500 hover:bg-sky-400 hover:text-white rounded-md p-2 m-2 shadow-md bg-sky-500 shadow-lg shadow-sky-500/50 '> + Add new Book </Link>
        </div>


        <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 ">

          {
            filteredData == null ? (
              <div  >
                <Spinner aria-label="Alternate spinner button example" size="xl" />
              </div>

            ) : (

              records.map((book) => {

                const handleClick = () => {
                  window.scrollTo(0, 0)
                  navigate(`/Books/${book.id}`, { state: { data: dataToPass } });
                };

                const date = moment(book.created_at);
                const formattedDate = date.format('MMMM DD YYYY');



                return (

                  <div class="lg:flex shadow-lg rounded-lg hover:shadow-sky-200">
                    <img class="object-cover w-full h-56 rounded-lg lg:w-64" src={`http://127.0.0.1:8000/Blogs/${book.image}`} alt="" />

                    <div class="flex flex-col justify-between py-6 lg:mx-6">
                      <p onClick={() => handleClick()} class="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        {book.title}
                      </p>
                      <div className='flex items-center '>

                        <Avatar img={`http://127.0.0.1:8000/${book.author_image}`} rounded />
                        <h3 className='ml-2'>by {book.author_name}</h3>
                      </div>

                      <span class="text-sm text-gray-500 dark:text-gray-300">{formattedDate}</span>

                    </div>
                    <div className='flex w-full items-end justify-end pb-2 pe-2'>
                      <Dropdown
                        dismissOnClick={false}
                        placement="left-start"
                        renderTrigger={() => <span className="cursor-pointer"><BiDotsVerticalRounded className="text-xl" /></span>}
                      >
                        <Dropdown.Item icon={FaEdit} className="flex items-center space-x-2">
                          <Link to={`update/${book.id}`} className="text-blue-500 hover:underline">edit</Link>
                        </Dropdown.Item>
                        <Dropdown.Item icon={MdOutlineDelete} className="flex items-center space-x-2">
                          <button
                            value={book.id}
                            onClick={(e)=>deleteFunction(e)}
                            className="text-red-500 hover:underline"
                          >
                            delete
                          </button>
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                  </div>
                )
              }
              )
            )
          }


        </div>

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
                <span className="">Next</span>
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
                <span className="">Previous</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                </svg>
              </button>
            </li>
          </ul>

        </nav>
      </div>
    </section>

  )
}

export default Post