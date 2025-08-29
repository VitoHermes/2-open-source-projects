import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // 简化认证逻辑，主要依赖 Privy
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
