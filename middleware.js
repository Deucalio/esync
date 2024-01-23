import { NextResponse } from "next/server";

async function delayedPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, 3000); // 3000 milliseconds = 3 seconds
  });
}
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const isLoggedIn = await delayedPromise();

  if (!isLoggedIn) {
    // If the user is not Logged In, he can only visit register and login pages
    if (
      request.nextUrl.pathname !== "/login" &&
      request.nextUrl.pathname !== "/register"
    ) {
      console.log("redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  console.log("middleware: ", request.nextUrl.pathname, request.url);
}

// See "Matching Paths" below to learn more
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
