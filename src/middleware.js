import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ✅ Role cookie se nikalna
  const role = request.cookies.get("role")?.value;

  // --- ADMIN GUARD ---
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/not-authorized", request.url));
    }
  }

  // --- OWNER GUARD ---
  if (pathname.startsWith("/owner")) {
    if (role !== "owner") {
      return NextResponse.redirect(new URL("/not-authorized", request.url));
    }
  }

  // --- USER GUARD ---
  if (pathname.startsWith("/user")) {
    if (role !== "user") {
      return NextResponse.redirect(new URL("/not-authorized", request.url));
    }
  }

  return NextResponse.next();
}

// ✅ Middleware sirf in routes pe chalega
export const config = {
  matcher: ["/admin/:path*", "/owner/:path*", "/user/:path*"],
};
