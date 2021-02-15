import { CircularProgress, IconButton, Typography } from '@material-ui/core';
import QueueIcon from '@material-ui/icons/Queue';
import { useState } from 'react';

import { useRecommended } from '../data/tracks';
import Stack from './Stack';
import TrackCard from './TrackCard';

const RecommendList = (props: {
  basedOn: Partial<SpotifyApi.TrackObjectFull>;
  onRecommend: (track: Partial<SpotifyApi.TrackObjectFull>) => void;
}) => {
  const { recommended, isValidating } = useRecommended(props.basedOn);
  const [queueing, setQueueing] = useState(false);

  const queueAll = async () => {
    setQueueing(true);
    for (let index = 0; index < recommended.length; index++) {
      const track = recommended[index];
      await fetch(`/api/queue?uri=${track.uri}`);
    }
    setQueueing(false);
  };

  return (
    <Stack>
      <Typography variant="h1">based on</Typography>
      <TrackCard
        onRecommend={props.onRecommend}
        track={props.basedOn}
      ></TrackCard>
      <Typography variant="h1">
        we recommend{' '}
        {isValidating && <CircularProgress color="inherit" size={20} />}
        <IconButton
          style={{ float: 'right', margin: '4px' }}
          onClick={queueAll}
          aria-label="queue song"
        >
          {queueing ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <QueueIcon />
          )}
        </IconButton>
      </Typography>
      {isValidating || recommended.length === 0
        ? Array(20)
            .fill(null)
            .map((item, index) => <TrackCard key={index}></TrackCard>)
        : recommended.map((track) => (
            <TrackCard
              key={track.id}
              onRecommend={props.onRecommend}
              track={track}
            ></TrackCard>
          ))}
    </Stack>
  );
};

export default RecommendList;
