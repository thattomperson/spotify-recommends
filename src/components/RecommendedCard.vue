<template>
  <div class="card">
    <div class="card-content">
      <a title="Open in Spotify" :href="`spotify:${track.uri}`"><h1 class="track-name" v-text="track.name" /></a>
      <h3 class="album-name">{{ track.artists[0].name }}</h3>
      <player ref="player" @play="$emit('play')" @pause="$emit('pause')" v-if="track.preview_url" :src="track.preview_url" />
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
    }
  }
}
</script>

<style scoped>
.card-content {
  width: 100%;
}
</style>

