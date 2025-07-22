'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
  <>
    <div className="relative h-screen w-full">
      {/* Background image */}
      <Image
        src="/indiagate.jpg" // <-- replace with your image path
        alt="Resort Background"
        layout="fill"
        objectFit="cover"
        quality={90}
        priority
      />

      {/* Overlay */}
    

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="uppercase tracking-widest text-sm mb-2">Our New</p>
        <p className="text-lg md:text-2xl font-light "> Hotel Website</p>
        <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-2">Coming Soon</h1>
        
        <div className=" bg-black border-1 text-gray-100 px-6 py-2 rounded hover:bg-gray-100 hover:text-black transition">
        <Link href="/comingsoon"
          >
            Notify  
        </Link>
        </div>
      </div>
    </div>



     <section className="md:bg-[#ffbfoo] bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto  flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
       

        {/* Image */}
        <div className="md:w-1/2  ">
          <Image
            src="/cp1.jpg" // Replace with your image
            alt="Luxury experience"
            width={600}
            height={900}
            className="rounded object-cover w-full "
          />
        </div>

         <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold   md:text-3xl font-serif text-gray-700 mb-1">
            Corporate Hotel Booking, Reinvented for Delhi’s Professionals
          </h2>
          <p className="text-xl font-semibold  md:text-xl font-serif text-gray-600  mb-1">The smarter way for businesses to book rooms and conference spaces  crafted for Delhi, Mahipalpur, and Karol Bagh’s modern workforces.</p>
          <p className="text-gray-500   text-base leading-relaxed">
            If you need the perfect venue for your next board meeting or want to book rooms for your entire team, this is your ideal solution without wading through unrelated options.
          </p>
          <p className="text-gray-500   text-base leading-relaxed">
          We’re creating a platform for people who think ahead for businesses that expect more than a standard hotel listing. Delhi’s best 3- and 4-star stays, verified by professionals and packaged with perks that matter (think easy GST billing, hassle-free booking, and insider rates).
          </p>
           <p className="text-gray-500   text-base leading-relaxed">
         Soon, finding “the one” for your company, whether it’s a business room or a full conference setup, or a block booking on your team, will be easy, with no clutter, no guesswork, and the best spaces for work and growth.
          </p>
          {/* <p className="text-gray-500   text-base leading-relaxed">
           We’re creating a platform for people who think ahead; for businesses that expect more than a standard hotel listing. Only Delhi’s best 3- and 4-star stays, verified by professionals and packaged with perks that matter (think easy GST billing, hassle-free booking, and insider rates).
          </p> */}
         

        </div>
      </div>
    </section>


    {/* <section className="bg-[#FFBFOO] py-16 px-4">
      <div className="max-w-7xl mx-auto  flex flex-col md:flex-row items-center gap-10">


       
        
      
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold   md:text-3xl font-serif text-brown-900 mb-4">
            Curious About Launch Perks?  
          </h2>
          <p className="text-gray-700   text-base leading-relaxed">The smarter way for businesses to book rooms and conference spaces  crafted for Delhi, Mahipalpur, and Karol Bagh’s modern workforces.</p>
          <p className="text-gray-700   text-base leading-relaxed">
         Leave your details and unlock priority access before anyone else.
          </p>
      
         

        </div>
      <div className="md:w-1/2 h-[300px]">
          <Image
            src="/soonbg.jpg" 
            alt="Luxury experience"
            width={600}
            height={150}
            className="rounded object-cover w-full h-full "
          />
        </div>
       
      </div>
    </section> */}
  </>
  );
}
