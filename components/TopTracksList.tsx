import { signOut, useSession } from 'next-auth/react';
import { useTracks } from '../data/tracks';
import Skeleton from './Skeleton';
import TrackCard, { CardMedia } from './TrackCard';


const TopTracksList = (props: {
  onRecommend
}) => {
  const { top, loading } = useTracks();
  const { data: session } = useSession();

  const username = session?.user?.name ?? <Skeleton width="80%" height={'2rem'} />;
  const email = session?.user?.email ?? <Skeleton width="60%" height={'1.5rem'} />;

  return (
    <div className="space-y-4">
      <h1>you</h1>
      <div className="card shadow">
        <CardMedia src={session.user.image} />
        <div className="card-details">
          <div>
            <h5>{username}</h5>
            <h6>{email}</h6>
          </div>
          <div className="flex flex-row-reverse text-black dark:text-white space-x-1">
            <button onClick={() => signOut()} className="flex justify-center py-2 px-4 text-sm font-medium rounded-md text-pink-600 bg-white hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              Sign out
            </button>
          </div>
        </div>
      </div>

      <h1>your top tracks</h1>
      {loading
        ? Array(20)
          .fill(null)
          .map((item, index) => <TrackCard key={index}></TrackCard>)
        : top.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            onRecommend={props.onRecommend}
          ></TrackCard>
        ))}
    </div>
  );
};

export default TopTracksList;
