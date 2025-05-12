import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import { GrView } from 'react-icons/gr';

const Show_User = ({name,email,tel,image,adresse}) => {

    const [openModal, setOpenModal] = useState(false);



    return (


        <>
            <button onClick={() => setOpenModal(true)}  type="button" class="flex me-  items-center   border border-blue-600 p-1 rounded-md  hover:bg-blue-600 hover:text-white text-blue-700 ">
                <GrView className='h-4 w-4 mr-2'/>
                    Show
            </button>

            <Modal show={openModal} onClose={() => setOpenModal(false)}>

                <Modal.Body>
                <div class="w-full overflow-hidden rounded-lg shadow-lg dark:bg-gray-800">
    <img class="object-cover object-center w-full h-56" src={`http://127.0.0.1:8000/${image}`} alt="avatar"/>

    <div class="flex items-center px-6 py-3 bg-gray-900">
        <svg aria-label="headphones icon" class="w-6 h-6 text-white fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17 21C15.8954 21 15 20.1046 15 19V15C15 13.8954 15.8954 13 17 13H19V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V13H7C8.10457 13 9 13.8954 9 15V19C9 20.1046 8.10457 21 7 21H3V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V21H17ZM19 15H17V19H19V15ZM7 15H5V19H7V15Z"/>
        </svg>

        <h1 class="mx-3 text-lg font-semibold text-white">Focusing</h1>
    </div>

    <div class="px-6 py-4">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white">{name}</h1>



        <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            
            <svg aria-label="suitcase icon" class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="primary" d="M21,15v3.93a2,2,0,0,1-2.29,2A18,18,0,0,1,3.14,5.29,2,2,0,0,1,5.13,3H9a1,1,0,0,1,1,.89,10.74,10.74,0,0,0,1,3.78,1,1,0,0,1-.42,1.26l-.86.49a1,1,0,0,0-.33,1.46,14.08,14.08,0,0,0,3.69,3.69,1,1,0,0,0,1.46-.33l.49-.86A1,1,0,0,1,16.33,13a10.74,10.74,0,0,0,3.78,1A1,1,0,0,1,21,15Z"></path></svg>

            <h1 class="px-2 text-sm">{tel}</h1>
        </div>

        <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <svg aria-label="location pin icon" class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"/>
            </svg>

            <h1 class="px-2 text-sm">{adresse}</h1>
        </div>

        <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <svg aria-label="email icon" class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"/>
            </svg>

            <h1 class="px-2 text-sm">{email}</h1>
        </div>
    </div>
</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}






export default Show_User