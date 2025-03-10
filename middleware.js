// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(request) {
//   const token = request.cookies.get("auth-token")?.value; // Read token from cookies
//   const { pathname } = request.nextUrl; // Get the requested path

//   // Allow unauthenticated access to public routes
//   const publicPaths = ["/auth-login", "/auth-signup"];
//   if (publicPaths.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // Redirect if trying to access a private route without a token
//   if (pathname.startsWith("/profile") && !token) {
//     return NextResponse.redirect(new URL("/auth-login", request.url));
//   }

//   // Verify token for authenticated routes
//   if (token) {
//     try {
//       jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
//       return NextResponse.next();
//     } catch (error) {
//       console.error("Invalid token:", error.message);
//       return NextResponse.redirect(new URL("/auth-login", request.url));
//     }
//   }

//   // Fallback for paths that are neither public nor private
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/profile/:path*"], // Apply middleware to `/profile` and its subpaths
// };

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("auth-token")?.value;

  // Handle protected routes
  if (!token) {
    // Redirect to login for protected pages if there's no token
    if (
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/ticket/success")
    ) {
      return NextResponse.redirect(new URL("/auth-login", request.url));
    }
  }

  // If there's a token, verify it
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);

      // Redirect to profile if user is authenticated and tries to access login or signup pages
      if (
        request.nextUrl.pathname === "/auth-login" ||
        request.nextUrl.pathname === "/auth-signup"
      ) {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
    } catch (error) {
      console.error("Token verification failed:", error);

      // Redirect to login if token is invalid and user is on protected routes
      if (
        request.nextUrl.pathname.startsWith("/profile") ||
        request.nextUrl.pathname.startsWith("/ticket/success")
      ) {
        return NextResponse.redirect(new URL("/auth-login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/auth-login",
    "/auth-signup",
    "/ticket/success/:path*", // Add this line to include the ticket success page
  ],
};
