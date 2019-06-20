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

function updateRecents(recentTracks, loadingRecent) {
  loadingRecent(true);
  setTimeout(async () => {
    let res
    try {
      res = await axios.get('/_/tracks')
    } catch (e) {
      window.location = '/_/auth'
    }

    let rbo = get(recommendedBasedOn)
    if (!rbo) {
      recommendedBasedOn.set(res.data.tracks[0].track)
    }

    recentTracks(res.data.tracks)
    loadingRecent(false);
  }, 500)

  setTimeout(updateRecents, 10000, recentTracks, loadingRecent)
}

async function updateRecommened(track, set) {
  if (!track) {
    set([])
    return
  }

  let res
  try {
    res = await axios.get(`/_/recommendations?id=${track.id}`)
  } catch (e) {
    window.location = '/_/auth'
  }
  

  if (res.data.tracks === null) {
    window.location = '/_/auth'
  }

  set(res.data.tracks)
}

// updateRecents()