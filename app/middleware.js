import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const token = request.cookies.get("auth-token")?.value; // Read token from cookies
  const { pathname } = request.nextUrl; // Get the requested path

  // Allow unauthenticated access to public routes
  const publicPaths = ["/auth-login", "/auth-signup"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect if trying to access a private route without a token
  if (pathname.startsWith("/profile") && !token) {
    return NextResponse.redirect(new URL("/auth-login", request.url));
  }

  // Verify token for authenticated routes
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
      return NextResponse.next();
    } catch (error) {
      console.error("Invalid token:", error.message);
      return NextResponse.redirect(new URL("/auth-login", request.url));
    }
  }

  // Fallback for paths that are neither public nor private
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"], // Apply middleware to `/profile` and its subpaths
};
