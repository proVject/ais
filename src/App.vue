<script setup>
import MainHeader from './components/main/Header.vue'
</script>

<template>
  <div class="main-wrapper">
    <main-header />
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.main-wrapper{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main-content{
  flex: 1;
}
</style>
