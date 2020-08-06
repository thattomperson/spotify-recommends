import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      scope: [
        'user-read-private',
        'user-read-email',
        'user-read-currently-playing',
        'user-read-recently-played',
        'playlist-modify-private',
        'playlist-modify-public',
        'user-read-playback-state',
      ].join('%20'),
    }),
    // ...add more providers here
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    jwt: async (token, user, account, profile, isNewUser) => {
      if (account) {
        token.refresh_token = account.refreshToken;
        token.access_token = account.accessToken;
      }
      // const isSignIn = (user) ? true : false
      // // Add auth_time to token on signin in
      // if (isSignIn) { token.auth_time = Date.now() }
      return Promise.resolve(token);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
