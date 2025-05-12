import React from 'react'
import { GiBlackBook, GiMagicLamp } from 'react-icons/gi'
import {   MdOutlineHistoryEdu, MdOutlineScience } from 'react-icons/md'

const Banner = () => {
    return (
        <div className='min-h-[550px] bg-gray-100 '>
            <div className='min-h-[550px] flex items-center gap-4 justify-center  items-center backdrop-blur-xl py-12 sm:py-0'>
                <div className='container'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
                        {/* image section */}
                        <div data>
                                <img data-aos='flip-up' className='rounded-lg  max-w-[450px] h-[350px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] object-cover'
                                     src="../image/cover.jpg" alt="" />
                        </div>
                        {/* text section */}
                        <div>
                            <h1 data-aos='fade-right' className='text-3xl font-bold sn:text-4xl'>Explore The World with Books</h1>
                            <p data-aos='fade-up' className='text-sm text-gray-500 tracking-wide leading-0 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Eaque autem repellat cupiditate tempore ipsum aspernatur at omnis possimus similique esse nisi facilis repudiandae,
                                ad tenetur beatae id, aliquid voluptatem. Reiciendis? {''}
                            </p>
                            <div data-aos="zoom-in" className='mt-1 grid grid-cols-2 gap-6'>
                                <div className='space-y-6 '>
                                    <div className='flex items-center gap-4'>
                                        <GiMagicLamp className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-red-500 dark:bg-red-200'/>
                                       <p>Fantasy novel</p>  

                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <GiBlackBook className=' h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-300 dark:bg-yellow-200'/>
                                       <p>Literature and arts</p>  
                                        
                                    </div>
                                </div>
                                <div className='space-y-4 '>
                                    <div className='flex items-center gap-4'>
                                        <MdOutlineHistoryEdu  className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-500 dark:bg-violet-200'/>
                                       <p>Histori</p>  
                                        
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <MdOutlineScience className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-sky-500 dark:bg-sky-200'/>
                                       <p>Science and Technology</p>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner