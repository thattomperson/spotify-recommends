import Swal from 'sweetalert2';

import { signIn } from 'next-auth/react';
import useSWR from 'swr';
import { AddResponse } from '../pages/api/add';
import * as Fathom from 'fathom-client';

const fetcher = (url) => fetch(url).then((r) => r.json());

interface Tracks {
  recent: SpotifyApi.PlayHistoryObject[];
  top: SpotifyApi.TrackObjectFull[];
  now_playing?: SpotifyApi.TrackObjectFull;
  first_loading: boolean;
  loading: boolean;
  isValidating: boolean;
}

export function useTracks(): Tracks {
  const { data, error, isValidating } = useSWR('/api/tracks', fetcher, {
    refreshInterval: 10e3,
  });

  if (error || (data && data.error && data.error.statusCode === 401)) {
    signIn('spotify');
  }

  return {
    recent: (data && data.recent) ?? [],
    now_playing: (data && data.now_playing) ?? null,
    top: (data && data.top) ?? [],
    first_loading: !data && !error,
    loading: !data && !error && isValidating,
    isValidating,
  };
}

interface Recommended {
  recommended: SpotifyApi.TrackObjectFull[];
  first_loading: boolean;
  loading: boolean;
  isValidating: boolean;
}

export function useRecommended(
  track?: Partial<SpotifyApi.TrackObjectFull>,
): Recommended {
  const { data, error, isValidating } = useSWR(
    track ? `/api/tracks/${track.id}/recommended` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 5e3,
    },
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

export function addTrackToPlaylist(
  track: Partial<SpotifyApi.TrackObjectFull>,
  playlist_id: string = null,
) {
  return addTracksToPlaylist([track], playlist_id);
}

export function queueTrack(
  track: Partial<SpotifyApi.TrackObjectFull>,
): Promise<any> {
  return queueTracks([track]);
}

export function queueTracks(
  tracks: Partial<SpotifyApi.TrackObjectFull>[],
): Promise<any> {
  Fathom.trackGoal('WFSCEJUX', tracks.length);

  const qs = tracks.map((track) => `uri=${track.uri}`).join('&');
  return fetch(`/api/tracks/queue?${qs}`);
}

export async function addTracksToPlaylist(
  tracks: Partial<SpotifyApi.TrackObjectFull>[],
  playlist_id: string = null,
): Promise<any> {
  Fathom.trackGoal('S2WUVZLG', tracks.length);

  const qs = tracks.map((track) => `uri=${track.uri}`);

  if (playlist_id) {
    qs.push(`playlist=${playlist_id}`);
  }

  const result: AddResponse = await fetch(`/api/add?${qs.join('&')}`).then(
    (res) => res.json(),
  );

  if (result.success === false) {
    if (result.reason === 'no-playlist') {
      const { playlists } = await fetch('/api/playlists').then((res) =>
        res.json(),
      );

      let options = {};
      for (let i = 0; i < playlists.length; i++) {
        const playlist = playlists[i];
        options[playlist.id] = playlist.name;
      }

      const result = await Swal.fire({
        title: 'Choose a playlist',
        input: 'select',
        inputOptions: options,
      });

      if (result.isConfirmed) {
        return addTracksToPlaylist(tracks, result.value);
      }
    } else if (result.reason === 'duplicates') {
      Swal.fire({
        title:
          tracks.length > 1
            ? 'Songs are already in the playlist'
            : 'Song is already in the playlist',
        toast: true,
        position: 'bottom-end',
        timer: 5e3,
        timerProgressBar: true,
        icon: 'warning',
      });
    }
  } else {
    Swal.fire({
      title:
        tracks.length > 1
          ? 'Songs have been added to the playlist'
          : 'Song has been added the playlist',
      toast: true,
      position: 'bottom-end',
      timer: 5e3,
      timerProgressBar: true,
      icon: 'success',
    });
  }

  return result;
}
