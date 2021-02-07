<template>
  <div class="navbar">
    <nav>
      <router-link :to="{ name: 'Home' }">
        <img src="../assets/logo.jpg" alt="logo"
      /></router-link>
      <!-- <h1><router-link :to="{ name: 'Home' }"> Rhythm</router-link></h1> -->
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'CreatePlaylist' }"
            >Create Playlist</router-link
          >
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">
            Signup
          </router-link>
          <router-link class="btn" :to="{ name: 'Login' }">
            Login
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, logout } = useLogout();
    const { user } = getUser();

    const router = useRouter();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log("User Logged out");
        router.push({ name: "Login" });
      }
    };

    return { handleClick, error, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}

nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

nav h1 {
  margin-left: 20px;
}

nav .links {
  margin-left: auto;
}

nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}

nav img {
  max-height: 60px;
}
</style>
