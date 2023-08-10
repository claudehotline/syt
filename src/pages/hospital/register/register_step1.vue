<template>
  <div class="wrap">
    <div class="top">
      <div class="hosname">{{ workData.baseMap?.hosname }}</div>
      <div class="line"></div>
      <div>{{ workData.baseMap?.bigname }}</div>
      <div>.</div>
      <div class="hosdepartment">{{ workData.baseMap?.depname }}</div>
    </div>
    <!--中间展示日期的结构-->
    <div class="center">
      <h1 class="time">{{ workData.baseMap?.releaseTime }}</h1>
      <div class="container">
        <div
          class="item"
          :class="{
            active: item.status == -1 || item.availableNumber == -1,
            cur: item.workDate == workTime.workDate,
          }"
          v-for="item in workData.bookingScheduleList"
          :key="item"
          @click="changeTime(item)"
        >
          <div class="top1">{{ item.workDate }}{{ item.dayOfWeek }}</div>
          <div class="bottom">
            <div v-if="item.status == -1">停止挂号</div>
            <div v-if="item.status == 0">
              {{
                item.availableNumber == 1
                  ? '约满了'
                  : `有号(${item.availableNumber})`
              }}
            </div>
            <div v-if="item.status == 1">即将放号</div>
          </div>
        </div>
      </div>
      <el-pagination
        v-model:current-page="pageNo"
        layout="prev, pager,next"
        :total="workData.total"
        @current-change="fetchWorkData"
      />
    </div>
    <!--底部展示相应医生的结构-->
    <div class="bottom">
      <!--展示即将放号的时间-->
      <div class="will" v-if="workTime.status == 1">
        <span class="time">2023年6月3日08:30</span>
        <span class="willText">放号</span>
      </div>
      <!--展示医生的结构-->
      <div class="doctor" v-else>
        <div class="morning">
          <!--顶部文字提示-->
          <div class="tip">
            <svg
              t="1691637898091"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4393"
              width="32"
              height="32"
            >
              <path
                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                fill="#1296db"
                p-id="4394"
              ></path>
            </svg>
            <span class="text">上午号源</span>
          </div>
          <!--每一个医生的信息-->
          <div class="doc_info" v-for="doctor in morningArr" :key="doctor.id">
            <!--展示医生的名字、技能-->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">
                {{ doctor.skill }}
              </div>
            </div>
            <!--展示-->
            <div class="right">
              <div class="money">￥{{ doctor.amount }}元</div>
              <el-button type="primary" size="default" @click="goStep2(doctor)">{{
                doctor.availableNumber
              }}</el-button>
            </div>
          </div>
        </div>
        <div class="morning">
          <!--顶部文字提示-->
          <div class="tip">
            <svg
              t="1691639572903"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6083"
              width="32"
              height="32"
            >
              <path
                d="M127.4368 297.4208h653.6192v203.9296a326.8096 326.8096 0 0 1-326.8096 326.8096 326.8096 326.8096 0 0 1-326.8096-326.8096V297.4208z"
                fill="#FFA89F"
                p-id="6084"
              ></path>
              <path
                d="M275.1488 245.248a25.6 25.6 0 0 0 25.6-25.6V126.1568a25.6 25.6 0 1 0-51.2 0V219.648a25.6 25.6 0 0 0 25.6 25.6zM640 245.248a25.6 25.6 0 0 0 25.6-25.6V126.1568a25.6 25.6 0 0 0-51.2 0V219.648a25.6 25.6 0 0 0 25.6 25.6zM457.472 214.528a25.6 25.6 0 0 0 25.6-25.6V95.4368a25.6 25.6 0 0 0-51.2 0V188.928a25.6 25.6 0 0 0 25.6 25.6zM914.3808 338.4832h-107.52v-40.96a25.6 25.6 0 0 0-25.6-25.6H127.4368a25.6 25.6 0 0 0-25.6 25.6v203.8272a352.3584 352.3584 0 0 0 669.44 153.6h42.4448a126.3616 126.3616 0 0 0 126.2592-126.2592V364.0832a25.6 25.6 0 0 0-25.6-25.6z m-460.1344 464.0768a301.568 301.568 0 0 1-301.2096-301.2096V323.0208h380.8256V430.08h-54.784a25.6 25.6 0 0 0-25.6 25.6v160.8192a25.6 25.6 0 0 0 25.6 25.6H640a25.6 25.6 0 0 0 25.6-25.6V455.68a25.6 25.6 0 0 0-25.6-25.6h-54.784V323.0208h170.3936v178.3296a301.568 301.568 0 0 1-301.3632 301.2096zM614.4 481.28v109.6192H504.6784V481.28z m274.5344 47.616a75.1616 75.1616 0 0 1-75.0592 75.0592h-22.3232a351.4368 351.4368 0 0 0 15.36-102.4V389.6832h81.92zM852.2752 877.7216H157.4912a25.6 25.6 0 1 0 0 51.2h694.784a25.6 25.6 0 0 0 0-51.2z"
                fill="#092130"
                p-id="6085"
              ></path>
            </svg>
            <span class="text">下午号源</span>
          </div>
          <!--每一个医生的信息-->
          <div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
            <!--展示医生的名字、技能-->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">
                {{ doctor.skill }}
              </div>
            </div>
            <!--展示-->
            <div class="right">
              <div class="money">￥{{ doctor.amount }}</div>
              <el-button
                type="primary"
                size="default"
                @click="goStep2(doctor)">
                {{ doctor.availableNumber }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import {
  Doctor,
  DocArr,
  reqHospitalWork,
  reqHospitalDoctor,
  DoctorResponseData,
} from '@/api/hospital';
import { useRoute, useRouter } from 'vue-router';
import type { HospitalWorkData } from '@/api/hospital/type';
//获取路由对象
let $route = useRoute();
let $router = useRouter();
let pageNo = ref<number>(1);
//每一页展示几条数据
let limit = ref<number>(6);
//存储医院挂号的数据
let workData = ref<any>({});
//存储排班日期：当前数据的第一个
let workTime = ref({});
//存储排班医生的数据
let docArr = ref<DocArr>([]);
//组件挂载完毕发一次请求
onMounted(() => {
  fetchWorkData();
});

//获取挂号的数据
const fetchWorkData = async () => {
  let result: HospitalWorkData = await reqHospitalWork(
    pageNo.value,
    limit.value,
    $route.query.hoscode as string,
    $route.query.depcode as string,
  );

  console.log(result.data);
  if (result.code == 200) {
    workData.value = result.data;
    //存储第一天的日期的数据
    workTime.value = workData.value.bookingScheduleList[0];
    //获取一次医生的数据
    getDoctorWorkDate();
  }
};

//获取某一天医生排班的数据
const getDoctorWorkDate = async () => {
  let hoscode: string = $route.query.hoscode as string;
  //科室的编号
  let depcode: string = $route.query.depcode as string;
  // 时间
  let workDate: string = workTime.value.workDate;

  let result: DoctorResponseData = await reqHospitalDoctor(
    hoscode,
    depcode,
    workDate,
  );

  if (result.code == 200) {
    docArr.value = result.data;
  }
};

//点击顶部某一天的时候触发回调
const changeTime = (item: any) => {
  //存储用户选择的那一天数据
  workTime.value = item;
  //在发一次
  getDoctorWorkDate();
};

//计算出上午排班的医生
let morningArr = computed(() => {
  return docArr.value.filter((doc: Doctor) => {
    return doc.workTime == 0;
  });
});

//计算出下午排班的医生
let afterArr = computed(() => {
  return docArr.value.filter((doc: Doctor) => {
    return doc.workTime == 1;
  });
});

//路由跳转进入路由选择就诊人页面
const goStep2 = (doctor: Doctor) => {
  //编程式导航进行路由跳转且携带医生的ID
  $router.push({ path: "/hospital/register_step2", query: { docId: doctor.id } });
};
</script>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;

    .line {
      width: 3px;
      height: 20px;
      background: skyblue;
      margin: 0px 5px;
    }

    .dot {
      margin: 0px 5px;
      color: skyblue;
    }
  }

  .center {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .time {
      font-weight: 900;
    }

    .container {
      width: 100%;
      display: flex;
      margin: 30px 0px;

      .item {
        flex: 1;
        width: 100%;
        border: 1px solid skyblue;
        margin: 0px 5px;
        transition: all 0.5s;
        &.active {
          border: 1px solid #ccc;
          color: #7f7f7f;
          .top1 {
            background: #ccc;
          }
        }
        &.cur {
          transform: scale(1.1);
        }
        .top1 {
          background: #e8f2ff;
          height: 30px;
          width: 100%;
          text-align: center;
          line-height: 30px;
        }

        .bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }

  .bottom {
    .will {
      text-align: center;
      font-size: 30px;
      font-weight: 900;
      .time {
        color: red;
      }
      .willText {
        color: skyblue;
      }
    }
    .doctor {
      .morning {
        .tip {
          display: flex;
          align-items: center;

          .text {
            color: #7f7f7f;
            font-weight: 900;
          }
        }

        .doc_info {
          display: flex;
          justify-content: space-between;
          margin: 10px 0px;
          border-bottom: 1px solid #ccc;
          .left {
            .info {
              color: skyblue;
              margin: 10px 0px;
              span {
                margin: 0px 5px;
                font-size: 18px;
                font-weight: 900;
              }
            }
            .skill {
              margin: 10px 0px;
              color: #7f7f7f;
            }
          }
          .right {
            width: 150px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .money {
              color: #7f7f7f;
            }
          }
        }
      }
    }
  }
}
</style>
