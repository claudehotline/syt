<template>
    <!--实名认证组件-->
    <el-card class="box-card">
        <!--卡片头部-->
        <template #header>
            <div class="card-header">
                <h1>实名信息</h1>
            </div>
        </template>
        <!--实名认证结构的提示-->
        <div class="tip" style="color:#7f7f7f">
            <p>
                <el-icon>
                    <InfoFilled />
                </el-icon>
                完成实名认证后才能添加就诊人，正常挂号，为了不影响后续步骤，建议提前实名认证。
            </p>
        </div>
        <!--卡片身体的底部：认证成功的结构、认证为成功的结构-->
        <el-descriptions v-if="userInfo.authStatus == 1" size="small" class="margin-top" :column="1" border
            style="margin: 20px auto">
            <el-descriptions-item label-align="center" :width="20">
                <template #label>
                    <div class="cell-item">
                        用户姓名
                    </div>
                </template>
                {{ userInfo.name }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" :width="20">
                <template #label>
                    <div class="cell-item">
                        证件类型
                    </div>
                </template>
                {{ userInfo.certificatesType == '10' ? '身份证' : '户口本' }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" width="20px">
                <template #label>
                    <div class="cell-item">
                        证件号码
                    </div>
                </template>
                {{ userInfo.certificatesNo }}
            </el-descriptions-item>
        </el-descriptions>
        <!--用户未验证的结构-->
        <el-form v-if="userInfo.authStatus == 0" ref="form" style="width:60%;margin: 20px auto;" label-width="80" :model="params" :rule="rules">
            <el-form-item label="用户姓名" prop="name">
                <el-input placeholder="请输入用户姓名" v-model="params.name" />
            </el-form-item>
            <el-form-item label="证件类型" prop="certificatesType">
                <el-select style="width:100%;" placeholder="请选择证件的类型" v-model="params.certificatesType">
                    <el-option :label="item.name" :value="item.value" v-for="(item, index) in arrType"
                        :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="certificatesNo">
                <el-input placeholder="请输入证件号码" v-model="params.certificatesNo"/>
            </el-form-item>
            <el-form-item label="上传证件" prop="certificatesUrl">
                <el-upload ref="upload" list-type="picture-card" v-model="params.certificatesUrl"
                    action="/api/oss/file/fileUpload?fileHost=userAuah" :limit="1" :on-exceed="exceedHandler"
                    :on-success="successHandler" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <img style="width:100%;height:100%;" src="../../../assets/images/auth_example.png" />
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full v-if="params.certificatesUrl" style="height:100%;width:100%" :src="params.certificatesUrl"
                        alt="Preview" />
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="submit">提交</el-button>
                <el-button type="primary" size="default" @click="reset">重写</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
//引入element-plus的图标
import { InfoFilled } from '@element-plus/icons-vue';
import { reqUserInfo, reqCertificationType, reqUserCertification } from '@/api/user';
import type { UserParams, UserInfoResponseData, CertificationTypeResponseData, CertificateArr } from "@/api/user/type";
//引入组合式API
import { onMounted, ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
let upload = ref();
let form = ref();
//存储用户信息
let userInfo: any = ref<any>({});
let arrType = ref<CertificateArr>([])
//控制对话框的显示和隐藏
let dialogVisible = ref<boolean>(false)
//收集表单认证的数据
let params = reactive<UserParams>({
    certificatesNo: '',
    certificatesType: '',
    certificatesUrl: '',
    name: ''
});

//组件挂载完毕
onMounted(() => {
    //获取用户信息的方法
    getUserInfo();

    //获取证件类型的接口
    getType();
});

//获取用户信息的方法
const getUserInfo = async () => {
    let result: UserInfoResponseData = await reqUserInfo();

    if (result.code == 200) {
        userInfo.value = result.data;
    }
}

//获取证件类型的数据
const getType = async () => {
    let result: CertificationTypeResponseData = await reqCertificationType();

    if (result.code == 200) {
        arrType.value = result.data;
    }
}

//超出数量的钩子
const exceedHandler = () => {
    ElMessage({
        type: 'error',
        message: '图片只能上传一张'
    })
}

const successHandler = (response: any, uploadFile: any, uploadFiles: any) => {
    form.value.clearValidate('certificatesUrl');
    
    //收集上传成功的图片的地址
    params.certificatesUrl = response.data;
}

const handlePictureCardPreview = (uploadFile: any) => {
    dialogVisible.value = true;
}

const handleRemove = () => {
    params.certificatesUrl = '';
}

const reset = () => {
    upload.value.clearFiles();
    Object.assign(params, {
        certificatesNo: '',
        certificatesType: '',
        certificatesUrl: '',
        name: ''
    });
}

const submit = async() => {
    //进行全部表单校验返回一个成功的promise
    //如果有一个失败，返回的是一个失败的Promise，后面的语句就不会执行了
    await form.value.validate();
    try {
        await reqUserCertification(params);
        ElMessage({
            type: 'success',
            message: '认证成功',
        })
        //认证成功之后再次获取用户信息
        getUserInfo();
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '认证失败',
        })
    }
}

//自定义校验规则姓名方法
const validatorName = (rule:any, value:any, callBack:any) => {
    const reg=/^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;

    if(reg.test(value)){
        callBack();
    }else{
        callBack(new Error('请输入正确的中国人名字'))
    }
}

const validatorType = (rule:any, value:any, callBack:any) => {
    if(value=='10'||value=='20'){
        callBack();
    }else{
        callBack(new Error('请选择证件的类型'))
    }
}

const validatorNo = (rule:any, value:any, callBack:any) => {
    let sfz=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; 
    let hkb = /^\d{9}$/;
    if(sfz.test(value)||hkb.test(value)){
        callBack();
    }else{
        callBack(new Error('请输入身份证或户口本的号码'))
    }
}

const validatorUrl = (rule:any, value:any, callBack:any) => {
    if(value.length){
        callBack();
    }else{
        callBack(new Error('请上传证件照图片'))
    }
}

const rules = {
    name: [
        {required:true, validator: validatorName}
    ],
    certificatesType: [
        {required:true, validator: validatorType}
    ],
    certificatesNo: [
        {required:true, validator: validatorNo}
    ],
    certificatesUrl: [
        {required: true, validator: validatorUrl}
    ]
}


</script>

<style scoped lang="scss">
.box-card {
    .tip {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>