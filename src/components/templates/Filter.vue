<script setup>
import {computed} from "vue";
import {ElNotification} from "element-plus";
import {useCanvasTemplatesStore} from "../../store/canvasTemplates.js";

const canvasTemplatesStore = useCanvasTemplatesStore()

const emit = defineEmits(['update'])
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

const onSearch = () => {
  emit('update')
}

getTags()
</script>

<template>
<div class="filter">
  <el-select
      v-model="canvasTemplatesStore.canvasTemplatesFilters[`filter[tags]`]"
      filterable
      default-first-option
      :reserve-keyword="false"
      clearable
  >
    <el-option
        v-for="item in tags"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <el-button @click="onSearch">Шукати</el-button>
</div>
</template>

<style scoped>
.filter{
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>