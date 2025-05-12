import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Testiomontial from '../../Component/Testiomontial/Testiomontial'

const AuthorDetails = () => {

    const {id} = useParams()

   
        const [author,setAuthor]=useState({
            name:'name',
            daye_death:'day of death',
            birthday:'day of birth',
            image:'image',
            content:''
    
            
    
    
        })

        const [Books,setBooks]=useState([])
 



 useEffect(()=>{

        const fetch =async()=>{


            await axios.get(`http://127.0.0.1:8000/api/Authors/${id}`)
            .then((response)=>{
                    setAuthor(response.data.author)
                    setBooks(...Books,response.data.book)

            }).catch((error)=>{
                console.log(error)
            })
        }

        fetch()



    }
    
    
    ,[])











  return (

<div className='container'>

<section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mx-auto" >
        <div class="lg:flex lg:-mx-6">
            <div class="lg:w-3/4 lg:px-6 " >
                <img class="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl" src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""/>

                <div className='rounded-md shadow-lg m-1 p-2'>
                    <p class="mt-6 text-sm text-blue-500 uppercase">Want to know</p>

                    <h1 class="max-w-lg mt-4 text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
                        What do you want to know about {author.name}
                    </h1>

                    <div class="flex items-center mt-6">
                        <img class="object-cover object-center w-10 h-10 rounded-full" src={`http://127.0.0.1:8000/${author.image}`} alt=""/>

                        <div class="mx-4">
                            <h1 class="text-sm text-gray-700 dark:text-gray-200 ">{author.name}</h1>
                            
                        </div>
                    </div>
                    <div className='md:flex justify-between'>
                        <p>date of brith :{author.birthday}</p>
                        <p>date of death :{author.daye_death?(<>{author.daye_death}</>):(<>Still Alive</>)}</p>
                    </div>
                </div>
            </div>

            <div class="mt-8 lg:w-1/4 lg:mt-0 lg:px-6 shadow-lg " >
            <h1 class="font-large text-center">Books of the Auteur</h1>
            {   
            
            Books!=null?(
                Books.map((book,index)=>{

                    return(
<>
                <div>
                    <Link to={`/books/${book.id}`} class="text-blue-500 hover:underline capitalize">{book.title}</Link>

                    <div  dangerouslySetInnerHTML={{ __html: author.content }} className="mt-2 font-small text-gray-700 hover:text-gray-500 dark:text-gray-400 line-clamp-3 ">
                       
                    </div>
                    <span></span>
                </div>

                <hr class="my-6 border-gray-200 dark:border-gray-700"/>
</>)
                })
            ):(

            <div className='flex items-center justify-center w-full h-full'>
             

                <p  class="block text-center mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400 ">
                there's no book by this author !
                </p>
            </div>


            )
            }
            </div>
        </div>
    </div>
</section>

<div className='container' dangerouslySetInnerHTML={{ __html:author.content  }}>



</div>
<div className='container '>
    
<p class="lead">Flowbite is an open-source library of UI components built with the utility-first
              classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals,
              datepickers.</p>
          <p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way,
              you can think things through before committing to an actual design project.</p>
          <p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called
                  Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation
              bars, cards, form elements, and more which are conveniently built with the utility classes from
              Tailwind CSS.</p>
          <figure><img src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png" alt=""/>
              <figcaption>Digital art by Anonymous</figcaption>
          </figure>
          <h2>Getting started with Flowbite</h2>
          <p>First of all you need to understand how Flowbite works. This library is not another framework.
              Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the
              documentation.</p>
          <p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns,
              and datepickers which you can optionally include into your project via CDN or NPM.</p>
          <p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart
                  guide</a> to explore the elements by including the CDN files into your project. But if you want
              to build a project with Flowbite I recommend you to follow the build tools steps so that you can
              purge and minify the generated CSS.</p>
          <p>You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help
              you get started with your projects even faster. You can check out this <a
                  href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand
              the differences between the open-source and pro version of Flowbite.</p>
          <h2>When does design come in handy?</h2>
          <p>While it might seem like extra work at a first glance, here are some key moments in which prototyping
              will come in handy:</p>
          <ol>
              <li><strong>Usability testing</strong>. Does your user know how to exit out of screens? Can they
                  follow your intended user journey and buy something from the site you’ve designed? By running a
                  usability test, you’ll be able to see how users will interact with your design once it’s live;
              </li>
              <li><strong>Involving stakeholders</strong>. Need to check if your GDPR consent boxes are displaying
                  properly? Pass your prototype to your data protection team and they can test it for real;</li>
              <li><strong>Impressing a client</strong>. Prototypes can help explain or even sell your idea by
                  providing your client with a hands-on experience;</li>
              <li><strong>Communicating your vision</strong>. By using an interactive medium to preview and test
                  design elements, designers and developers can understand each other — and the project — better.
              </li>
          </ol>
          <h3>Laying the groundwork for best design</h3>
          <p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way,
              you can think things through before committing to an actual design project.</p>
          <p>Let's start by including the CSS file inside the <code>head</code> tag of your HTML.</p>
          <h3>Understanding typography</h3>
          <h4>Type properties</h4>
          <p>A typeface is a collection of letters. While each letter is unique, certain shapes are shared across
              letters. A typeface represents shared patterns across a collection of letters.</p>
          <h4>Baseline</h4>
          <p>A typeface is a collection of letters. While each letter is unique, certain shapes are shared across
              letters. A typeface represents shared patterns across a collection of letters.</p>
          <h4>Measurement from the baseline</h4>
          <p>A typeface is a collection of letters. While each letter is unique, certain shapes are shared across
              letters. A typeface represents shared patterns across a collection of letters.</p>
          <h3>Type classification</h3>
          <h4>Serif</h4>
          <p>A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter.
              Typefaces with serifs are called serif typefaces. Serif fonts are classified as one of the
              following:</p>
          <h4>Old-Style serifs</h4>
          <ul>
              <li>Low contrast between thick and thin strokes</li>
              <li>Diagonal stress in the strokes</li>
              <li>Slanted serifs on lower-case ascenders</li>
          </ul><img src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-2.png" alt=""/>
          <ol>
              <li>Low contrast between thick and thin strokes</li>
              <li>Diagonal stress in the strokes</li>
              <li>Slanted serifs on lower-case ascenders</li>
          </ol>
          <h3>Laying the best for successful prototyping</h3>
          <p>A serif is a small shape or projection that appears at the beginning:</p>
          <blockquote>
              <p>Flowbite is just awesome. It contains tons of predesigned components and pages starting from
                  login screen to complex dashboard. Perfect choice for your next SaaS application.</p>
          </blockquote>
          <h4>Code example</h4>
          <p>A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter.
              Typefaces with serifs are called serif typefaces. Serif fonts are classified as one of the
              following:</p>
</div>


<Testiomontial/>

</div>





  )
}

export default AuthorDetails