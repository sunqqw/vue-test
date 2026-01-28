<script setup>
import { RouterView } from 'vue-router'
import MyHeader from './components/MyHeader.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="flex flex-col w-full">
    <my-header></my-header>
    <nav-bar></nav-bar>
  </div>
  <RouterView />
</template>

<style scoped></style>
