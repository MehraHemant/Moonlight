import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
const ALLOW_LIST= ['myviews.ds@gmail.com', 'reachudyan@gmail.com'];

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }){
      if(account && profile){
        let googleProfile = profile as GoogleProfile
        if (account.provider === "google") {
          return googleProfile.email_verified && ALLOW_LIST.includes(googleProfile.email);
        }
      }
      return "NON_ALLOWED_EMAIL" 
    }
  },
  session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }