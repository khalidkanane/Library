import React from 'react'
import Location from '../../Component/Location/Location'

const About = () => {
  return (
    <div className='container pt-14'>
        <div className=''>
             <img className='overflow-hidden h-[300px] w-full object-cover rounded-lg shadow-lg transition duration-700 hover:skew-x-0 hover:scale-110' src="../image/about_image.jpg" alt="" />
        </div>
        <div className='py-10'>
            <div >
                <h1 className='my-8 border-l-8 border-sky-500 py-2 pl-2 text-3xl font-bold'>
                    About Us
                </h1>
            </div>   
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Omnis quos pariatur quasi sunt ad! Voluptates deleniti asperiores autem
                    quidem eos qui delectus aut tenetur esse iste pariatur laborum,
                    veritatis quae.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Omnis quos pariatur quasi sunt ad! Voluptates deleniti asperiores autem
                    quidem eos qui delectus aut tenetur esse iste pariatur laborum,
                    veritatis quae. <br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Omnis quos pariatur quasi sunt ad! Voluptates deleniti asperiores autem
                    quidem eos qui delectus aut tenetur esse iste pariatur laborum,
                    veritatis quae.
                </p>
                <br />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Omnis quos pariatur quasi sunt ad! Voluptates deleniti asperiores autem
                    quidem eos qui delectus aut tenetur esse iste pariatur laborum,
                    veritatis quae. <br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Omnis quos pariatur quasi sunt ad! Voluptates deleniti asperiores autem
                    quidem eos qui delectus aut tenetur esse iste pariatur laborum,
                    veritatis quae.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Omnis quos pariatur quasi sunt ad! Voluptates deleniti asperiores autem
                    quidem eos qui delectus aut tenetur esse iste pariatur laborum,
                    veritatis quae.
                </p>
        </div>
        {/* section teams */}

        <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20 border-t-4 pt-2 border-sky-500 ">
      <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">K.Lorem Teams</h2>
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">Our Member Team</h1>
    </div>
    <div class="flex flex-wrap -m-4">
      <div class="p-4 md:w-1/3">
        <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div class="flex items-center mb-3">
           
<img className='rounded-full object-cover h-8 w-8 me-2 ' src="https://media.istockphoto.com/id/1090878336/photo/closeup-headshot-of-businessman-standing-against-gray-background-smiling-with-satisfaction.jpg?s=612x612&w=0&k=20&c=mRuH76K4xsGvtIfH4xPAB9kFRoFAJUSWPTDBNgrfTfU=" alt="" />
           
            <h2 class="text-gray-900 text-lg title-font font-medium">Mr Mohemad</h2>
          </div>
          <div class="flex-grow">
            <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>

          </div>
        </div>
      </div>
      <div class="p-4 md:w-1/3">
        <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div class="flex items-center mb-3">
<img className='rounded-full object-cover h-8 w-8 me-2 '  src="https://media.istockphoto.com/id/866474934/photo/young-handsome-businessman-wearing-white-shirt-against-white-background.jpg?s=612x612&w=0&k=20&c=gFVEtFFcgO_Z7ZQORc28n-B5ariGKi72nZYWT1jnfiw=" alt="" />
            <h2 class="text-gray-900 text-lg title-font font-medium">Mr Ali Alhayan</h2>
          </div>
          <div class="flex-grow">
            <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>

          </div>
        </div>
      </div>
      <div class="p-4 md:w-1/3">
        <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div class="flex items-center mb-3">
<img className='rounded-full object-cover h-8 w-8 me-2 ' src="https://www.perfocal.com/blog/content/images/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg" alt="" />
           
            <h2 class="text-gray-900 text-lg title-font font-medium">Ms Fatima</h2>
          </div>
          <div class="flex-grow">
            <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<Location />



    </div>
  )
}

export default About