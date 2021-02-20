import { signIn, useSession } from 'next-auth/client';
import { useState } from 'react';

import Cover from '../components/Cover';
import RecentlyPlayedList from '../components/RecentlyPlayedList';
import RecommendList from '../components/RecommendList';
import { useTracks } from '../data/tracks';

const IndexPage = () => {
  const [session, loading] = useSession();
  const [basedOn, setBasedOn] = useState(null);
  const { now_playing } = useTracks();

  if (session && basedOn === null && now_playing !== null) {
    setBasedOn(now_playing);
  }

  return (
    <>
      {!session && !loading && (
        <>
          <Cover>
            <button onClick={() => signIn('spotify')} className="flex justify-center py-2 px-4 text-sm font-medium rounded-md text-pink-600 bg-white hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              Sign in with Spotify
            </button>
          </Cover>
        </>
      )}
      {session && (
        <>
          <div className="grid grid-cols-2 gap-4 my-4">
            <RecentlyPlayedList onRecommend={async (track) => setBasedOn(track)} />
            <RecommendList basedOn={basedOn} onRecommend={async (track) => setBasedOn(track)} />
          </div>
          <h4 className="text-4xl text-center">
            made with ❤️ by <a className="underline" href="https://ttp.sh">ttp</a>
          </h4>
        </>
      )}
    </>
  );
};

export default IndexPage;
