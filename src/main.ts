import { createApp } from 'vue'
import Vant  from 'vant';
import {createWebHashHistory, createRouter, createWebHistory} from 'vue-router';
import 'vant/lib/index.css';
import App from './App.vue'
import routes from "./config/routes.ts";
import {getCurrentUser} from "./services/user.ts";
import * as process from "process";



const app = createApp(App)
const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        // 该路由需要登录权限

        const res =  getCurrentUser();
        console.log(res)
        if (res != null) {
            // 已登录
            next()
        } else {
            next('/user/login')
        }
    } else {
        next()
    }
})


app.use(Vant);
app.use(router);
app.mount('#app');



