<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <header>
    <!-- <Navbar /> -->
  </header>
  <main>
    <RouterView />
  </main>
  <footer class=" text-center">
    <p class="bg-dark text-light">Story Tracker by G.Marlin</p>
  </footer>
</template>

<style lang="scss"></style>
