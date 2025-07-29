import Image from "next/image";
import CommingHome from "@/componets/CommingHome";
import HotelCards from "@/componets/HotelCard";
import BodyPage from "@/componets/BodyPage"
import { Toaster } from "react-hot-toast";
import Hero from "@/componets/home/Hero";
import SearchBox from "@/componets/home/SearchBox";
import HotelSlider from "@/componets/home/HotelSlider";
export const metadata = {
  title: "Unlock Premium Corporate Stays and Meeting Spaces in Delhi — Arriving Soon",
  description:
    "Exclusive business-to-business hotel booking for Delhi, Ahipalpur, and Karol Bagh. Discover curated 3 & 4-star hotels with conference and corporate packages. Join our VIP list to be first in line.",
  alternates: {
    canonical: "https://www.hotelindelhi.in",
  },
    keywords: [
    "business hotel booking Delhi",
    "corporate hotel booking",
    "3-star hotels in Delhi",
    "4-star hotels in Delhi",
    "hotels with conference rooms Delhi",
    "hotel booking for board meetings",
    "GST billing hotels Delhi",
    "team hotel booking Delhi",
    "Karol Bagh business hotels",
    "Mahipalpur corporate hotels",
    "hassle-free business stay Delhi",
    "verified business hotels in Delhi",
    "hotels with meeting rooms Delhi",
    "top business hotels in Karol Bagh",
    "group booking hotels Delhi",
    "insider rates hotel Delhi",
    "affordable corporate stays Delhi",
    "book hotels for company events Delhi"
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};


export default function Home() {
  return (
   <>
    <Hero/>
    <SearchBox/>
    <HotelSlider/>
  {/* <CommingHome/>
  <BodyPage/>
  <Toaster /> */}
 
   </>
  );
}
