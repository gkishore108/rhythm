<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div class="playlist-details" v-if="playlist">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverurl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button @click="handleDelete" v-if="ownership">Delete Playlist</button>
    </div>
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs added to the playlist yet.
      </div>
      <div class="single-song" v-for="song in playlist.songs" :key="song.id">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="handleClick(song.id)">delete</button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import AddSong from "@/components/AddSong";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["id"],
  components: { AddSong },
  setup(props) {
    const { error, document: playlist } = getDocument("playlists", props.id);
    const { user } = getUser();
    const { deleteImage } = useStorage();
    const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
    const router = useRouter();

    const handleClick = async (songId) => {
      const filteredSong = playlist.value.songs.filter(
        (song) => song.id != songId
      );

      await updateDoc({
        songs: filteredSong,
      });
    };

    const handleDelete = async () => {
      await deleteImage(playlist.value.path);
      await deleteDoc();
      router.push({ name: "Home" });
    };

    const ownership = computed(() => {
      return (
        playlist.value && user.value && playlist.value.userId == user.value.uid
      );
    });

    return { error, playlist, ownership, handleDelete, handleClick };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}

.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}

.cover img {
  /* display: block; */
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  max-height: 100%;
}

.playlist-info {
  text-align: center;
}

.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}

.playlist-info p {
  margin-bottom: 20px;
}

.username {
  color: #999;
}

.description {
  text-align: center;
}

.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
