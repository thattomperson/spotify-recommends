import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { tracks } from '../../../pages/api/tracks';

type SongsState = {
  now_playing: SpotifyApi.TrackObjectSimplified | null
  recent: SpotifyApi.PlayHistoryObject[]
  now_recommending: SpotifyApi.TrackObjectSimplified | null
  recommends: SpotifyApi.TrackObjectSimplified[]
}

const initialState: SongsState = {
  now_playing: null,
  recent: [],
  now_recommending: null,
  recommends: [],
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
})

/**
 * Extract count from root state
 *
 * @param   {Object} state The root state
 * @returns {number} The current count
 */
export const selectNowPlaying = (state) => state.songs.now_playing

export const {
  nowPlaying,
  recent,
  nowRecommending,
  recommends,
} = songsSlice.actions

export const refreshTracks = () => async (dispatch) => {
  const { now_playing, recent } = await tracks()
  songsSlice.actions.nowPlaying(now_playing)
}

export default songsSlice.reducer