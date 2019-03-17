<template>
  <div class="card">
      <div class="card-img-cont" :style="`background-image: url(${song.track.album.images[0].url});`">
      </div>
      <div class="card-content">
        <h1 class="song-name" v-text="song.track.name" />
        <h3 class="album-name">{{ song.track.album.name }} - {{ song.artists[0].name }}</h3>

        <div class="genres" v-if="song.artists">
          <template v-for="artist in song.artists">
            <span v-for="genre in artist.genres" class="chip" :key="genre">{{ genre | title }}</span>
          </template>
        </div>
      </div>
    </div>
</template>


<script>
export default {
  props: ['song'],
  filters: {
    title(str) {
      str = str.toLowerCase();
      str = str.split(' ');
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
      }
      
      return str.join(' ');
    }
  },
}
</script>
