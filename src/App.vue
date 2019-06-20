<template>
  
  <div id="app">
    <fa class="logo" :icon="['far', 'registered']" />
    <recent-list class="list" />
    <recommended-list class="list" />
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
        setInterval(() => this.updateTracks(), 10000)
      })
  },
  components: {
    RecentList,
    RecommendedList,
  },
  computed: {
    ...mapGetters([
      'tracks',
      'recommendations',
      'loading',
    ]),
  },
  methods: {
    ...mapActions([
      'updateTracks',
      'updateRecommendations',
    ]),
    update() {
      return this.updateTracks()
        .then(() => this.updateRecommendations({
          track: this.tracks[0].track
        }))
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Quicksand|Roboto&display=swap');

:root {
  --background: #C9A2D2;
  --card-bg: #EBDDEE;
  --color: #404E88;
}

header {
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  margin: 10px auto;
}


.logo {
  color: var(--card-bg);
  font-size: 20em;
  position: fixed;
  margin: 20px;
  left: 0;
  z-index: 0;
  transform: rotate(30deg)
}

.list {
  z-index: 1;
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
  font-family: 'Roboto', sans-serif;
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

header {
  margin: 0;
}

[title] {
  position: relative;
}
[title]::after {
  opacity: 0;
  display: none;
  transition: opacity 200ms;
  content: attr(title);
  position: absolute;
  background: black;
  padding: 10px;
  margin: 0 auto;
  left: 50%;
  transform: translate(-50%);
  color: var(--card-bg);
  border-radius: 3px;
  width: max-content;
  bottom: -100%;
}

[title]:hover::after {
  display: block;
  opacity: 1;
  transition-delay: 200ms;
}

</style>
