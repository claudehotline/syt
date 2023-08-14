//引入二次封装的axios
import request from '@/utils/request';
import type { UserParams, CertificationTypeResponseData, UserInfoResponseData, QrCode, SubmitOrder, OrderResponseData,PayResult } from './type';

enum API{
    SUBMITORDER_URL='/order/orderInfo/auth/submitOrder/',
    //获取订单详情的数据
    GETORDERINFO_URL='/order/orderInfo/auth/getOrderInfo/',
    //取消订单的接口
    ORDERCANCEL_URL='/order/orderInfo/auth/cancelOrder/',
    //获取支付订单二维码的接口
    QRCODE_URL='/order/weixin/createNative/',
    //查询订单支付的结果
    PAYRESULT_URL='/order/weixin/queryPayStatus/',
    //获取当前账号的信息
    USERINFO_URL='/user/auth/getUserInfo',
    //获取证件类型的接口的地址
    CERTIFICATIONTYPE_URL='/cmn/dict/findByDictCode/',
    //用户认证的接口
    USERCERTIFICATION_URL='/user/auth/userAuth'
}

//提交订单
export const reqSubmitOrder=(hoscode:string, scheduleId:string, patient:number)=>request.post<any, SubmitOrder>(API.SUBMITORDER_URL+`${hoscode}/${scheduleId}/${patient}`);
//获取订单详情的方法
export const reqOrderInfo=(id:string)=>request.get<any, OrderResponseData>(API.GETORDERINFO_URL+id);
//取消订单
export const reqCancelOrder = (id:string) => request.get<any, any>(API.ORDERCANCEL_URL+id);
//获取支付二维码接口
export const reqQrcode = (orderId:string) => request.get<any, QrCode>(API.QRCODE_URL+orderId);
//查询订单支付的结构
export const reqQueryPayStatus = (orderId:string) => request.get<any, PayResult>(API.PAYRESULT_URL+orderId);
//获取当前用户信息的接口
export const reqUserInfo = () => request.get<any,UserInfoResponseData>(API.USERINFO_URL);
//获取证件类型的方法
export const  reqCertificationType = (CertificatesType='CertificatesType') => request.get<any,CertificationTypeResponseData>(API.CERTIFICATIONTYPE_URL+CertificatesType);
//用户认证接口
export const reqUserCertification = (data:UserParams)=>request.post<any,any>(API.USERCERTIFICATION_URL, data);