//引入二次封装axios
import request from "@/utils/request";
import type { HospitalDetail, DeparmentResponseData } from './type'
//枚举请求地址
enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    //获取某一个医院的科室的数据
    HOSPITALDEPARTMENT_URL = '/hosp/hospital/department/'
}

export const reqHospitalDetail = (hoscode: string) => request.get<any, HospitalDetail>(API.HOSPITALDETAIL_URL + hoscode);

export const reqHospitalDepartment = (hoscode: string) => request.get<any, DeparmentResponseData>(API.HOSPITALDEPARTMENT_URL + hoscode);