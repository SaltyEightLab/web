import { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google"; // Google プロバイダーをインポート
import NextAuth from "next-auth";

export const config: NextAuthConfig = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
    Google({ // Google プロバイダーを追加
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  trustHost: true,
  basePath: "/api/auth",
  callbacks: {
    authorized({ request, auth }) {
      try {
        const { pathname } = request.nextUrl;
        if (pathname === "/protected-page") return !!auth;
        return true;
      } catch (err) {
        console.log(err);
      }
    },
    jwt({ token, user }) {
      if (user) { // ユーザーがサインイン時に利用可能
        token.id = user.id; // JWTトークンにユーザーIDを追加
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string; // セッションにユーザーIDを追加
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);