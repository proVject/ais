import { createApp } from 'vue'
import App from './App.vue'
import {router} from '@/routers/index.js'
import {createPinia} from "pinia";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
import './assets/css/style.css'

const pinia = createPinia()

const app = createApp(App);
app.use(ElementPlus);
app.use(router)
app.use(pinia)
app.mount('#app')
