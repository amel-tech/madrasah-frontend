import { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { env } from '~/env';

const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: env.KEYCLOAK_CLIENT_ID ?? '',
      clientSecret: env.KEYCLOAK_CLIENT_SECRET ?? '',
      issuer: env.KEYCLOAK_ISSUER ?? '',
      idToken: true,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken as string;
      return session;
    },
  },
};
export default authOptions;
