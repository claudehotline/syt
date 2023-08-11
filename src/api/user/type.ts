export interface ResponseData{
    code: number,
    message: string,
    ok: true,
}

//提交订单接口返回的数据ts类型
export interface SubmitOrder extends ResponseData{
    data: number;
}