<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { SET_TOKEN } from '@/utils/user';

import { SET_TOKEN }
//获取用户信息
import {useRoute} from 'vue-router';

//获取路由对象
let $route = useRoute();

//持久化存储用户信息
SET_TOKEN(JSON.stringify($route.query))
//访问此路由组件代码执行成功：授权成功
let html:any = document.querySelector('html');
html?.style.display = 'none';
</script>

<style scoped>

</style>