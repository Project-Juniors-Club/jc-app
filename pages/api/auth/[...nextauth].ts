import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user }) {
      console.log(user);
      if (user) {
        return true;
      } else {
        return false;
      }
    },
    jwt({ token, user }) {
      if (user) {
        token.type = user.type;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token, user }) {
      if (session.user) {
        session.user.type = token.type;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/sign-up',
  },
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_HOST,
    //     port: Number(process.env.EMAIL_PORT),
    //     auth: {
    //       user: process.env.EMAIL_USER,
    //       pass: process.env.EMAIL_PASS,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
        console.log('TESTING IN CONFIG');
        const user = await fetch(`${process.env.NEXTAUTH_URL}/api/users/check-credentials`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            accept: 'application/json',
          },
          body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        })
          .then(res => {
            return res.json();
          })
          .catch(err => {
            return null;
          });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
