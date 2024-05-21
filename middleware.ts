import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { isInternal } from './utils/validation';

export default withAuth(
  async function middleware(req) {
      const isInternalUser = await isInternal(req);
      let whitelist = false;
      // Redirect if they don't have the appropriate role
      if (req.nextUrl.pathname.startsWith('/api/courses/') && req.method == 'GET') {
          whitelist = true;
      }
      if (req.nextUrl.pathname.startsWith('/api/courses/recent')) {
          whitelist = true;
      }
      if (req.nextUrl.pathname.startsWith('/api') && !isInternalUser && !whitelist) {
          return NextResponse.redirect(new URL('/api/error', req.url));
      }
      if (!isInternalUser && !whitelist) {
        return NextResponse.redirect(new URL('/', req.url));
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
  matcher: ['/api/internal/:path*', '/internal/:path*', '/courses/staff/:path*', '/api/courses/:path*'],
};
