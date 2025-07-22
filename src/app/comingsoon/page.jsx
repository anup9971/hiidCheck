import React from 'react'
import ComingSoon from '@/componets/ComingSoon'
export const metadata = {
  title: "Unlock Premium Corporate Stays and Meeting Spaces in Delhi — Arriving Soon",
  description:
    "Unlock priority access to exclusive launch perks by submitting your details. Contact us to be the first to know about exciting offers at Hotel in Delhi.",
  alternates: {
    canonical: "https://www.hotelindelhi.in/comingsoon",
  },
    keywords: [
    "hotel in Delhi",
    "Delhi hotel booking",
    "luxury hotel Delhi",
    "budget hotel Delhi",
    "book hotel Delhi",
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

export default function page() {
  return (
    <>
    <ComingSoon/>
    </>
  )
}
