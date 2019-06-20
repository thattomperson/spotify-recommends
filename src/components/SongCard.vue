<template>
  <div class="card">
    <div class="card-img-cont" :style="`background-image: url(${track.track.album.images[0].url});`">
      </div>
    <div class="card-content">
      <header>
        <a ref="trackName" title="Open in Spotify" :href="`spotify:${track.track.uri}`">
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
      <div class="genres" v-if="genres.length && (genresOpen || genres.length < 3)">
        <span v-for="genre in genres" class="chip" :key="genre">{{ genre | title }}</span>
      </div>
      <div v-else>
        <span class="chip">{{ genres[0] | title }}</span>
        <span class="chip">{{ genres[1] | title }}</span>
        <span class="chip" @click="genresOpen = true">More <fa icon="plus" /></span>
      </div>
    </div>
  </div>
</template>

<style scoped>

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

.card h1, .card h3 {
  margin: 0 0 5px 0;
  font-family: 'Quicksand', sans-serif;
}

.card-content {
  padding: 1rem;
  width: 100%;
}

.card-content header {
  display: grid;
  grid-template-columns: 1fr 25px;
  align-items: stretch;
}

.actions a {
  display: block;
  margin-top: 1px;
  border: 1px solid var(--color);
  border-radius: 100%;
  width:25px;
  height:25px;
}

.actions a:first-child {
  margin-top: 0px;

}

.actions svg.svg-inline--fa {
  width: 100%;
  height: 100%;
  padding: 4px;
}

</style>


<script>
import Player from './Player'
// import fitty from 'fitty'

export default {
  props: ['track'],
  data() {
    return {
      genresOpen: false
    }
  },
  components: {
    Player
  },
  mounted() {
    // fitty(this.$refs.trackName, {
    //   maxSize: 30,
    //   multiLine
    // })
  },
  computed: {
    genres() {
      return this.track.artists.reduce((acc, artist) => {
        return acc.concat(artist.genres)
      }, []);
    }
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
  },
  filters: {
    title(str) {
      str = str.toLowerCase();
      str = str.split(' ');
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
      }
      
      return str.join(' ');
    }
  }
}
</script>
