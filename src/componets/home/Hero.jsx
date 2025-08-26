

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-6">
            Book  Stay in Delhi
          </h1>
          {/* <p className="text-gray-700 text-lg mb-8">
            Create blazing-fast, SEO-friendly web apps using the power of server-side rendering and modern React features.
          </p> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/search">
            <button className="bg-white hover:bg-black hover:text-white text-black border   px-6 py-3 rounded-xl font-medium transition">
              Get Started
            </button>
            </Link>
            
          </div>
        </div>

        {/* Image */}
        <div className="flex-1">
          <Image
            src="/hero.jpg" // place your image in public folder
            alt="Next.js Hero"
            width={500}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
