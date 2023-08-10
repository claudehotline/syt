<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!--用户展示就诊人信息-->
   
    <el-card class="box-card">
      <!--卡片的头部-->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User">添加就诊人</el-button>
        </div>
      </template>
      <!--卡片的身体部分显示就诊人信息-->
      <div class="user">
        <Visitor v-for="item in 4" :key="item" class="item"></Visitor>
      </div>
    </el-card>
    <!--展示医生的信息-->
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue';
import Visitor from './visitor/index.vue';
</script>

<style scoped>
.container{
  .tip{
    font-weight: 900;
    color:#7f7f7f;
    font-size: 20px;
  }
  .box-card{
    margin: 20px 0px;
    .card-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .user{
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 32%;
        margin: 5px;
      }
    }
  }
}
</style>