import { writable, get } from 'svelte/store';
import { ReadableUpdatingLoadable, DereivedLoadable } from './extended-svelte-store';
import axios from 'axios'

export const recentTracks = ReadableUpdatingLoadable([], updateRecents, 10000)
export const recommendedBasedOn = writable(undefined)
export const recommendedTracks = DereivedLoadable(recommendedBasedOn, [], updateRecommened)


async function updateRecents(set) {
  const res = await axios.get('/_/tracks')
  if (res.data.tracks === null) {
    window.location = '/_/auth'
  }

  let rbo = get(recommendedBasedOn)
  if (!rbo) {
    recommendedBasedOn.set(res.data.tracks[0].track)
  }

  set(res.data.tracks)
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