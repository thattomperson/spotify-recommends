<template>
  <div class="card">
    <div class="card-content">
      <a title="Open in Spotify" :href="`spotify:${track.uri}`"><h1 class="track-name" v-text="track.name" /></a>
      <h3 class="album-name">{{ track.artists[0].name }}</h3>
      <audio controls preload=none v-if="track.preview_url" :src="track.preview_url" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['track']
}
</script>
