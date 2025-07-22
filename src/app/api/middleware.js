import { NextResponse } from 'next/server';

export function middleware(request) {
  // Create a response
  const response = NextResponse.next();

  // Set the X-Robots-Tag header to control search engine indexing
  response.headers.set('X-Robots-Tag', 'index, follow'); // You can customize this tag

  return response;
}

// Specify which paths this middleware should apply to (optional)
export const config = {
  matcher: ['/', '/comingsoon'], // Apply to all routes, or specify specific paths
};
