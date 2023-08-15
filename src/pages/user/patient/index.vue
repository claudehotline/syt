<template>
    <!--就诊人管理组件-->
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
            <span>就诊人管理</span>
            <el-button class="button" type="primary" :icon="User">添加就诊人</el-button>
            </div>
        </template>
    </el-card>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.box-card{
    .card-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

</style>