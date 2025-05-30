import {createRouter, createWebHistory} from 'vue-router'

import HomeView from '@/views/Home.vue'

const routes = [
    { name: 'Index', path: '/', component: HomeView },
    { name: 'AddTemplate', path: '/templates/add', component: () => import('@/views/AddTemplate.vue')},
    { name: 'TemplateDetails', path: '/templates/edit/:id', component: () => import('@/views/TemplateDetails.vue')},
    { name: 'Login', path: '/login', component: () => import('@/views/Login.vue')},
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})