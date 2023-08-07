<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级：</div>
            <ul class="hospital">
                <li :class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
                <li v-for="level in levelArr" :class="{active:activeFlag==level.value}" :key="level.value" @click="changeLevel(level.value)">{{ level.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from '@/api/home';
import { onMounted, ref } from 'vue';
import type { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '@/api/home/type';
//定义一个数组存储医院等级数据
let levelArr = ref<HospitalLevelAndRegionArr>([])
//控制医院等级高亮响应式数组
let activeFlag = ref<string>('')
onMounted(() => {
    getLevel();
});

const getLevel = async() => {
    let result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HosType');
    //存储医院等级的数组
    if(result.code==200){
        levelArr.value = result.data;
    }
};

//点击等级的按钮回调
const changeLevel = (level:string) => {
    //高亮响应式数据存储level数值
    activeFlag.value = level;
}
</script>

<script lang="ts">
    export default {
        name: "Level",
    }
</script>

<style scoped lang="scss">
.level {
    color: #7f7f7f;
    h1 {
        font-weight: 900;
        margin: 10px 0px;
    }
    .content{
        display: flex;
        .left{
            margin-right: 10px;
        }
        .hospital{
            display: flex;
            li{
                margin-right: 10px;
                &.active{
                    color: #55a6fe;
                }
            }
            li:hover{
                color: #55a6fe;
                cursor: pointer;
            }
        }
    }
}
</style>