<script setup>
import {FALLBACK_IMAGE} from "../../constants/content.js";
import {ElNotification} from "element-plus";
import {useCanvasTemplatesStore} from "../../store/canvasTemplates.js";

const canvasTemplatesStore = useCanvasTemplatesStore()
const emit = defineEmits(['update'])
const props = defineProps({
  template: { type: Object, required: true },
})

const onDelete = () => {
  const confirmed = confirm("Ви впевнені що хочете видалити цей шаблон?")
  if (confirmed) deleteTemplate()
}

const deleteTemplate = async () => {
  try {
    await canvasTemplatesStore.deleteCanvasTemplate(props.template.id)
    ElNotification.error({
      message: 'Шаблон було видалено успішно',
    })
    emit('update')
  } catch (e) {
    ElNotification.error({
      message: e.message,
    })
  }
}
</script>

<template>
  <el-card :header="template.name">
    <div class="content">
      <img :src="template.preview_image || FALLBACK_IMAGE" alt="preview">
      <div class="actions">
        <router-link :disabled="canvasTemplatesStore.deleteCanvasTemplateLoading" :to="{name: 'TemplateDetails', params: { id: template.id }}">
          <el-button :disabled="canvasTemplatesStore.deleteCanvasTemplateLoading" type="primary">Редагувати</el-button>
        </router-link>
        <el-button :disabled="canvasTemplatesStore.deleteCanvasTemplateLoading" @click="onDelete" type="danger">Видалити</el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.el-card {
  width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}
.el-card:deep(.el-card__body) {
  flex: 1;
}
.content{
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  justify-content: space-between;
  height: 100%;
}
img{
  max-width: 100%;
  height: 100%;
  max-height: 200px;
  object-fit: cover;
}
.actions{
  display: flex;
  gap: 10px;
}
</style>