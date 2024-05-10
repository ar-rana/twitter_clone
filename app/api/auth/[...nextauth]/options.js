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

  secret: process.env.NETXAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      session.user.username = session.user.name.split(" ").join("").toLocaleLowerCase()
      session.user.uid = token.sub
      return { ...session }
    }    
  }
};
