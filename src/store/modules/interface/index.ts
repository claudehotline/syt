import type { HospitalDetail, DepartmentArr, UserInfo } from "@/api/hospital/type";

//定义仓库内部存储数据state的ts类型
export interface DetailState {
    hospitalInfo: HospitalDetail,
    departmentArr: DepartmentArr
}

//用户仓库相关state数据的ts类型定义
export interface UserState {
    visible: boolean,
    code: string,
    userInfo: UserInfo
}