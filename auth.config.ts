import type { NextAuthConfig } from 'next-auth';
 
export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/portal',
    signOut: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60,
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          name: token.name || '',
          email: token.email || '',
          id: typeof token.id === 'string' ? token.id : '',
        }
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user?.id;
        token.name = user?.name;
        token.email = user?.email;
      }
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = auth?.user;
      const isOnPortal = nextUrl.pathname === '/portall';
      const isOnDashboard = nextUrl.pathname === '/portall/dashboard';

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }

      if (isLoggedIn && isOnPortal) {
        return Response.redirect(new URL('/portall/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [],
}
