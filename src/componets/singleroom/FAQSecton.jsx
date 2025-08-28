"use client"

import React, { useState } from 'react'
export default function FAQSecton() {
    let [faq, setFaq] = useState(null);
    const faqHandler =(id)=>{
         setFaq((prev)=>(prev === id ?null :id))
        
    }

    
 let fawData = [
     {
        id:1,
        question:"What are the advantages of online hotel booking?",
        ans :"If you paste me the part of your component where this error happens, I can point out exactly what’s causing the infinite re-render in your code. Do you want to share your snippet?"
     },
       {
        id:2,
        question:"In current situation of Corona pandemic (Covid 19), where can we find safe and well sanitized hotels?",
        ans :"If you paste me the part of your component where this error happens, I can point out exactly what’s causing the infinite re-render in your code. Do you want to share your snippet?"
     },
     
       {
        id:3,
        question:"What are the popular Indian cities which are frequently visited by people?",
        ans :"If you paste me the part of your component where this error happens, I can point out exactly what’s causing the infinite re-render in your code. Do you want to share your snippet?"
     },
     
       {
        id:4,
        question:"Which Indian Hotels are popular among travellers for Online Hotel Booking?",
        ans :"If you paste me the part of your component where this error happens, I can point out exactly what’s causing the infinite re-render in your code. Do you want to share your snippet?"
     },
     
       {
        id:5,
        question:"What are the popular International Cities for Online Hotel Booking?",
        ans :"If you paste me the part of your component where this error happens, I can point out exactly what’s causing the infinite re-render in your code. Do you want to share your snippet?"
     },
     
       {
        id:6,
        question:"How can I do a hotel booking at the lowest price through Hotel In Delhi ?",
        ans :"If you paste me the part of your component where this error happens, I can point out exactly what’s causing the infinite re-render in your code. Do you want to share your snippet?"
     },
     
       {
        id:7,
        question:"How can I earn and use GoCash on hotel booking on Hotel in Delhi?",
        ans :"If you paste me the part of your component where this error happens, I can point out exactly what’s causing the infinite re-render in your code. Do you want to share your snippet?"
     },
     

 ]
    
  return (
    <>
      <div className='w-full h-auto p-4 mt-10 text-black bg-white rounded-md'> 

         <p  className='text-3xl pl-2 pt-6 font-semibold text-gray-800'>Hotel Booking FAQs</p>

          <div className='mt-5 rounded-md' >
                 {
                    fawData?.map((item , index)=>{
                        return(
                            <div key={index} className='text-gray-700 p-4 mb-2 border  rounded-md border-gray-200 bg-white shadow-xl' onClick={()=>faqHandler(item?.id)} >
                              <p className='text-gray-800 font-semibold'><span className='text-black font-semibold'>Q {item.id}.</span> {item.question}</p>
                               {faq ===item.id &&(<p ><span className='text-black font-semibold'>Ans.</span> {item.ans}</p>) }
                             </div>
                        )
                    })
                 }
                  
          </div>
      </div>
     
    </>
  )
}
