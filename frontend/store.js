import { writable, get } from 'svelte/store';
import { ReadableUpdatingLoadable, DereivedLoadable } from './extended-svelte-store';
import axios from 'axios'

export const recentTracks = ReadableUpdatingLoadable([], auth(updateRecents), 10000)
export const recommendedBasedOn = writable(undefined)
export const recommendedTracks = DereivedLoadable(recommendedBasedOn, [], auth(updateRecommened))


function auth(fn) {
  return async function (...args) {
    try {
      return await fn(...args)
    } catch (e) {
      window.location = '/_/auth'
    } 
  } 
}


async function updateRecents(set) {
  const res = await axios.get('/_/tracks')

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

  set(res.data.tracks)
}