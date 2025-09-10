import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.value;

  // --- ADMIN ROUTES ---
  if (pathname.startsWith("/admin")) {
    if (role !== "Admin") {
      return NextResponse.redirect(new URL("/not-authorized", request.url));
    }
  }

  // --- OWNER ROUTES (prefix owner-) ---
  if (pathname.startsWith("/owner-")) {
    if (role !== "Owner" && role !== "Admin") {
      return NextResponse.redirect(new URL("/not-authorized", request.url));
    }
  }

  // --- USER ROUTES ---
  if (pathname.startsWith("/user")) {
    if (role !== "User" && role !== "Admin") {
      return NextResponse.redirect(new URL("/not-authorized", request.url));
    }
  }

  // ✅ baaki sab public
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/owner-:path*", "/user/:path*"],
};
