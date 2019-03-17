<template>
  <div class="card">
    <div class="card-content">
      <a title="Open in Spotify" :href="`spotify:${song.uri}`"><h1 class="song-name" v-text="song.name" /></a>
      <h3 class="album-name">{{ song.artists[0].name }}</h3>
      <audio controls preload=none v-if="song.preview_url" :src="song.preview_url" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['song']
}
</script>
