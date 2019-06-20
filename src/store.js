import { writable, derived, readable, get } from 'svelte/store';

function ReadableUpdatableLoadable(value, update) {
  const { subscribe: vsubscribe, set: vset } = writable(value);
  const { subscribe: lsubscribe, set: lset } = writable(false);

  update(vset, lset)

  return [
    {subscribe: vsubscribe},
    {subscribe: lsubscribe}
  ]
}

function DereivedUpdatableLoadable(store, value, update) {
  const { subscribe: vsubscribe, set: vset } = writable(value);
  const { subscribe: lsubscribe, set: lset } = writable(false);

  store.subscribe(async (value) => {
    lset(true)
    await update(value, vset)
    lset(false)
  })

  return [
    {subscribe: vsubscribe},
    {subscribe: lsubscribe}
  ]
}


import axios from 'axios'

export const [recentTracks, loadingRecent] = ReadableUpdatableLoadable([], updateRecents)

export const recommendedBasedOn = writable(undefined)

export const [recommendedTracks, loadingRecommended] = DereivedUpdatableLoadable(recommendedBasedOn, [], updateRecommened)

async function updateRecents(setRecentTracks, setLoadingRecent) {
  setLoadingRecent(true);
  
  const res = await axios.get('/_/tracks')
  if (res.data.tracks === null) {
    window.location = '/_/auth'
  }

  let rbo = get(recommendedBasedOn)
  if (!rbo) {
    recommendedBasedOn.set(res.data.tracks[0].track)
  }

  setRecentTracks(res.data.tracks)
  setLoadingRecent(false);

  setTimeout(updateRecents, 10000, setRecentTracks, setLoadingRecent)
}

async function updateRecommened(track, set) {
  if (!track) {
    set([])
    return
  }

  const res = await axios.get(`/_/recommendations?id=${track.id}`)

  if (res.data.tracks === null) {
    window.location = '/_/auth'
  }

  set(res.data.tracks)
}

// updateRecents()