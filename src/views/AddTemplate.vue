<script setup>
import {computed, ref} from "vue";
import {useAuthStore} from "../store/auth.js";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";
import {useCanvasTemplatesStore} from "../store/canvasTemplates.js";
import {useAuthProtection} from "../hooks/useAuthProtection.js";

useAuthProtection()

const router = useRouter()
const authStore = useAuthStore()
const canvasTemplatesStore = useCanvasTemplatesStore()

const imageDataUrl = ref(null)
const formEl = ref(null)
const formState = ref({
  name: '',
  description: '',
  tags: [],
  width: null,
  height: null,
  preview_image: null
})

const rules = {
  name: [
    { required: true, message: 'Обов\'язкове поле' },
  ],
  width: [
    { required: true, message: 'Обов\'язкове поле' },
  ],
  height: [
    { required: true, message: 'Обов\'язкове поле' },
  ],
}

const onUploadFile = (file) => {
  const fr = new FileReader()
  fr.readAsDataURL(file)
  fr.onload = (e) => {
    imageDataUrl.value = e.target.result
    formState.value.preview_image = file
  }
}

const onCreate = async () => {
  formEl.value.validate(async (valid) => {
    if (!valid) return
    try {
      await canvasTemplatesStore.createCanvasTemplate(formState.value)
      ElNotification.success({
        title: 'Успіх',
        message: "Шаблон створено успішно",
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

const tags = computed(() => {
  return canvasTemplatesStore.canvasTemplateTags.map(tag => ({
    value: tag,
    label: tag,
  }))
})

const getTags = async () => {
  try {
    await canvasTemplatesStore.getCanvasTemplateTags()
  } catch (e) {
    ElNotification.error({
      message: e.message,
    })
  }
}

getTags()
</script>

<template>
  <div class="new-template" v-if="authStore.isLoggedIn">
    <el-card>
      <template #header>
        <span>Створити шаблон</span>
      </template>
      <el-form ref="formEl" :model="formState" :rules="rules" label-position="top">
        <el-form-item prop="name" label="Назва">
          <el-input v-model="formState.name" />
        </el-form-item>
        <el-form-item prop="description" label="Опис">
          <el-input resize="none" rows="4" type="textarea" v-model="formState.description" />
        </el-form-item>
        <el-form-item prop="tags" label="Теги">
          <el-select
              v-model="formState.tags"
              multiple
              filterable
              default-first-option
              :reserve-keyword="false"
          >
            <el-option
                v-for="item in tags"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="width" label="Ширина">
          <el-input-number min="1" style="width: 100%;" v-model="formState.width" />
        </el-form-item>
        <el-form-item prop="height" label="Висота">
          <el-input-number min="1" style="width: 100%;" v-model="formState.height" />
        </el-form-item>
        <el-form-item prop="preview_image" label="Зображення" label-position="left">
          <el-upload
              :show-file-list="false"
              :before-upload="onUploadFile"
              accept="image/*"
          >
            <img class="upload-image" v-if="formState.preview_image" :src="imageDataUrl" />
            <el-button v-else type="primary">Завантажити</el-button>
          </el-upload>
        </el-form-item>
        <el-button type="primary" plain :loading="canvasTemplatesStore.createCanvasTemplateLoading" @click="onCreate">Створити</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.new-template{
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
.upload-image{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
}
</style>