<template>
    <div class="wrap">
        <div class="top">
            <div class="hosname">北京xx医院</div>
            <div class="line"></div>
            <div>专科</div>
            <div>.</div>
            <div class="hosdepartment">多发性硬化专科门诊</div>
        </div>
        <div class="center">
            <h1 class="time">2023年6月3日</h1>
            <div class="container">
                <div class="item" v-for="item in 6" :key="item">
                    <div class="top1">123</div>
                    <div class="bottom">345</div>
                </div>
            </div>
            <el-pagination layout="prev, pager,next" :total="50" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { reqHospitalWork } from '@/api/hospital';
import { useRoute} from 'vue-router';
import type {HospitalWorkData} from '@/api/hospital/type';
//获取路由对象
let $route = useRoute()
let pageNo = ref<number>(1);
//每一页展示几条数据
let limit = ref<number>(6);
//组件挂载完毕发一次请求
onMounted(()=>{
    fetchWorkData();
});

//获取挂号的数据
const fetchWorkData = async ()=>{
    let result:HospitalWorkData = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string);
    
}
</script>

<style scoped lang="scss">
.wrap{
    .top{
        display: flex;
        color:#7f7f7f;
        .line{
            width: 3px;
            height: 20px;
            background: skyblue;
            margin: 0px 5px;
        }
        .dot{
            margin: 0px 5px;
            color: skyblue;
        }
    }

    .center{
        margin: 20px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .time{
            font-weight: 900;
        }
        .container{
            width: 100%;
            display: flex;
            margin: 30px 0px;
            .item{
                flex:1;
                width: 100%;
                border: 1px solid skyblue;
                margin: 0px 5px;
                // display: flex;
                // flex-direction: column;
                // align-items: center;
                .top1{
                    background: #e8f2ff;
                    height: 30px;
                    width: 100%;
                    text-align: center;
                    line-height: 30px;
                }
                .bottom{
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                }
            }
        }
    }
}

</style>