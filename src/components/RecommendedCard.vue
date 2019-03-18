<template>
  <div class="card">
    <div class="card-content">
      <header>
        <a title="Open in Spotify" :href="`spotify:${track.uri}`">
          <h1 class="track-name" v-text="track.name"/>
        </a>
        <div class="actions">
          <a @click="add" title="Add to current playlist">
            <fa icon="plus"/>
          </a>
        </div>
      </header>
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
    },
    add() {
      this.$http.get(`/_/add?id=${this.track.id}`)
    }
  }
}
</script>

<style scoped>
.card-content {
  width: 100%;
}

header {
  margin: 0;
}

.actions a {
  display: block;
  margin-left: 5px;
  border: 2px solid var(--color);
  border-radius: 100%;
}

.actions svg {
  width: 30px;
  height: 30px;
  padding: 5px;
}
</style>

