
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("Attempting to authorize...");
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}oauth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grant_type: 'password',
            client_id: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_AUTH_SECRET_ID,
            username: credentials?.username,
            password: credentials?.password,
          }),
        })
        console.log("Backend response status:", res.status);
        const user = await res.json()
        console.log("Backend response body:", user);

        if (res.ok && user) {
          console.log("Authorization successful.");
          return { ...user, accessToken: user.access_token }
        }
        console.log("Authorization failed.");
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken
      return session
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirecting to:", url, "from base URL:", baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  pages: {
    signIn: '/',
  }
})

export { handler as GET, handler as POST }
