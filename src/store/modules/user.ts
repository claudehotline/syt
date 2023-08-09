//定义用户相关的仓库
import { defineStore } from 'pinia';
//引入获取验证码的请求方法
import { reqCode, reqUserLogin } from '@/api/hospital';
import type { LoginData, UserLoginResponseData, UserInfo } from '@/api/hospital/type';
import type { UserState } from './interface';
const useUserStore = defineStore('User', {
    state: ():UserState => {
        return {
            visible: false,
            code: '', //存储用户的验证码
            userInfo: JSON.parse(localStorage.getItem('USERINFO') as string) || {}
        }
    },
    actions: {
        //获取验证码的方法
        async getCode(phone: string) {
            //在向服务器携带手机号码，获取验证码
            //正常开发的时候只需要发一个请求，后端就会将验证码推送到用户的手机设备当中
            let result: any = await reqCode(phone)

            if (result.code == 200) {
                this.code = result.data;
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        //用户手机号码登录的方法
        async userLogin(loginData: LoginData){
            //登录请求
            let result:UserLoginResponseData = await reqUserLogin(loginData);
            if(result.code==200){
                this.userInfo = result.data;
                //本地存储持久化存储用户信息
                localStorage.setItem('USERINFO', JSON.stringify(this.userInfo));
                //返回一个成功的Promise
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message))
            }
        }

    },
    getters: {

    }
});

export default useUserStore