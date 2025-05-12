import React, { useEffect, useState } from 'react'

import axios from 'axios'
import BookCard from '../../Component/Blogs/BookCard'
import Aos from 'aos'


const TopBooks = () => {

    const [books, setbooks]=useState([])



    useEffect(() => {
        Aos.init();
        const fetchData = async (e) => {



            await axios.get(`http://127.0.0.1:8000/api/topRatedBooks`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log((response.data))

                        setbooks([...response.data.books])
                        


                    } else {


                        alert((response.data.error))
                    }
                }
                ).catch((response) => {
                    console.log(response.error)
                })


        }
        fetchData()

    }, [])






  return (
    <div className=' max-auto mt-2 px-8'>
        <div data-aos="fade-up" >
            <h1 className='my-8 border-l-8 border-sky-400 py-2 pt-2 px-1 text-3xl font-blod'>Our Top Books</h1>

        </div>
        <div data-aos='fade-up' data-aos-easing="linear"
            data-aos-duration="2500"
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
        >
            {
                books==null?(''):(
                 books.map((item,index)=>(
                    <BookCard  key={index} {...item} />
                )
        )
            )
            }
        </div>
    </div>
  )
}

export default TopBooks