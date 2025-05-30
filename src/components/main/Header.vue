<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "../../store/auth.js";
const router = useRouter()

const authStore = useAuthStore()

const onLogout = () => {
  authStore.logout()
  router.push({ name: 'Login' })
}

const activeIndex = ref('Index')
const handleSelect = (name) => {
  if (name === 'Logout') { return onLogout() }
  router.push({ name })
}
</script>

<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <div class="wrapper">
      <div class="left">
        <el-menu-item index="Index">
          Головна
        </el-menu-item>
        <el-menu-item index="Login" v-if="authStore.isLoggedIn === false">
          Увійти
        </el-menu-item>
        <el-menu-item index="Logout" v-if="authStore.isLoggedIn === true">
          Вийти
        </el-menu-item>
      </div>
      <div class="right">
        <router-link v-if="authStore.isLoggedIn" :to="{name: 'AddTemplate'}">
          <el-button type="primary">Створити шаблон</el-button>
        </router-link>
      </div>
    </div>
  </el-menu>
</template>

<style scoped>
.wrapper{
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  max-width: 1220px;
  width: 100%;
  margin: 0 auto;
}
.left{
  display: flex;
}
.right{
  margin-left: auto;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>