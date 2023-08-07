<template>
    <div>
        <!--首页轮播图-->
        <Carousel />
        <!--首页搜索医院的表单-->
        <Search />
        <!--底部展示医院结构-->
        <el-row gutter="20px">
            <el-col :span="20">
                <!--等级子组件-->
                <Level />
                <!--地区子组件-->
                <Region />
                <!--展示医院的结构-->
                <div class="hospital">
                    <Card class="item" v-for='(item,index) in hasHospitalArr' :key='index' :hospitalInfo="item"/>
                </div>
                <!--分页器-->
                <el-pagination
                        v-model:current-page="pageNo"
                        v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 30, 40]"
                        :backgroud="true"
                        layout="prev, pager, next, jumper, -> ,sizes, total"
                        :total="total"
                        @current-change="currentChange"
                        @size-change="sizeChange"
                    />
            </el-col>
            <el-col :span="4">456</el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
//引入组合式API函数
import {onMounted} from 'vue'
import {reqHospital} from '@/api/home'
//引入首页轮播图组件
import Carousel from './carousel/index.vue'
//引入首页搜索的表单组件
import Search from './search/index.vue'
//引入首页医院等级的组件
import Level from './level/index.vue'
//引入首页医院地区的组件
import Region from './region/index.vue'
//引入首页医院结构的组件
import Card from './card/index.vue'
import type {Content, HospitalResponseData} from '@/api/home/type'

//分页器需要的数组
import {ref} from 'vue'
//分页器页码
let pageNo = ref<number>(1)
//分页器每页显示的条数
let pageSize = ref<number>(10)
//存储已有医院的数据
let hasHospitalArr = ref<Content>([]);
//存储已有医院的总个数
let total = ref<number>(0);
//组件挂载完毕：发送一次请求
onMounted(()=>{
    getHospitalInfo();
});

//获取已有医院的数组
const getHospitalInfo = async() => {
    //获取医院的数据：默认获取第一页、一页十个医院的数据
    let result:HospitalResponseData = await reqHospital(pageNo.value, pageSize.value);
    if(result.code==200){
        //存储已有的医院数据
        hasHospitalArr.value = result.data.content;
        //存储医院的总个数
        total.value = result.data.totalElements
    }
}

//分页器页码发生变化时候的回调
const currentChange = () => {
    getHospitalInfo();
}

//分页器下拉菜单发生变化的时候会触发
const sizeChange = () => {
    getHospitalInfo();
}
</script>

<style scoped lang="scss">
.hospital{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item{
        width: 48%;
        margin: 10px 0px;
    }
}
</style>