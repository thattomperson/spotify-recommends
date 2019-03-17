<template>
  <div id="app">
    <recent-list />
    <recommended-list />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import RecentList from './components/RecentList'
import RecommendedList from './components/RecommendedList'

export default {
  name: 'app',
  mounted() {
    this.update()
      .then(() => {
        setInterval(() => this.updateSongs(), 10000)
      })
  },
  components: {
    RecentList,
    RecommendedList
  },
  computed: {
    ...mapGetters([
      'tracks',
      'recommendations',
      'loading'
    ]),
  },
  methods: {
    ...mapActions([
      'updateTracks',
      'updateRecommendations',
    ]),
    update() {
      return this.updateTracks()
        .then(() => this.updateRecommendations())
    }
  }
}
</script>

<style>
:root {
  --background: #C9A2D2;
  --card-bg: #EBDDEE;
  --color: #404E88;
}

* {
  box-sizing: border-box;
}
.fader {
  font-size: 1.5em;
  color: var(--card-bg);
  opacity: 0;
  transition: opacity 200ms;
  margin: 10px;
}
.show {
  opacity: 1;
}

body, html {
  margin: 0;
  padding: 0;
  color: var(--color);
  background: var(--background);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.recent, .recomended {
  width: 100%;
}

#app {
  max-width: 1300px;
  margin: auto;
  display: flex;
  justify-content: space-around;
}

.card {
  display: flex;
  background: var(--card-bg);
  margin: 10px auto;
  max-width: 600px;
}

.card-img-cont {
  min-width: 12rem;
  min-height: 12rem;
  height: auto;
  overflow: hidden;
  background-size: cover;
}

.card-img {
  width: 100%;
}

.card-content {
  padding: 1rem;
}

.chip {
  display: inline-block;
  margin: 0 5px 1px 0;
  border: 1px solid var(--color);
  border-radius: 3px;
  padding: 3px;
}

a {
  color: var(--color);
}

.btn {
  position: relative;
  background: transparent;
  color: var(--card-bg);
  border: 2px solid var(--card-bg);
  font-size: 1.5em;
  border-radius: 50%;
  width: 48px;
  height: 48px;
}


.card h1, .card h3 {
  margin: 0 0 5px 0;
}

header {
  margin: 10px auto;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
