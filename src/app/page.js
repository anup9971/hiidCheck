import Hero from "@/componets/home/Hero";
import HomePage from "@/componets/home/HomePage";

export const metadata = {
  title:
    "Unlock Premium Corporate Stays and Meeting Spaces in Delhi — Arriving Soon",
  description:
    "Exclusive business-to-business hotel booking for Delhi, Ahipalpur, and Karol Bagh. Discover curated 3 & 4-star hotels with conference and corporate packages. Join our VIP list to be first in line.",
  alternates: {
    canonical: "https://www.hotelindelhi.in",
  },
  // 🔹 baki keywords, robots, openGraph, twitter etc. yahin rakho
};

export default function Home() {
  return (
    <div className="bg-white mt-[-4px]">
      {/* Server Component (SEO ke liye SSR hota hai) */}
      <Hero />

      {/* Client Component */}
      <HomePage />
    </div>
  );
}
