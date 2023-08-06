import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

function getSessionCookieName() {
  if (process.env.NODE_ENV === 'development') {
    return "next-auth.session-token"
  }

  return "__Secure-next-auth.session-token"
}


export async function middleware(request) {


  // protect API routes that are not related to authentication
  if (request.nextUrl.pathname.startsWith('/api') && !request.nextUrl.pathname.startsWith('/api/auth')) {
    // first check if the user is authenticated
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
      cookieName: getSessionCookieName(),
    })

    // if they are not authenticated redirect to sign in page
    if (!token) {
      const url = new URL(`/api/auth/signin`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);

    }

    // next check if they are published
    if (!token.isPublished) {
      // only allow requests to the profile api
      if (request.nextUrl.pathname.startsWith('/api') && !request.nextUrl.pathname.startsWith('/api/profile')) {
        return new NextResponse(
          JSON.stringify({ success: false, message: 'access denied' }),
          { status: 404, headers: { 'content-type': 'application/json' } }
        )
      }
    }
  }

  return NextResponse.next()
}