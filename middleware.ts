import { UserType } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Redirect if they don't have the appropriate role
    if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== UserType.admin) {
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
  matcher: ['/api/superadmin', '/api/admin', '/'],
};
