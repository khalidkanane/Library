import React from 'react'

const Bannermg = ({img}) => {

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

export default Bannermg