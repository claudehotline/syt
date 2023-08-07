<template>
    <div class="region">
        <div class="content">
            <div class="left">地区：</div>
            <ul>
                <li :class="{active:RegionFlag==''}" @click="changeRegion('')">全部</li>
                <li v-for="item in RegionArr" :key="item.value" :class="{active:RegionFlag==item.value}" @click="changeRegion(item.value)">{{ item.name }}</li>
            </ul>
        </div>

    </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from '@/api/home';
import { onMounted, ref } from 'vue';
import type { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '@/api/home/type';


let RegionArr = ref<HospitalLevelAndRegionArr>([])
//地区高亮的响应式数据
let RegionFlag = ref<string>('')
//地区组件挂载完毕获取地区数据
onMounted(() => {
    getRegion();
});

const getRegion = async () => {
    let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin');

    console.log(result)
    //存储全部地区的数据
    if (result.code == 200) {
        RegionArr.value = result.data;
    }
};

//点击地区的按钮回调
const changeRegion = (region: string) => {
    //高亮响应式数据存储region数值
    RegionFlag.value = region;

    //触发自定义事件：将region参数回传给父组件
    $emit('getRegion', region);
}

let $emit = defineEmits(['getLevel'])
</script>

<script lang="ts">
export default {
    name: "Region",
}
</script>

<style scoped lang="scss">
.region {
    color: #7f7f7f;
    margin-top: 10px;

    .content {
        display: flex;

        .left {
            margin-right: 10px;
            width: 48px;
        }

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                margin-right: 10px;
                margin-bottom: 10px;

                &.active {
                    color: #55a6fe;
                }
            }

            li:hover {
                color: #55a6fe;
                cursor: pointer;
            }
        }
    }
}
</style>