"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <main className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Illustration / Left */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <svg
              className="w-48 h-48 md:w-56 md:h-56"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M11 2h2v6h-2z" fill="#d1fae5" />
              <path
                d="M21 21H3a1 1 0 01-1-1V7a1 1 0 011-1h5l2-2h4l2 2h5a1 1 0 011 1v13a1 1 0 01-1 1z"
                fill="#ecfccb"
              />
              <path d="M9 14h6v2H9z" fill="#86efac" />
            </svg>
          </div>

          {/* Content / Right */}
          <div className="w-full md:w-1/2 text-left md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">404</h1>
            <p className="mt-2 text-lg md:text-xl text-gray-600">
              Oops — we couldn’t find that page.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              The link may be broken, the page might have been removed, or you typed the address incorrectly.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-5 py-3 bg-[#5f8575] hover:bg-[#4e6b60] text-white rounded-lg text-sm font-medium shadow-sm"
              >
                Go to Homepage
              </Link>

              <button
                onClick={() => router.back()}
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Go Back
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-400">
              Tip: try searching from the homepage or check your URL for typos.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
