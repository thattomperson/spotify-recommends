import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: {
      tracks: false,
      recommendations: false,
      playlists: false,
    },
    // ...require('./test.json'),
    tracks: [],
    recommendations: [],
    playlists: [],
  },
  mutations: {
    tracks (state, newtracks) {
      console.log(state, newtracks)
      state.tracks = newtracks;
      state.loading.tracks = false;
    },
    loadingTracks (state) {
      state.loading.tracks = true;
    },
    recommendations (state, newRecommendations) {
      state.recommendations = newRecommendations;
      state.loading.recommendations = false;
    },
    loadingRecommendations (state) {
      state.loading.recommendations = true;
    },
    playlists (state, newPlaylists) {
      state.playlists = newPlaylists;
      state.loading.playlists = false;
    },
    loadingPlaylists (state) {
      state.loading.playlists = true;
    },
  },
  actions: {
    updateTracks({ commit }) {
      commit('loadingTracks', true)

      return axios.get("/_/tracks")
        .then(res => {
          commit('tracks', res.data.tracks)
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            window.location.pathname = '/_/auth'
          }
          throw err
        })

    },
    updateRecommendations({ state, commit }) {
      commit('loadingRecommendations', true)

      console.log(state)

      if (state.tracks.length === 0) {
        return
      }

      return axios.get(`/_/recommendations?id=${state.tracks[0].track.id}`)
        .then(res => {
          commit('recommendations', res.data.recommendations)
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            window.location.pathname = '/_/auth'
          }
          throw err
        })
    },
    updatePlaylists({ commit }) {
      commit('loadingPlaylists', true)

      return axios.get("/_/playlists")
        .then(res => {
          commit('playlists', res.data.playlists)
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            window.location.pathname = '/_/auth'
          }
          throw err
        })
    }
  },
  getters: {
    tracks: state => state.tracks,
    loading: state => state.loading,
    recommendations: state => state.recommendations,
    playlists: state => state.playlists,
  }
})
