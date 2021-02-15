import useSWR from 'swr';
import { signIn } from 'next-auth/client';

const fetcher = (url) => fetch(url).then((r) => r.json());

export function useTracks() {
  const { data, error, isValidating } = useSWR('/api/tracks', fetcher, {
    refreshInterval: 10e3,
  });

  if (error || (data && data.error && data.error.statusCode === 401)) {
    signIn('spotify');
  }

  return {
    recent: (data && data.recent) ?? [],
    now_playing: (data && data.now_playing) ?? null,
    first_loading: !data && !error,
    loading: !data && !error && isValidating,
    isValidating,
  };
}

export function useRecommended(track?: SpotifyApi.TrackObjectSimplified) {
  const { data, error, isValidating } = useSWR(
    track ? `/api/recommended?id=${track.id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 5e3,
    }
  );

  if (error || (data && data.error && data.error.statusCode === 401)) {
    signIn('spotify');
  }

  return {
    recommended: (data && data.tracks) ?? [],
    first_loading: !data && !error,
    loading: !data && !error && isValidating,
    isValidating,
  };
}
