<template>
  <div class="player">
    <audio @playing="update" @paused="update" @timeupdate="update" ref="player" :src="src" />
    <fa @click="toggle" class="icon" :icon="playing ? 'pause' : 'play'" />
    <progress :value="progress" max="1" />
  </div> 
</template>

<script>
export default {
  props: ['src'],
  data: () => ({
    playing: false,
    progress: 0,
  }),
  methods: {
    toggle() {
      if (this.playing) {
        this.pause()
      } else {
        this.play()
      }
    },
    play() {
      this.$refs.player.play()
      this.$emit('play')
    },
    pause() {
      this.$refs.player.pause()
      this.$emit('pause')
    },
    update() {
      let p = this.$refs.player;
      
      this.progress = p.currentTime / p.duration;
      this.playing = !this.$refs.player.paused
    }
  }
}
</script>

<style scoped>
.player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.icon {
  margin-right: 5px;
}

progress {
  flex-grow: 1;
  color: var(--color);
  background: transparent;
  height: 8px;  
  -webkit-appearance: none;
  appearance: none;
  vertical-align: top;
  border-width: 1px;
  border-style: solid;
  border-color: currentcolor;
  overflow: hidden;
}

progress[value]::-webkit-progress-bar {
  background-color: transparent;
}

progress[value]::-webkit-progress-value {
  background-color: var(--color);;
}
</style>

