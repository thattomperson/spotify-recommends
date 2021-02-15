import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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

  if (basedOn === null && now_playing !== null) {
    setBasedOn(now_playing);
  }

  return (
    <>
      {!session && !loading && (
        <>
          <Cover>
            <div style={{ textAlign: 'center' }}>
              <Button variant="contained" onClick={() => signIn('spotify')}>
                Sign in with Spotify
              </Button>
            </div>
          </Cover>
        </>
      )}
      {session && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <RecentlyPlayedList onRecommend={setBasedOn} />
            </Grid>
            <Grid item xs={6}>
              <RecommendList basedOn={basedOn} onRecommend={setBasedOn} />
            </Grid>
          </Grid>
          <Typography variant="h4" align="center">
            made with ❤️ by ttp
          </Typography>
        </>
      )}
    </>
  );
};

export default IndexPage;
