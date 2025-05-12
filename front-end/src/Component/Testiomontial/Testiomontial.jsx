import React from 'react'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testiomontial = () => {

  const TesData = ['https://cdn.pixabay.com/photo/2022/08/18/14/28/chefchaouen-7395031_1280.jpg',
    'https://media.istockphoto.com/id/1463115424/photo/colorful-spices-and-dyes-found-at-souk-market-in-marrakesh-morocco.jpg?s=1024x1024&w=is&k=20&c=UIMOdKG-iB0ov5_cgsoUz1HhNOSlyO56xW_2I_P42lE=',
    'https://cdn.pixabay.com/photo/2017/05/27/22/33/morocco-2349647_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/12/20/13/16/desert-1101123_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/10/21/11/17/marrakesh-999370_1280.jpg',
    'https://cdn.pixabay.com/photo/2020/06/07/19/15/morocco-5271734_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/06/16/22/03/dirham-3479568_1280.jpg'
  ]
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };



  return (
    <div  className='py-10'>
      <div className='container'>
        {/* section header */}
        <div className='text-center mb-20 max-w-[400px] mx-auto '>
          <p data-aos='fade-up' className='border border-sky-500 rounded border-t-4'></p>
          <h1 data-aos='fade-down' className='text-3xl font-bold pt-1'>Testimonial</h1>
          <p data-aos='fade'  className='text-x5 text-gray-400 '>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Modi nostrum ipsa fugiat sit libero dolor,
            quam odit eos in amet facilis enim consequatur ratione,
            earum labore soluta inventore quo maiores?
          </p>
        </div>
        {/* slider */}
        <div  className='slider-container'>
          <Slider {...settings}>
            {
              TesData.map((item) => {

                return (<div className="my-6">
                  <div className="flex flex-col justify-center items-center gap-4 shadow-lg p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 relative text-center mx-2">

                    <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2  bg-gray-100 shadow-md" src={item} />
                    <p className="leading-relaxed ">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk.
                      Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking
                      vinegar cronut adaptogen squid fanny pack vaporware.</p>
                    <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                    <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">HOLDEN CAULFIELD</h2>
                  </div>
                </div>
                )
              })
            }
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Testiomontial