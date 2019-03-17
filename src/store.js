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
          commit('tracks', res.tracks)
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            window.location.pathname = '/_/auth'
          }
          throw err
        })

    },
    updateRecommendations({ commit }) {
      commit('loadingRecommendations', true)

      return axios.get("/_/recommendations")
        .then(res => {
          commit('recommendations', res.tracks)
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
          commit('playlists', res.tracks)
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
