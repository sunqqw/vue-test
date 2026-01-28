<script setup>
const vHlight = {
  mounted(el) {
    el.style.backgroundColor = 'highlight'
  }
}

</script>

<template>
  <div v-hlight>
    <h1>Welcome to Vue!</h1>
  </div>
</template>
