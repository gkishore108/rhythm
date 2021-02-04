<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../../composables/useLogin";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const { error, login, isPending } = useLogin();

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        console.log("User Logged In");
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style></style>
