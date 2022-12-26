import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { isInternal } from './utils/validation';

export default withAuth(
  function middleware(req) {
    // Redirect if they don't have the appropriate role
    if (req.nextUrl.pathname.startsWith('/internal') && !isInternal(req)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (req.nextUrl.pathname.startsWith('/api/internal') && !isInternal(req)) {
      return NextResponse.redirect(new URL('/api/error', req.url));
    }
  },
  {
    pages: {
      signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
);
//Paths middleware will run on
export const config = {
  matcher: ['/api/internal/:path*', '/internal/:path*', '/'],
};
