import React, { useEffect, useState } from 'react'
import PlaceCard from '../../Component/Places/PlaceCard';
import { Spinner } from 'flowbite-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Category = () => {
    const [books, setbooks] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [count, setcount] = useState(false)
    

    const { Category } = useParams()

    console.log(Category)


    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;
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


    useEffect(() => {
        const fetchData = async (e) => {



            await axios.get(`http://127.0.0.1:8000/api/category/${Category}`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log((response.data))

                        setbooks([...response.data.books])
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
        const filtered = books.filter(item => {
            return Object.values(item).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchTerm)
            );
        });
        setFilteredData(filtered);
    };




    return (


       
            <section class="bg-white dark:bg-gray-900 h-screen-min">
                <div class="container px-6 py-5 mx-auto ">

                    <div className='flex  justify-between my-7  '>
                        <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Category : {Category}</h1>
                        <div class="relative mt-1 lg:w-96">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" /> </svg>
                            </div>
                            <input type="text" value={searchTerm} onChange={handleSearch} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:hidden-text rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:bookholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" bookholder="Search " required="" />
                        </div>
                    </div>
                 

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-2'>

                        {
                            filteredData == null ? (
                                <div  >
                                    <Spinner aria-label="Alternate spinner button example" size="xl" />
                                </div>

                            ) : (

                                records.map((item,index) => {


                                  console.log(item)


                                    return (
                                              <PlaceCard  {...item} key={index} />

                                              )}
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

export default Category