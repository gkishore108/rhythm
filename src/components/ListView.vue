<template>
  <div v-for="doc in playlists" :key="doc.id">
    <router-link :to="{ name: 'PlayListDetails', params: { id: doc.id } }">
      <div class="single">
        <div class="thumbnail">
          <img :src="doc.coverurl" />
        </div>
        <div class="info">
          <h3>{{ doc.title }}</h3>
          <p>created by {{ doc.userName }}</p>
        </div>
        <div class="song-number">
          <p>{{ doc.songs.length }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["playlists"],
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}

.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}

img {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

.info {
  margin: 0 30px;
}

.song-number {
  margin-left: auto;
}
</style>
