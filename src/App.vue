<template>
  <Navbar />
  <div class="content">
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  components: { Navbar },
};
</script>

<style>
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
