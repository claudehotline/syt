//引入二次封装axios
import request from "@/utils/request";
import type { HospitalWorkData, WXLoginResponseData, HospitalDetail, DepartmentResponseData, LoginData, UserLoginResponseData } from './type'
//枚举请求地址
enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    //获取某一个医院的科室的数据
    HOSPITALDEPARTMENT_URL = '/hosp/hospital/department/',
    //获取验证码接口
    GETUSERCODE_URL = '/sms/send/',
    //用户登录接口
    USERLOGIN_URL = '/user/login/',
    //获取微信扫码登录需要的参数
    WXLOGIN_URL = '/user/weixin/getLoginParam/',
    //获取某一个医院的某一个科室预约挂号数据
    HOSPITALWORK_URL = '/api/hosp/hospital/auth/getBookingScheduleRule/'
}

export const reqHospitalDetail = (hoscode: string) => request.get<any, HospitalDetail>(API.HOSPITALDETAIL_URL + hoscode);

export const reqHospitalDepartment = (hoscode: string) => request.get<any, DepartmentResponseData>(API.HOSPITALDEPARTMENT_URL + hoscode);
//获取验证码接口
export const reqCode = (phone: string) => request.get<any, any>(API.GETUSERCODE_URL + phone);
//用户登录的接口
export const reqUserLogin = (data: LoginData) => request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);
//获取微信扫码登录生成二维码需要参数接口
export const reqWxLogin = (wxRedirectUri: string) => request.get<any, WXLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`);
//获取预约挂号的数据
export const reqHospitalWork = (page: number, limit: number, hoscode: string, depcode: string) => request.get<any, HospitalWorkData>(API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`);