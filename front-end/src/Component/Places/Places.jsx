import React, { useEffect, useState } from 'react'
import PlaceCard from './PlaceCard'
import axios from 'axios'

const Places = () => {

    const [books,setBooks]=useState([])



    useEffect(() => {
        const fetchData = async (e) => {



            await axios.get(`http://127.0.0.1:8000/api/best_books`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log((response.data))

                        setBooks([...response.data.books])
                        


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
    <div className='bg-gray-50 py-10'>
        <div data-aos="fade-up" className='mx-auto px-8'>
            <h1 className='my-8 border-l-8 border-sky-400 py-2 pt-2 px-1 text-3xl font-blod'>
                Best Books To Read
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {

                    books.map((item,index)=>{
                        
                        return <PlaceCard  {...item} key={index} />
                    })
                }
            </div>
        </div>

    </div>
  )
}

export default Places