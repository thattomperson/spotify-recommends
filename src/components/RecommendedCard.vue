<template>
  <div class="card">
    <div class="card-img-cont" :style="`background-image: url(${track.track.album.images[0].url});`">
      </div>
    <div class="card-content">
      <header>
        <a title="Open in Spotify" :href="`spotify:${track.track.uri}`">
          <h1 class="track-name" v-text="track.track.name"/>
        </a>
        <div class="actions">
          <a @click="related" title="Find related songs">
            <fa icon="search"/>
          </a>
          <a @click="add" title="Add to current playlist">
            <fa icon="plus"/>
          </a>
        </div>
      </header>
      <h3 class="album-name">{{ track.track.artists[0].name }}</h3>
      <player ref="player" @play="$emit('play')" @pause="$emit('pause')" v-if="track.track.preview_url" :src="track.track.preview_url" />
    </div>
  </div>
</template>

<script>
import Player from './Player'

export default {
  props: ['track'],
  components: {
    Player
  },
  methods: {
    pause() {
      if (this.$refs.player) this.$refs.player.pause();
    },
    add() {
      this.$http.get(`/_/add?id=${this.track.track.id}`)
    },
    related() {
      this.$store.dispatch('updateRecommendations', {
        track: this.track.track
      })
    }
  }
}
</script>
