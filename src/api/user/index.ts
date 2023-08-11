//引入二次封装的axios
import request from '@/utils/request';
import type { SubmitOrder } from './type';

enum API{
    SUBMITORDER_URL='/order/orderInfo/auth/submitOrder/'
}

//提交订单
export const reqSubmitOrder=(hoscode:string, scheduleId:string, patient:number)=>request.post<any, SubmitOrder>(API.SUBMITORDER_URL+`${hoscode}/${scheduleId}/${patient}`);