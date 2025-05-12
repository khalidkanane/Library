import React from 'react'
import {  MdOutlineBeachAccess, MdOutlineCardTravel, MdOutlineLocalHotel, MdSurfing } from 'react-icons/md'

const Banner_2 = () => {

    const img = '../image/cover_4.jpg'

    const bgImage={
        backgroundImage:`url(${img})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        height:"400px"
    }

    return (
        <div data-aos="zoom-in" style={bgImage} className='h-[400px] w-full'>
   
        </div>
    )
}

export default Banner_2