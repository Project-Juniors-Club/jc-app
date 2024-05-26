import { UserType } from '@prisma/client';
import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

//Source: https://downrightaft.com/role-based-auth-with-nextjs-middleware-and-typescript.html
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    type?: UserType;
    id?: string;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the
   * `SessionProvider` React Context and trpc context
   */
  interface Session {
    user?: {
      type?: UserType;
      id?: string;
    } & DefaultSession['user'];
    data?: any;
  }

  /** Passed as a parameter to the `jwt` callback and used in middleware */
  interface User {
    type?: UserType;
    id?: string;
    role?: string;
    type?: string;
  }
}
