// import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

//const baseURL = process.env.NEXTAUTH_URL;

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLECLIENT_ID,
      clientSecret: process.env.GOOGLECLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/api/auth/signin",
    // error: '/auth/error',
    // signOut: '/api/auth/signout'
  },
};
