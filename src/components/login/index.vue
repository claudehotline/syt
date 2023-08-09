<template>
    <div class="login_container">
        <el-dialog v-model="userStore.visible" title="用户登录" ref="dialog">
            <!--对话框身体部分的结构-->
            <el-row>
                <!--左侧结构：手机号码登录或微信登录-->
                <el-col :span="12">
                    <div class="login">
                        <div v-show="scene == 0">
                            <el-form :model="loginParam" :rules="rules" ref="form">
                                <el-form-item prop="phone">
                                    <el-input v-model="loginParam.phone" placeholder="请输入手机号码"
                                        :prefix-icon="User"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input v-model="loginParam.code" placeholder="请输入手机验证码"
                                        :prefix-icon="Lock"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :disabled="!isPhone || flag ? true : false">
                                        <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                                        <span v-else @click="getCode">获取验证码</span>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <el-button style="width:100%" type="primary" size="default"
                                :disabled="!isPhone || loginParam.code.length < 6 ? true : false"
                                @click="login">用户登录</el-button>
                            <div class="bottom" @click="changeScene">
                                <p>微信扫码登录</p>
                                <svg t="1691467835691" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4071" width="32" height="32">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#28C445" p-id="4072"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#28C445" p-id="4073"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="webchat" v-show="scene == 1">
                            <!--在这个容器当中显示微信扫码的页面-->
                            <div id="login_container"></div>
                            <div class="phone" @click="handler">
                                <p>手机短信验证码登录</p>
                                <svg t="1691571117819" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4088" width="16" height="16">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="4089"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="leftContent">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets/images/code_app.png" />
                                <svg t="1691467835691" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4071" width="16" height="16">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#cdcdcd" p-id="4072"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#cdcdcd" p-id="4073"></path>
                                </svg>
                                <p>微信扫一扫关注</p>
                                <p>“快速预约挂号”</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/images/code_login_wechat.png" />
                                <svg t="1691468362315" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="5310" width="16" height="16">
                                    <path
                                        d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                                        fill="#000000" p-id="5311"></path>
                                </svg>
                                <p>扫一扫下载</p>
                                <p>“预约挂号”APP</p>
                            </div>
                        </div>
                        <p class="tip">尚医通官方指定平台</p>
                        <p class="tip">快速挂号安全放心</p>
                    </div>
                </el-col>
            </el-row>
            <template #footer>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
