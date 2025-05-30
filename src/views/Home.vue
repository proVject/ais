<script setup>
import TemplateCard from '../components/templates/Card.vue'
import TemplatesFilter from '../components/templates/Filter.vue'
import {useAuthProtection} from "../hooks/useAuthProtection.js";
import {useAuthStore} from "../store/auth.js";
import {useCanvasTemplatesStore} from "../store/canvasTemplates.js";
import {ElNotification} from "element-plus";
import {onBeforeUnmount} from "vue";
const canvasTemplatesStore = useCanvasTemplatesStore()
const authStore = useAuthStore()

useAuthProtection()

const getCanvasTemplates = async () => {
  try{
    await canvasTemplatesStore.getCanvasTemplates()
  } catch (e) {
    ElNotification.error({
      message: e.message,
    })
  }
}
getCanvasTemplates()

const onUpdate = () => {
  getCanvasTemplates()
}

onBeforeUnmount(() => {
  canvasTemplatesStore.$reset()
})
</script>

<template>
<div class="templates" v-if="authStore.isLoggedIn">
  <div class="header">
    <h1>Шаблони</h1>
    <templates-filter @update="onUpdate" />
  </div>
  <h2 v-if="!canvasTemplatesStore.canvasTemplates.length && !canvasTemplatesStore.canvasTemplatesLoading">Немає шаблонів</h2>
  <h2 v-else-if="canvasTemplatesStore.canvasTemplatesLoading">Завантаження...</h2>
  <div class="templates-list" v-else>
    <template-card
        @update="onUpdate"
        v-for="t of canvasTemplatesStore.canvasTemplates" :key="t.id" :template="t"/>
  </div>
</div>
</template>

<style scoped>
.templates {
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: normal;
  max-width: 1220px;
  margin: 0 auto;
}
.templates-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}
.header{
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
</style>