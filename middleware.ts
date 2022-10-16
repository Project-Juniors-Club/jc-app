import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      //TODO: change to superadmin routes
      if (req.nextUrl.pathname === '/api/superadmin') return token?.role === 'superadmin';
      //TODO: change to admin routes
      if (req.nextUrl.pathname === '/api/admin') return token?.role === 'admin';
      if (req.nextUrl.pathname === '/api/user') return token?.role === 'user';
      return !!token;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
//Paths middleware will run on
export const config = {
  matcher: ['/api/superadmin', '/api/admin'],
};