//引入wx扫码登录参数请求
import { reqWxLogin } from '@/api/hospital';
//引入倒计时组件
import CountDown from '../countdown/index.vue';
import { ref, reactive, computed, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
//获取user仓库的数据(visible)可以控制login组件的对话框显示与隐藏
import useUserStore from "@/store/modules/user";
import type { WXLoginResponseData } from '@/api/hospital/type';
import { ElMessage } from 'element-plus';
let userStore = useUserStore();
//定义一个响应式数据控制倒计时组件显示与隐藏
let flag = ref<boolean>(false);//flag如果为真，开启倒计时
let scene = ref<number>(0); //0代表手机号码登录，1代表微信扫码登录
//获取相应的form组件实例
let form = ref<any>()
//收集表单数据 --手机号码
let loginParam = reactive({
    phone: '',
    code: '', //收集验证码
});
//计算出当前表单元素收集的内容是否是手机号码格式
let isPhone = computed(() => {
    //手机号的正则表达式
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    //返回布尔值：真代表手机号码、假代表不是手机号码
    return reg.test(loginParam.phone);
})
//点击微信扫码切换微信扫码
const changeScene = async () => {
    scene.value = 1;
    //发请求获取微信扫码二维码需要参数
    //在向尚硅谷学校的服务器发请求，获取微信扫码登录页面参数
    //还需要携带一个参数，从定向项目的页面
    let redirect_URI = encodeURIComponent(window.location.origin + 'wxlogin');
    let result: WXLoginResponseData = await reqWxLogin(redirect_URI);
    //生成微信扫描登录的页面
    //@ts-ignore
    new WxLogin({
        self_redirect: true,
        id: "login_container",//显示二维码容器的id
        appid: result.data.appid,//应用的唯一标识
        scope: "snsapi_login",//微信扫码的应用已经授权了
        redirect_uri: result.data.redirectUri, //填写授权的回调域路径，授权后，微信服务器推送code的地址
        state: result.data.state, //state就是学校的服务器重定向的地址，携带用户的信息
        style: "black",
        href: "",
    });
}
//获取验证码按钮的回调
const getCode = async () => {
    //解决element-plus按钮禁用还能点击的问题
    // if(!isPhone.value||flag) {
    //     return;
    // }
    //开启倒计时模式，倒计时组件显示出来
    flag.value = true;
    //通知pinia仓库存储验证码
    try {
        // 获取验证码成功
        await userStore.getCode(loginParam.phone)
        loginParam.code = userStore.code
    } catch (error) {
        // 获取验证码失败
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}

//计数器子组件绑定的自定义事件
//倒计时为零的时候，通知父组件倒计时组件隐藏
const getFlag = (val: boolean) => {
    //倒计时模式结束
    flag.value = val;
}

//点击用户登录按钮的回调
const login = async () => {
    //保证表单校验两项都符合条件
    await form.value.validate();
    //发起登录请求
    //登录请求成功：顶部组件需要展示用户名字、对话框关闭
    //登录请求失败：弹出对应登录失败的错误信息
    try {
        await userStore.userLogin(loginParam);
        //如果登录成功关闭对话框
        userStore.visible = false;
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
};

//自定义校验规则：手机号码自定义校验规则
const validatorPhone = (rule: any, value: any, callBack: any) => {
    //rule:即为表单校验对象
    //value:即为当前文本的内容
    //callback:回调函数
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    if (reg.test(value)) {
        callBack();
    } else {
        callBack(new Error('请输入正确的手机号码格式'))
    }
}

//自定义校验规则：手机验证码自定义校验规则
const validatorCode = (rule: any, value: any, callBack: any) => {
    //rule:即为表单校验对象
    //value:即为当前文本的内容
    //callback:回调函数
    if (/^\d{6}$/.test(value)) {
        callBack();
    } else {
        callBack(new Error('请输入正确的验证码格式'))
    }
}

//表单校验的规则对象
const rules = {
    //收集号码的校验规则
    // phone: [
    //     {required:true, message:'手机号码务必是11位', trigger: 'change', min: 11}
    // ],
    // code: [
    //     {required:true, message:'验证码必须是6为', trigger: 'blue', min: 6}
    // ]
    phone: [{ trigger: 'change', validator: validatorPhone }],
    code: [{ trigger: 'change', validator: validatorCode }]
}

// //对话框关闭的回调
// const close = ()=>{
//     //清空收集的数据
//     Object.assign(loginParam, { phone:'', code:'' });
//     //清除上一次校验的结果
//     form.value.resetFields();
// }

//关闭窗口按钮的对调
const closeDialog = () => {
    userStore.visible = false;
    // //清空收集的数据
    // Object.assign(loginParam, { phone:'', code:'' });
    // //清除上一次校验的结果
    // form.value.resetFields();
}

//点击手机验证码盒子的回调
const handler = () => {
    scene.value = 0;
}

//监听场景的数值
watch(()=>scene.value, (val:number)=> {
    if(val===1){
        userStore.queryState()
    }
})
</script>

<style scoped lang="scss">
.login_container {
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .login {
        border: 1px solid #ccc;
        padding: 20px;

        .webchat {
            display: flex;
            flex-direction: column;
            align-items: center;

            .phone {
                display: flex;
                flex-direction: column;
                align-items: center;
                p{
                    margin: 10px 0px;
                }
            }
        }
    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 10px 0px;
        }
    }

    .leftContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 130px;
                    height: 130px;
                }

                p {
                    margin: 5px 0px;
                }
            }
        }
    }

    .tip {
        text-align: center;
        margin: 20px 0px;
        font-size: 20px;
        font-weight: 900;
    }
}</style>