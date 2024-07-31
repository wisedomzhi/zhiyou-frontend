import { createApp } from 'vue'
import Vant  from 'vant';
import {createWebHashHistory, createRouter, createWebHistory} from 'vue-router';
import 'vant/lib/index.css';
import App from './App.vue'
import routes from "./config/routes.ts";



const app = createApp(App)
const router = createRouter({
    history: createWebHistory(),
    routes,
})

app.use(Vant);
app.use(router);
app.mount('#app');



