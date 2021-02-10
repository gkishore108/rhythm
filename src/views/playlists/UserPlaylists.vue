<template>
  <div v-if="playlists">
    <ListView :playlists="playlists" />
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a new playlist</router-link
    >
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView";

export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    return { playlists };
  },
};
</script>

<style></style>
