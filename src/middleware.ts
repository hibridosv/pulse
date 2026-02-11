import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define protected and public-only routes
  const protectedRoutes = [
                          "/dashboard", 
                          "/protected", 
                          "/protected-ssr",
                          "/accounts", 
                          "/cash", 
                          "/cashdrawers", 
                          "/contacts", 
                          "/dashboard", 
                          "/history", 
                          "/invoicing", 
                          "/orders", 
                          "/products", 
                          "/reports", 
                          "/settings", 
                          "/tools", 
                          "/transfers", 
                        ];

  const publicOnlyRoutes = ["/"]; // The login page

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // --- Redirect authenticated users from public-only routes ---
  if (token && publicOnlyRoutes.includes(pathname)) {
    // If user is logged in and tries to access login page, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // --- Redirect unauthenticated users from protected routes ---
  if (!token && isProtectedRoute) {
    // If user is not logged in and tries to access a protected page, redirect to login
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow other requests
  return NextResponse.next();
}

// This config ensures the middleware runs on all necessary routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
