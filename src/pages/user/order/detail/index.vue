<template>
    <el-card class="box-card">
        <!--卡片头部的结构-->
        <template #header>
            <div class="detail">
                挂号的详情
            </div>
        </template>
        <!--展示身体部分的顶部结构-->
        <div class="top">
            <el-tag type="success">
                <!--左侧的标签-->
                <div class="tag">
                    <svg t="1691749399263" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4144" width="16" height="16">
                        <path
                            d="M392.533333 806.4L85.333333 503.466667l59.733334-59.733334 247.466666 247.466667L866.133333 213.333333l59.733334 59.733334L392.533333 806.4z"
                            fill="#1afa29" p-id="4145"></path>
                    </svg>
                    <span>预约成功，待支付</span>
                </div>
            </el-tag>
            <div class="right_info">
                <img src="../../../../assets/images/code_app.png" />
                <div class="info">
                    <p>微信 关注 “北京114预约挂号”</p>
                    <p>“快速预约挂号”</p>
                </div>
            </div>
        </div>
        <!--订单详情底部的结构-->
        <div class="bottom">
            <div class="left">
                <!--左侧展示订单详情信息-->
                <el-descriptions class="margin-top" :column="1" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊人信息
                            </div>
                        </template>
                        xxxxx
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊日期
                            </div>
                        </template>
                        xxxxx
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊医院
                            </div>
                        </template>
                        xxxxx
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊科室
                            </div>
                        </template>
                        xxxxx
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生职称
                            </div>
                        </template>
                        xxxxx
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生服务费
                            </div>
                        </template>
                        <span style="color:red">100</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                挂号订单
                            </div>
                        </template>
                        xxxxx
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                挂号时间
                            </div>
                        </template>
                        xxxxx
                    </el-descriptions-item>
                </el-descriptions>
                <div class="btn">
                    <el-button>取消预约</el-button>
                    <el-button type="primary" size="default">支付</el-button>
                </div>
            </div>
            <div class="right">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>注意事项</span>
                        </div>
                    </template>
                    <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>

                    <p> 2.【取号】就诊当天需在2023-08-1209:00前前 在医院取号，未取号视为爽约，该号不退不换；</p>

                    <p> 3.【退号】在2023-08-11 15:30前可在线退号 ，逾期将不可办理退号退费；</p>

                    <p> 4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；</p>

                    <p> 5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                </el-card>
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.box-card {
    .detail {
        color: #7f7f7f;
        font-weight: 900;
    }

    .top {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 10px;

        .tag {
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                margin-left: 5px;
            }
        }

        .right_info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
            }

            .info {
                margin-left: 10px;

                p {
                    font-size: 12px;
                    line-height: 20px;
                }
            }
        }
    }

    .bottom {
        display: flex;
        margin-top: 20px;

        .left {
            flex: 3;
            .btn{
                margin: 10px 0px;
            }
        }

        .right {
            margin-left: 20px;
            flex: 6;

            p {
                line-height: 30px;
            }
        }
    }
}
</style>