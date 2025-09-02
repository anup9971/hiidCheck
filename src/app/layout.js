import { Geist, Geist_Mono } from "next/font/google";
import { SearchProvider } from "@/app/context/SearchContext";
import "./globals.css";
import Navbar from "@/componets/Navbar";
import Footer from "@/componets/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ App Router metadata — correctly set
export const metadata = {
  title: "Hotel in Delhi | Best Hotel Booking Deals",
  description:
    "Discover the best hotels in Delhi at affordable rates. Book luxury, family, or budget hotels with top amenities in central locations.",
  keywords: [
    "hotel in Delhi",
    "Delhi hotel booking",
    "luxury hotel Delhi",
    "budget hotel Delhi",
    "cheap hotels in Delhi",
    "best hotels in Delhi",
  ],
  icons: {
    icon: "/favicon.ico", // ✅ This is correct and will work automatically
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Hotel in Delhi",
    description: "Find and book top-rated hotels in Delhi.",
    url: "https://hotelindelhi.in",
    siteName: "Hotel in Delhi",
    images: [
      {
        url: "https://hotelindelhi.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel in Delhi - Luxury Rooms",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel in Delhi",
    description: "Top-rated hotels in Delhi.",
    images: ["https://hotelindelhi.in/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
  <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-event-set-component@5.0.0/dist/aframe-event-set-component.min.js"></script>
</head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pt-17`}>
        <Navbar />
        <SearchProvider>

        {children}
        <Toaster position="top-right" reverseOrder={false} />
        </SearchProvider>
        <Footer />
      </body>
    </html>
  );
}
