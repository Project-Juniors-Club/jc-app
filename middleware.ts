import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { isInternal } from './utils/validation';

export default withAuth(
  async function middleware(req) {
      const isInternalUser = await isInternal(req);
      console.log(isInternalUser);
      // Redirect if they don't have the appropriate role
      if (req.nextUrl.pathname.startsWith('/api') && !isInternalUser) {
          return NextResponse.redirect(new URL('/api/error', req.url));
      }
      if (!isInternalUser) {
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
  matcher: ['/api/internal/:path*', '/internal/:path*', '/courses/staff/:path*'],
};
