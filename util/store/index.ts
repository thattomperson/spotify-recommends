import { configureStore } from '@reduxjs/toolkit'

import clockReducer from './slices/clock';
import counterReducer from './slices/counter';
import songsReducer from './slices/songs';

export default configureStore({
  reducer: {
    counter: counterReducer,
    clock: clockReducer,
    songs: songsReducer,
  }
})