<script setup>
import {ref} from "vue";
import {useAuthStore} from "../store/auth.js";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";
import {useCanvasTemplatesStore} from "../store/canvasTemplates.js";

const router = useRouter()
const authStore = useAuthStore()

const formEl = ref(null)
const formState = ref({
  email: '',
  password: '',
  remember_me: '0'
})

const rules = {
  email: [
    { type: 'email', message: 'Не валідний електронний адрес' },
    { required: true, message: 'Обов\'язкове поле' },
  ],
  password: [
    { required: true, message: 'Обов\'язкове поле' },
  ]
}

const onLogin = async () => {
  formEl.value.validate(async (valid) => {
    if (!valid) return
    try {
      await authStore.login(formState.value)
      ElNotification.success({
        title: 'Успіх',
        message: "Вхід виконано успішно",
      })
      router.push({ name: "Index" })
    } catch (e) {
      ElNotification.error({
        title: 'Помилка',
        message: e.message,
      })
    }
  })
}

</script>

<template>
  <div class="login">
    <el-card>
      <template #header>
        <span>Увійти</span>
      </template>
      <el-form ref="formEl" :model="formState" :rules="rules">
        <el-form-item prop="email">
          <el-input placeholder="Електронна адреса" v-model="formState.email" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="Пароль" v-model="formState.password" />
        </el-form-item>
        <el-form-item>
          <el-checkbox true-value="1" false-value="0" label="Запам'ятати мене" v-model="formState.remember_me" />
        </el-form-item>
        <el-button type="primary" plain :loading="authStore.loginLoading" @click="onLogin">Увійти</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login{
  height: 100%;
  padding: 40px;
  display: flex;
  align-items: normal;
  justify-content: center;
}
.el-card{
  width: 100%;
  max-width: 600px;
  height: fit-content;
}
.el-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>