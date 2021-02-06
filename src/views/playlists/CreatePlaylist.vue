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
    <button>Create Playlist</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const typeError = ref(null);

    const { error, filePath, fileUrl, upload } = useStorage();

    const types = ["image/jpeg", "image/png"];
    const handleSubmit = async () => {
      if (file.value) {
        await upload(file.value);
        console.log("Image uploaded and url is", fileUrl.value);
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

    return { title, description, handleSubmit, handleChange, typeError };
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
