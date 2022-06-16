import { signIn, useSession } from 'next-auth/react';

import { useState } from 'react';

import Cover from '../components/Cover';
import RecentlyPlayedList from '../components/RecentlyPlayedList';
import RecommendList from '../components/RecommendList';
import TopTrackList from '../components/TopTracksList';
import { useTracks } from '../data/tracks';

const IndexPage = () => {
  const { data: session, status } = useSession();
  const [basedOn, setBasedOn] = useState(null);

  const { now_playing, recent } = useTracks();

  if (session && basedOn === null) {
    if (now_playing !== null) {
      setBasedOn(now_playing);
    } else if (recent.length > 0) {
      setBasedOn(recent[0].track)
    }
  }

  return (
    <>
      {status == 'unauthenticated' && (
        <>
          <Cover>
            <button onClick={() => signIn('spotify')} className="flex justify-center py-2 px-4 text-sm font-medium rounded-md text-pink-600 bg-white hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              Sign in with Spotify
            </button>
          </Cover>
        </>
      )}
      {session && status == 'authenticated' && (
        <>
          <div className="grid grid-cols-3 gap-4 my-4">
            <RecentlyPlayedList onRecommend={async (track) => setBasedOn(track)} />
            <RecommendList basedOn={basedOn} onRecommend={async (track) => setBasedOn(track)} />
            <TopTrackList onRecommend={async (track) => setBasedOn(track)} />
          </div>
          <div className='flex w-full justify-evenly mb-10'>
            <h4 className="text-4xl text-center">
              made with ❤️ by <a className="underline" href="https://ttp.sh">ttp</a>
            </h4>

            <h4 className="text-4xl text-center flex">
              View analytics by <a className='ml-2' href="https://app.usefathom.com/share/pnbtwnvn/spotify+recommends">
                <img alt="Fathom" style={{ height: '1em' }} src="https://usefathom.com/assets/images/brand/fathom-logo-dark.svg" />
              </a>
            </h4>
          </div>
        </>
      )}
    </>
  );
};

export default IndexPage;
