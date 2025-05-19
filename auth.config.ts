import type { NextAuthConfig } from 'next-auth';
 
export const authConfig: NextAuthConfig = {
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/portal',  // Changed from '/portal' to '/' for worker login
        signOut: '/',
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24, // 24 hours
        updateAge: 60 * 60, // 1 hour
    },
    
    callbacks: {
        session: async({ session, token }) => {
            if (token) {
                session.user = {
                    ...session.user,
                    name: token.name || '',
                    email: token.email || '',
                    id: typeof token.id === 'string' ? token.id : '',
                    worker_category: token.worker_category || '',
                    is_verified: token.is_verified || false
                }
            }
            return session;
        },
        jwt: async({ token, user }) => {
            if (user) {
                token.id = user?.id;
                token.name = user?.name;
                token.email = user?.email;
                token.worker_category = user?.worker_category;
                token.is_verified = user?.is_verified;
            }
            return token;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = auth?.user;
            const isOnLoginPage = nextUrl.pathname === '/';
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            
            if (isOnDashboard) {
              if (isLoggedIn) return true;
              return false; // Redirect unauthenticated users to the login page
            }
            
            if (isLoggedIn && isOnLoginPage) {
              return Response.redirect(new URL('/portal/dashboard', nextUrl));
            }
            
            return true;
        },
    },
    providers: [],
};
