import { createApp } from 'vue'
import '@/style/reset.scss'

import App from '@/App.vue'
//引入全局组件
import HospitalTop from '@/components/hospital_top/index.vue';
import HospitalBottom from '@/components/hospital_bottom/index.vue';
import Login from "@/components/login/index.vue";
//引入vue-router核心插件并安装
import router from '@/router';
//引入element-plus插件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//国际化文件
import zhCn from 'element-plus/es/locale/lang/zh-cn';
//引入pinia仓库
import pinia from '@/store'
//利用createApp方法创建应用实例，且将应用实例挂在到挂载点上
const app = createApp(App);
import Visitor from '@/components/visitor/visitor.vue';
app.component('HospitalTop', HospitalTop);
app.component('HospitalBottom', HospitalBottom);
app.component('Login', Login);
app.component('Visitor', Visitor);
//安装vue-router
app.use(router)
//安装element-plus
app.use(ElementPlus,{
    locale:zhCn
})
//安装pinia仓库
app.use(pinia);
//挂载应用实例
app.mount('#app')
