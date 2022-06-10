import NextAuth from 'next-auth';
import SpotifyProvider from "next-auth/providers/spotify";


const options = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: { params: { scope: [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-top-read',
        'user-read-currently-playing',
        'user-read-recently-played',
        'playlist-modify-private',
        'playlist-modify-public',
        'user-read-playback-state',
      ].join(' ') } },
      profile(profile, tokens) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url ?? 'https://placeholdmon.ttp.sh/100x100'
        }
      }
    }),
  ],
  callbacks: {
     async jwt({ token, account }) {
      console.log(account)

      if (account) {
        token.refresh_token = account.refresh_token;
        token.access_token = account.access_token;
      }
      // const isSignIn = (user) ? true : false
      // // Add auth_time to token on signin in
      // if (isSignIn) { token.auth_time = Date.now() }
      return Promise.resolve(token);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
