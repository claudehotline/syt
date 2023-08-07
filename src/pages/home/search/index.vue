<template>
    <div class="search">
        <el-autocomplete  clearable class="form"
            placeholder="请你输入医院的名称" />
        <el-button type="primary" size="default" @click="" :icon="Search">搜索</el-button>
    </div>
</template>

<script setup lang="ts">
//引入element-plus的图标
import { Search } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.search {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    //深度选择器:>>> /deep/ ::v-deep
    ::v-deep(.el-input__wrapper) {
        width: 600px;
        margin-right: 10px;
    }
}
</style>