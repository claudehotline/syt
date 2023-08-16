<template>
    <!--就诊人管理组件-->
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>就诊人管理</span>
                <el-button class="button" type="primary" :icon="User" @click="addUser">添加就诊人</el-button>
            </div>
        </template>
        <!--就诊人管理模块展示就诊人信息的结构-->
        <div class="visitors" v-if="scene == 0">
            <Visitor @removeUser="removeUser" @changeScene="changeScene" class="item" v-for="(user, index) in userArr" :key="user.id" :user="user"
                :index="index" />
        </div>
        <!--添加就诊人或者修改已有就诊人信息的结构-->
        <div class="form" v-if="scene == 1">
            <el-divider content-position="left">就诊人信息</el-divider>
            <el-form style="width: 60%; margin:10px auto">
                <el-form-item label="用户姓名">
                    <el-input placeholer="请输入用户姓名" v-model="userParams.name" />
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请你选择证件的类型" style="width:100%;" v-model="userParams.certificatesType">
                        <el-option v-for="item in certificatesType" :key="item.id" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholer="请输入证件号码" v-model="userParams.certificatesNo" />
                </el-form-item>
                <el-form-item label="用户性别">
                    <el-radio-group v-model="userParams.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker v-model="userParams.birthday" value-format="YYYY-MM-DD" type="date"
                        placeholer="请你选择日期" />
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="userParams.phone" placeholer="请输入用户手机号码" />
                </el-form-item>
            </el-form>
            <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
            <el-form style="width:60%;margin: 10px auto;">
                <el-form-item label="婚姻状况">
                    <el-radio-group v-model="userParams.isMarry">
                        <el-radio :label="1">已婚</el-radio>
                        <el-radio :label="0">未婚</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="自费/医保">
                    <el-radio-group v-model="userParams.isInsure">
                        <el-radio :label="1">自费</el-radio>
                        <el-radio :label="0">医保</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="当前住址" v-model="userParams.addressSelect">
                    <el-cascader :props="props" />
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input placeholer="请输入用户详细地址" v-model="userParams.address" />
                </el-form-item>
            </el-form>
            <el-divider content-position="left">联系人信息（选填）</el-divider>
            <el-form style="width: 60%; margin:10px auto" label-width="80">
                <el-form-item label="用户姓名">
                    <el-input placeholer="请输入用户姓名" v-model="userParams.contactName" />
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请你选择证件的类型" style="width:100%;" v-model="userParams.contactCertificatesType">
                        <el-option v-for="item in certificatesType" :key="item.id" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholer="请输入证件号码" v-model="userParams.contactCertificatesNo" />
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholer="请输入用户手机号码" v-model="userParams.contactPhone" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="default" @click="submit">提交</el-button>
                    <el-button type="primary" size="default" @click="reset">重写</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script setup lang="ts">
//@ts-ignore
import { imageEmits, type CascaderProps, ElMessage } from 'element-plus';
import { User } from '@element-plus/icons-vue';
import { reqGetUser } from '@/api/hospital';
import { reqCertificationType, reqCity, reqAddOrUpdateUser } from '@/api/user';
import { onMounted, ref, reactive, watch } from 'vue';
import type { UserResponseData, UserArr } from '@/api/hospital/type';
import type { CertificationTypeResponseData, CertificateArr, AddOrUpdateUser } from '@/api/user/type';
import { useRouter, useRoute } from 'vue-router';
let $route = useRoute();
let $router = useRouter();
let userArr = ref<UserArr>([])
//存储证件类型的数据
let certificatesType = ref<CertificateArr>([])
//收集新增就诊人的数据
let userParams = reactive<AddOrUpdateUser>({
    name: '',
    certificatesType: '',
    certificatesNo: '',
    sex: 0,
    birthday: '',
    phone: '',
    isMarry: 0,
    isInsure: 0,
    addressSelect: [],
    address: '',
    contactName: '',
    contactCertificatesType: '',
    contactCertificatesNo: '',
    contactPhone: '',
})
//定义一个响应式数据：决定显示数据的内容
let scene = ref<number>(0)
//当组件挂载完毕获取一次就诊人的信息
onMounted(() => {
    //获取就诊人信息
    getAllUser();
    //获取证件类型的数据
    getCertificatesType();
    //判断：当前这个路由组件是不是从挂号组件而来，路径上是携带了query参数type=add
    if ($route.query.type == 'add') {
        scene.value = 1;
    }

    if ($route.query.type == 'edit') {
        scene.value = 1;
    }
})

const getAllUser = async () => {
    let result: UserResponseData = await reqGetUser();

    if (result.code == 200) {
        userArr.value = result.data;
    }
}

//添加就诊人按钮的回调
const addUser = () => {
    //清空上次的数据
    reset();
    scene.value = 1;
}

const reset = () => {
    Object.assign(userParams, {
        name: null,
        certificatesType: '',
        certificatesNo: '',
        sex: 0,
        birthday: '',
        phone: '',
        isMarry: 0,
        isInsure: 0,
        addressSelect: [],
        address: '',
        contactName: '',
        contactCertificatesType: '',
        contactCertificatesNo: '',
        contactPhone: '',
    })
}

//就诊人自定义事件的回调
const changeScene = (user: AddOrUpdateUser) => {
    scene.value = 1;
    //收集已有的就诊人的信息
    Object.assign(userParams, user);
}

//获取证件类型的接口
const getCertificatesType = async () => {
    let result: CertificationTypeResponseData = await reqCertificationType();
    if (result.code == 200) {
        certificatesType.value = result.data;
    }
}

//级联选择器数据
const props = {
    lazy: true,
    async lazyLoad(node: any, resolve: any) {
        let result: any = await reqCity(node.data.id || '86');
        //整理数据
        let showData = result.data.map((item: any) => {
            return {
                id: item.id,
                label: item.name,
                value: item.value,
                leaf: !item.hasChildren
            }
        });
        resolve(showData);
    }
}

//提交按钮的方法的回调
const submit = async () => {
    //要么新增纠正人|更新一个已有的就诊人
    try {
        await reqAddOrUpdateUser(userParams);
        //提示文字
        ElMessage({
            type: 'success',
            message: userParams.id ? '更新成功' : '新增成功'
        })
        //判断提交按钮的时候是不是从预约挂号而来
        if ($route.query.type) {
            $router.back();
        } else {
            scene.value = 0;
        }
        getAllUser();
    } catch (error) {
        ElMessage({
            type: 'error',
            message: userParams.id ? '更新失败' : '更新失败'
        });
    }
}

//监听所有就诊人的数据
watch(
    () => userArr.value, 
    () => {
        if ($route.query.type == 'edit') {
            let user = userArr.value.find((item:any)=> {
                return item.id==$route.query.id;
            });
            Object.assign(userParams, user);
        }
});

//子组件的自定义事件：删除按钮触发
const removeUser = () => {
    getAllUser();
}
</script>

<style scoped lang="scss">
.box-card {
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.visitors {
    display: flex;
    flex-wrap: wrap;

    .item {
        width: 32%;
        margin: 5px;
    }
}
</style>