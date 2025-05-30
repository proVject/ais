import { defineStore } from 'pinia'
import CanvasTemplatesApi from "../api/canvasTemplates.js";

const serializeCanvasTemplate = (newTemplate) => {
    const formData = new FormData()
    formData.append('name', newTemplate.name)
    formData.append('width', String(newTemplate.width))
    formData.append('height', String(newTemplate.height))
    formData.append('description', newTemplate.description || '')
    if (newTemplate.preview_image) formData.append('preview_image', newTemplate.preview_image || '')
    if (newTemplate.tags?.length) {
        newTemplate.tags.forEach(tag => {
            formData.append('tags[]', tag)
        })
    }
    else {
        formData.append('tags', [])
    }
    return formData
}

export const useCanvasTemplatesStore = defineStore('canvasTemplates', {
    state: () => ({
        canvasTemplates: [],
        canvasTemplatesLoading: false,
        canvasTemplatesError: null,
        canvasTemplatesFilters: {
            [`filter[tags]`]: null
        },

        // // pagination
        // canvasTemplatesPerPage: 10,
        // canvasTemplatesCurrentPage: 10,
        // canvasTemplatesTotalCount: 10,

        canvasTemplateTags: [],
        canvasTemplateTagsLoading: false,
        canvasTemplateTagsError: null,

        canvasTemplateDetails: [],
        canvasTemplateDetailsLoading: false,
        canvasTemplateDetailsError: null,

        createCanvasTemplateLoading: false,
        updateCanvasTemplateLoading: false,
        deleteCanvasTemplateLoading: false,
    }),
    actions: {
        async getCanvasTemplates() {
            try {
                this.canvasTemplatesLoading = true
                const data = await CanvasTemplatesApi.getCanvasTemplates( this.canvasTemplatesFilters)
                this.canvasTemplates = data
                return data
            } catch (e) {
                this.canvasTemplatesError = e
                throw Error(e.response.data.message)
            } finally {
                this.canvasTemplatesLoading = false
            }
        },
        async getCanvasTemplateTags() {
            try {
                this.canvasTemplateTagsLoading = true
                const data = await CanvasTemplatesApi.getCanvasTemplateTags()
                this.canvasTemplateTags = data
                return data
            } catch (e) {
                this.canvasTemplateTagsError = e
                throw Error(e.response.data.message)
            } finally {
                this.canvasTemplateTagsLoading = false
            }
        },
        async getCanvasTemplateDetails(id) {
            try {
                this.canvasTemplateDetailsLoading = true
                const data = await CanvasTemplatesApi.getCanvasTemplateDetails(id)
                this.canvasTemplateDetails = data
                return data
            } catch (e) {
                this.canvasTemplateDetailsError = e
                throw Error(e.response.data.message)
            } finally {
                this.canvasTemplateDetailsLoading = false
            }
        },
        async createCanvasTemplate(newTemplate) {
            try {
                this.createCanvasTemplateLoading = true
                const tmp = serializeCanvasTemplate(newTemplate)
                const data = await CanvasTemplatesApi.createCanvasTemplate(tmp)
                return data
            } catch (e) {
                throw Error(e.response.data.message)
            } finally {
                this.createCanvasTemplateLoading = false
            }
        },
        async updateCanvasTemplate(id, newTemplate) {
            try {
                this.updateCanvasTemplateLoading = true
                const tmp = serializeCanvasTemplate(newTemplate)
                const data = await CanvasTemplatesApi.updateCanvasTemplate(id, tmp)
                return data
            } catch (e) {
                throw Error(e.response.data.message)
            } finally {
                this.updateCanvasTemplateLoading = false
            }
        },
        async deleteCanvasTemplate(id) {
            try {
                this.deleteCanvasTemplateLoading = true
                const data = await CanvasTemplatesApi.deleteCanvasTemplate(id)
                return data
            } catch (e) {
                throw Error(e.response.data.message)
            } finally {
                this.deleteCanvasTemplateLoading = false
            }
        },
    }
})