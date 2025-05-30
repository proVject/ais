import axios from "./axios";

const getCanvasTemplates = (params) => {
    return axios.get(`/api/v1/canvas_templates`, {params}).then(res => res.data)
}
const getCanvasTemplateDetails = (id) => {
    return axios.get(`/api/v1/canvas_templates/${id}`).then(res => res.data)
}
const createCanvasTemplate = (data) => {
    return axios.post(`/api/v1/canvas_templates`, data).then(res => res.data)
}
// todo put on update api doc mistake wrong method
// todo always "The given data was invalid."
const updateCanvasTemplate = (id, data) => {
    return axios.patch(`/api/v1/canvas_templates/${id}`, data).then(res => res.data)
}
const deleteCanvasTemplate = (id) => {
    return axios.delete(`/api/v1/canvas_templates`, { data: { id } }).then(res => res.data)
    // by API (wrong api description) DELETE method does not have any body :)
    // return axios.delete(`/api/v1/canvas_template`, { id }).then(res => res.data)
}
const getCanvasTemplateTags = () => {
    return axios.get(`/api/v1/canvas_templates/tags/list`).then(res => res.data)
}


export default {
    getCanvasTemplates,
    getCanvasTemplateDetails,
    createCanvasTemplate,
    updateCanvasTemplate,
    deleteCanvasTemplate,
    getCanvasTemplateTags,
}