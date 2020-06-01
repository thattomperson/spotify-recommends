import { configureStore } from '@reduxjs/toolkit'

import clockReducer from './slices/clock';
import counterReducer from './slices/counter';
import notesReducer from './slices/notes';

export default configureStore({
  reducer: {
    counter: counterReducer,
    clock: clockReducer,
    notes: notesReducer,
  }
})