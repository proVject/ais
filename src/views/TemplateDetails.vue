<script setup>
import {computed, onBeforeUnmount, ref} from "vue";
import {useAuthStore} from "../store/auth.js";
import {ElNotification} from "element-plus";
import {useRoute, useRouter} from "vue-router";
import {useCanvasTemplatesStore} from "../store/canvasTemplates.js";
import {useAuthProtection} from "../hooks/useAuthProtection.js";
import canvasTemplates from "../api/canvasTemplates.js";

useAuthProtection()

const route = useRoute()
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

const onUpdate = async () => {
  formEl.value.validate(async (valid) => {
    if (!valid) return
    try {
      await canvasTemplatesStore.updateCanvasTemplate(route.params.id, formState.value)
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

const getCanvasTemplateDetails = async () => {
  try {
    await canvasTemplatesStore.getCanvasTemplateDetails(route.params.id)
    formState.value.name = canvasTemplatesStore.canvasTemplateDetails.name
    formState.value.width = Number.parseFloat(canvasTemplatesStore.canvasTemplateDetails.width) || null
    formState.value.height = Number.parseFloat(canvasTemplatesStore.canvasTemplateDetails.height) || null
    formState.value.description = canvasTemplatesStore.canvasTemplateDetails.description
    formState.value.tags = canvasTemplatesStore.canvasTemplateDetails.tags
    imageDataUrl.value = canvasTemplatesStore.canvasTemplateDetails.preview_image

    formState.value.preview_image = canvasTemplatesStore.canvasTemplateDetails.preview_image

    // const blob = await fetch(canvasTemplatesStore.canvasTemplateDetails.preview_image).then(res => res.blob())
    // formState.value.preview_image = new File([blob], 'preview.jpg', { type: blob.type }) // або будь-яке ім’я
  } catch (e) {
    ElNotification.error({
      message: e.message,
    })
    router.push({ name: "Index" })
  }
}

getTags()
getCanvasTemplateDetails()

onBeforeUnmount(() => {
  canvasTemplates.$reset()
})
</script>

<template>
  <div class="new-template" v-if="authStore.isLoggedIn">
    <h2 v-if="canvasTemplatesStore.canvasTemplateDetailsLoading">Завантаження...</h2>
    <el-card v-else-if="canvasTemplatesStore.canvasTemplateDetails">
      <template #header>
        <span>Редагувати шаблон</span>
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
        <el-button type="primary" plain :loading="canvasTemplatesStore.updateCanvasTemplateLoading" @click="onUpdate">Оновити</el-button>
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