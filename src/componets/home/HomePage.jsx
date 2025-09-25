"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const SearchBox = dynamic(() => import("@/componets/home/SearchBox"), {
  ssr: false,
  loading: () => <p>Loading search box...</p>,
});
const HotelSlider = dynamic(() => import("@/componets/home/HotelSlider"), {
  ssr: false,
  loading: () => <p>Loading hotels...</p>,
});
const CorporatePage = dynamic(() => import("@/componets/home/CorporatePage"), {
  ssr: false,
  loading: () => <p>Loading corporate stays...</p>,
});
const BenefitsSection = dynamic(
  () => import("@/componets/home/BenefitsSection"),
  { ssr: false, loading: () => <p>Loading benefits...</p> }
);
const ConferenceSection = dynamic(
  () => import("@/componets/home/ConferenceSection"),
  { ssr: false, loading: () => <p>Loading conference...</p> }
);
const RoomSection = dynamic(() => import("@/componets/home/RoomSection"), {
  ssr: false,
  loading: () => <p>Loading rooms...</p>,
});

export default function HomePage() {
  return (
    <>
      <SearchBox />

      {/* <div className="my-6 max-w-4xl mx-auto">
        <Image
          src="/hotel/hotel4.jpg"
          alt="Business Hotel in Delhi with premium conference room"
          width={624}
          height={312}
          quality={75}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-lg shadow-md"
        />
      </div> */}

      <HotelSlider />
      <RoomSection />
      <CorporatePage />
      <BenefitsSection />
      <ConferenceSection />
    </>
  );
}
