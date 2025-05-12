import axios from 'axios'
import {  Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

import Add_User from '../../Component/Modals/Add_User'

import Show_User from '../../Component/Modals/Show_User'
import toast from 'react-hot-toast'

const Users = () => {

    const [Users, setUsers] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [count,setcount]=useState(false)
    


    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
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



            await axios.get(`http://127.0.0.1:8000/api/users`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log((response.data))
                        
                        setUsers([...response.data.users])
                        setFilteredData([...response.data.users])


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
        const filtered = Users.filter(item => {
            return Object.values(item).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchTerm)
            );
        });
        setFilteredData(filtered);
    };


    const deleteFunction=async(e)=>{

        try {
            const response = await axios.delete('http://127.0.0.1:8000/api/users/delete/'+e.target.value);
            console.log('Data deleted successfully:', response.data.message);
            toast('Data deleted successfully',{
              icon :'❌',
            })
            setcount(!count)
            
          } catch (error) {
            console.error('Error deleting data:', error);
            
          }
    
            


    }




    return (
        <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 w-full pt-2 pb-2 m-2">
          
            <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
                {/* <!-- Start coding here --> */}
                <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <form class="hidden lg:block lg:pl-2">
                <label for="topbar-search" class="sr-only">Search</label>
                <div class="relative mt-1 lg:w-96">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/> </svg>
                  </div>
                  <input type="text" value={searchTerm} onChange={handleSearch} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search by Name,Adresse,Tel,Email " required="" />
                </div>
              </form>

                        <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Add_User />
                            <div class="flex items-center space-x-3 w-full md:w-auto">


                            </div>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-4 py-3"></th>
                                    <th scope="col" class="px-4 py-3">name</th>
                                    <th scope="col" class="px-4 py-3">adresse</th>


                                    <th scope="col" class="px-4 py-3">telphone</th>
                                    <th scope="col" class="px-4 py-3">
                                        <th scope="col" class="px-4 py-3">Email</th>
                                        <span class="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    filteredData == null ? (
                                        <td  >
                                            <Spinner aria-label="Alternate spinner button example" size="xl" />
                                        </td>

                                    ) : (

                                        records.map((user) => {
                                            return (<tr key={user.id} class="border-b dark:border-gray-700">
                                                <td  class="px-4 py-3">
                                                    <div className=' w-full h-full'>
                                                    <img className='h-8 w-8 object-cover rounded-full' src={`http://127.0.0.1:8000/${user.image}`} alt='' />
                                                        
                                                    </div>
                                                </td>
                                                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                                                <td class="px-4 py-3">{user.adresse}</td>

                                                <td class="px-4 py-3">{user.tel}</td>
                                                <td class="px-4 py-3">{user.email}</td>
                                                <td class="px-4 py-3 flex items-center  ">





                <Show_User {...user}/>
                                                        


                                                            <button onClick={(e)=>deleteFunction(e)} value={user.id} type="button"   class="flex items-center  border border-red-600 p-1 rounded-md hover:bg-red-600 ms-1 text-red-500 hover:text-white">
                                                                <svg class="w-4 h-4 mr-2" viewbox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                                                                </svg>
                                                                delete
                                                            </button>



                                                </td>
                                            </tr>)
                                        })
                                    )
                                }

                            </tbody>
                        </table>
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
            </div>
        </section>




    )
}

export default Users