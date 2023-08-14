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
        <el-descriptions v-if="userInfo.authStatus==1" size="small" class="margin-top" :column="1" border style="margin: 20px auto">
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
                {{ userInfo.certificatesType=='10'?'身份证':'户口本' }}
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
        <el-form v-if="userInfo.authStatus==0" style="width:60%;margin: 20px auto;" label-width="80">
            <el-form-item label="用户姓名">
                <el-input placeholder="请输入用户姓名" />
            </el-form-item>
            <el-form-item label="证件类型">
                <el-select style="width:100%;" placeholder="请选择证件的类型">
                    <el-option :label="item.name" :value="item.value" v-for="(item, index) in arrType" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码">
                <el-input placeholder="请输入证件号码" />
            </el-form-item>
            <el-form-item label="上传证件">
                <el-upload 
                    list-type="picture-card">
                    <img style="width:100%;height:100%;" src="../../../assets/images/auth_example.png" />
                </el-upload>
                <el-dialog>
                    <img w-full alt="Preview"/>
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default">提交</el-button>
                <el-button type="primary" size="default">重写</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
//引入element-plus的图标
import { InfoFilled } from '@element-plus/icons-vue';
import { reqUserInfo, reqCertificationType } from '@/api/user';
import type { UserInfoResponseData, CertificationTypeResponseData, CertificateArr } from "@/api/user/type";
//引入组合式API
import { onMounted, ref } from 'vue';

//存储用户信息
let userInfo:any = ref<any>({});
let arrType = ref<CertificateArr>([])

//组件挂载完毕
onMounted(() => {
    //获取用户信息的方法
    getUserInfo();

    //获取证件类型的接口
    getType();
});

//获取用户信息的方法
const getUserInfo = async() => {
    let result:UserInfoResponseData = await reqUserInfo();

    if(result.code == 200){
        userInfo.value = result.data;
    }
}

//获取证件类型的数据
const getType = async() => {
    let result:CertificationTypeResponseData = await reqCertificationType();

    if(result.code==200) {
        arrType.value = result.data;
    }
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