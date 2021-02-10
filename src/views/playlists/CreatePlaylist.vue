<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input required type="text" placeholder="Playlist Title" v-model="title" />
    <textarea
      required
      placeholder="Enter Description..."
      v-model="description"
    ></textarea>
    <label> Upload playlist cover image</label>
    <input type="file" @change="handleChange" />
    <div class="error">
      {{ typeError }}
    </div>
    <div v-if="!isPending">
      <button>Create Playlist</button>
    </div>
    <div v-else>
      <button disabled>Loading</button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";

import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const typeError = ref(null);

    const router = useRouter();

    const { filePath, fileUrl, upload, isPending } = useStorage();

    const { error, addDoc } = useCollection("playlists");

    const { user } = getUser();

    const types = ["image/jpeg", "image/png"];

    const handleSubmit = async () => {
      if (file.value) {
        await upload(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverurl: fileUrl.value,
          path: filePath.value,
          createdAt: timestamp(),
          songs: [],
        });
        if (!error.value) {
          router.push({ name: "PlayListDetails", params: { id: res.id } });
        }
      }
    };

    const handleChange = (e) => {
      const selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        typeError.value = null;
      } else {
        file.value = null;
        typeError.value = "Please upload imgae of type JPEG or PNG";
      }
    };

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      typeError,
      isPending,
    };
  },
};
</script>

<style scoped>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  margin-top: 30px;
  font-size: 14px;
  display: block;
}
button {
  margin-top: 20px;
}
</style>
