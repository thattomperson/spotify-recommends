import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit'

import type { TracksResponse, PlayHistoryObject } from '../../../pages/api/tracks';

export type { PlayHistoryObject, TracksResponse }

type SongsState = {
  now_playing: SpotifyApi.TrackObjectSimplified | null
  recent: SpotifyApi.PlayHistoryObject[]
  now_recommending: SpotifyApi.TrackObjectSimplified | null
  recommends: SpotifyApi.TrackObjectSimplified[]
  refreshing: boolean
}

const initialState: SongsState = {
  now_playing: null,
  recent: [],
  now_recommending: null,
  recommends: [],
  refreshing: false,
}

export const refresh = createAsyncThunk(
  'songs/refresh',
  async () => {
    try {
      const response = await fetch(`/api/tracks`)
      return (await response.json()) as TracksResponse
    } catch (err) {
      window.location.assign('/api/login')
    }
  }
)

type Action<T> = {
  meta: { [key: string]: any }
  payload: T
  type: string
}

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    nowPlaying: (state, action) => {
      state.now_playing = action.payload
    },
    recent: (state, action) => {
      state.recent = action.payload
    },
    nowRecommending: (state, action) => {
      state.now_recommending = action.payload
    },
    recommends: (state, action) => {
      state.recommends = action.payload
    },
  },
  extraReducers: {
    [refresh.pending]: (state) => {
      state.refreshing = true
    },
    [refresh.fulfilled]: (state, action: Action<TracksResponse>) => {
      state.refreshing = false
      console.log( {action})
      state.now_playing = action.payload.now_playing
      state.recent = action.payload.recent
    },
    [refresh.rejected]: (state) => {
      state.refreshing = false
    }
  }
})

/**
 * Extract count from root state
 *
 * @param   {Object} state The root state
 * @returns {number} The current count
 */
export const selectNowPlaying = (state) => state.songs.now_playing
export const selectRecent = (state) => state.songs.recent
export const selectRefreshing = (state) => state.songs.refreshing

export const {
  nowPlaying,
  recent,
  nowRecommending,
  recommends,
} = songsSlice.actions

export default songsSlice.reducer