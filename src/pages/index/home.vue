<template>
  <div class="body">
    <div class="header">
      <div class="header-top">
        <div class="left-icon">
          <span class="icon-back"></span>
          <span class="back-content">返回</span>
          <span class="title-content">邀请好友拿现金</span>
        </div>
      </div>
      <div class="header-picture">
        <img src="../../assets/imgs/index/tempicon.jpg" class="picture-img">
      </div>
      <div class="username">
        张三
      </div>
      <div class="user-mobile">
        18987548569
      </div>
      <div class="personal-setting">
        个人设置
      </div>
      <div class="right-icon">
        <span class="right-arrow"></span>
      </div>
    </div>
    <div class="middle-box">
      <div class="my-money">
        我的财富
      </div>
      <div class="to-withdraw-cash">
        去提现
      </div>
      <div class="cash-arrow" @click="toWithdrawCash">
        <span class="cash-right-arrow"></span>
      </div>
      <div class="can-withdraw">
        6666
        <span>可提取</span>
      </div>
      <div class="in-settlement">
        8888
        <span>结算中（元）</span>
      </div>
      <div class="total-income">
        6666.8888
        <span>累计收入（元）</span>
      </div>
    </div>
    <div class="content-box">
      <div class="invitation-box">
        <div class="invitation-img"></div>
        <div class="invitation-desc-1">邀请好友，拿现金</div>
        <div class="invitation-desc-2">邀请奖励无上限</div>
        <div class="to-invitation">去邀请</div>
      </div>
      <div class="team-box">
        <div class="my-team">
          我的团队
        </div>
        <div class="number-invitees">
          <span>邀请人数</span>
          <span class="team-span-style">100</span>
        </div>
        <div class="number-comsumers">
          <span>消费人数</span>
          <span class="team-span-style">99</span>
        </div>
        <div class="total-money">
          <span>累计消费（元）</span>
          <span class="team-span-style">18698</span>
        </div>
      </div>
      <div class="reward-box">
        <div class="month-reward" >月度奖励</div>
        <div class="date-title">{{pickerShowValue}}</div>
        <div class="icon-down" @click="openPicker"></div>
        <div class="rule-desc">规则说明</div>
        <div class="icon-right"></div>
        <div class="reward-title">
          <div class="number-invitation-reward">
            <span>奖励人数</span>
            <span class="reward-span-style">1000000</span>
          </div>
          <div class="number-comsumers-reward">
            <span>消费人数</span>
            <span class="reward-span-style">999999</span>
          </div>
          <div class="month-comsume">
            <span>本月消费</span>
            <span class="reward-span-style">15874586</span>
          </div>
          <div class="this-month-reward">
            <span>本月奖励</span>
            <span class="reward-span-style">856254.88</span>
          </div>
          <mt-datetime-picker
            ref="picker"
            type="date"
            year-format="{value}"
            month-format="{value}"
            date-format='1'
            @confirm="dateConfirm"
            v-model="pickerValue">
          </mt-datetime-picker>
          <button @click="login">test接口</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
import moment from 'moment'
import Vue from 'vue'
import {DatetimePicker, Picker} from 'mint-ui'
import * as homeApi from 'api/home-api'
import { ERR_OK } from 'config/index'
import axios from 'axios'

Vue.component(Picker.name, Picker)
Vue.component(DatetimePicker.name, DatetimePicker)

export default {
  data () {
    return {
      pickerValue: new Date(),
      pickerShowValue: moment(new Date()).format('YYYY-DD'),
      num: 0
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    openPicker() {
      this.$refs.picker.open()
    },
    dateConfirm(item) {
      this.pickerShowValue = moment(item).format('YYYY-MM')
    },
    todetail() {
      this.$router.togo('/Home/Detail')
    },
    toWithdrawCash() {
      this.$router.togo('/income')
    },
    login() {
      let params = {
        password: 'gs123456',
        storeNo: '',
        userName: '17326015487'
      }
      homeApi.loginUserNo(params).then((res) => {
        console.log(res)
        let {data, status} = res
        console.log(data)
        if (status === 200) {
          alert(data)
        } else {
        }
      }).catch(() => {
      })
    }
  },
  components: {
    commonHeader
  },
  computed: {
    ...mapGetters([
      'number'
    ]),
    ...mapState({
      number: state => state.home.number
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";

.body{
  .header{
    .w(375);
    .h(210);
    color: rgba(80, 80, 80, 1);
    background-color: rgba(42, 130, 228, 1);
    .fs(14);
    line-height: 150%;
    text-align: center;
    .header-top{
      .w(375);
      .h(59);
      color: rgba(255, 255, 255, 1);
      .fs(18);
      line-height: 150%;
      text-align: center;
      font-weight: bold;
      .left-icon{
        position: absolute;
        .left(4);
        .top(32);
        .w(28);
        .h(28);
        .fs(28);
        color: rgba(255, 255, 255, 1);
        .icon-back{
          position: absolute;
          .w(28);
          .h(28);
          background-image: url("../../assets/imgs/index/arrow-left.svg");
          background-size: cover;
        }
        .back-content{
          position: absolute;
          display: inline-block;
          .w(60);
          .h(56);
          .left(38);
          .top(4);
          letter-spacing: 0px;
          color: rgba(255, 255, 255, 1);
          .fs(15);
          line-height: 130%;
          text-align: left;
        }
        .title-content{
          position: absolute;
          display: inline-block;
          .w(150);
          .h(56);
          .left(150);
          .top(2);
          letter-spacing: 0px;
          color: rgba(255, 255, 255, 1);
          .fs(18);
          line-height: 130%;
          text-align: left;
        }
      }
    }
    .header-picture{
      position: absolute;
      .left(19);
      .top(84);
      .w(49);
      .h(52);
      .b-radius(75);
      .border-solid(4,rgba(255, 255, 255, 1));
      img{
        .w(52);
        .h(52);
        .b-radius(75);
        filter: saturate(1.0) hue-rotate(0deg) brightness(1.0) contrast(1.0);
      }
    }
    .username{
      position: absolute;
      .w(82);
      .h(30);
      .left(92);
      .top(93);
      color: rgba(255, 255, 255, 1);
      .fs(20);
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
    .user-mobile{
      position: absolute;
      .w(204);
      .h(26);
      .left(92);
      .top(123);
      .fs(15);
      line-height: 150%;
      text-align: left;
      color: rgba(255, 255, 255, 1);
    }
    .personal-setting{
      position: absolute;
      .w(75);
      .h(24);
      .left(270);
      .top(108);
      color: rgba(255, 255, 255, 1);
      .fs(15);
      line-height: 150%;
      text-align: right;
      font-weight: bold;
    }
    .right-icon{
      position: absolute;
      .w(26);
      .h(26);
      .left(340);
      .top(106);
      .fs(26);
      color: rgba(255, 255, 255, 1);
      background-image: url("../../assets/imgs/index/arrow-right.svg");
      background-size: cover;
    }
  }
  .middle-box{
    position: absolute;
    z-index: 8;
    .width(349);
    .h(99);
    .left(13);
    .top(158);
    color: rgba(80, 80, 80, 1);
    background-color: rgba(255, 255, 255, 1);
    .fs(14);
    line-height: 150%;
    text-align: center;
    .my-money{
      position: absolute;
      .width(77);
      .h(23);
      .left(28);
      .top(12);
      color: rgba(0, 0, 0, 1);
      .fs(14);
      line-height: 150%;
      text-align: left;
    }
    .to-withdraw-cash{
      position: absolute;
      .width(62);
      .h(23);
      .left(258);
      .top(12);
      color: rgba(0, 121, 255, 1);
      .fs(14);
      line-height: 150%;
      text-align: right;
      font-weight: bold;
    }
    .cash-arrow{
      position: absolute;
      .width(28);
      .h(28);
      .left(319);
      .top(8);
      .fs(24);
      color: rgba(0, 121, 255, 1);
      background-image: url("../../assets/imgs/index/arrow-right-blue.svg");
      background-size: cover;
    }
    .can-withdraw{
      position: absolute;
      .width(77);
      .h(20);
      .left(20);
      .top(44);
      .fs(18);
      color: rgba(0, 0, 0, 1);
      line-height: 150%;
      text-align: center;
      font-weight: bold;
      span{
        position: absolute;
        .left(19);
        .top(20);
        .fs(12);
        color: rgba(166, 166, 166, 1);
        line-height: 150%;
        text-align: center;
      }
    }
    .in-settlement{
      position: absolute;
      .width(77);
      .h(20);
      .left(120);
      .top(44);
      .fs(18);
      color: rgba(0, 0, 0, 1);
      line-height: 150%;
      text-align: center;
      font-weight: bold;
      span{
        position: absolute;
        .width(87);
        .left(9);
        .top(20);
        .fs(12);
        color: rgba(166, 166, 166, 1);
        line-height: 150%;
        text-align: center;
      }
    }
    .total-income{
      position: absolute;
      .width(107);
      .h(20);
      .left(235);
      .top(44);
      .fs(18);
      color: rgba(0, 0, 0, 1);
      line-height: 150%;
      text-align: center;
      font-weight: bold;
      span{
        position: absolute;
        .left(19);
        .top(20);
        .fs(12);
        color: rgba(166, 166, 166, 1);
        line-height: 150%;
        text-align: center;
      }
    }
  }
  .content-box{
    position: absolute;
    z-index: 5;
    .width(374);
    .h(400);
    .left(1);
    .top(209);
    .fs(14);
    color: rgba(80, 80, 80, 1);
    background-color: rgba(237, 240, 245, 1);
    line-height: 150%;
    text-align: center;
    .invitation-box{
      position: absolute;
      z-index: 6;
      .width(374);
      .h(77);
      .top(70);
      .fs(14);
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      line-height: 150%;
      text-align: center;
      .invitation-img{
        position: absolute;
        .width(59);
        .h(59);
        .left(16);
        .top(9);
        background-image: url("../../assets/imgs/index/invitation-img.jpg");
        background-size: cover;
      }
      .invitation-desc-1{
        position: absolute;
        .width(145);
        .h(28);
        .left(84);
        .top(9);
        .fs(16);
        color: rgba(255, 87, 51, 1);
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }
      .invitation-desc-2{
        position: absolute;
        .width(145);
        .h(28);
        .left(84);
        .top(40);
        .fs(14);
        color: rgba(128, 128, 128, 1);
        line-height: 150%;
        text-align: left;
      }
      .to-invitation{
        position: absolute;
        .width(85);
        .h(32);
        .left(273);
        .top(23);
        .fs(14);
        .b-radius(23);
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 87, 51, 1);
        line-height: 250%;
        text-align: center;
        font-weight: bold;
      }
    }
    .team-box{
      position: absolute;
      .width(374);
      .h(99);
      .left(1);
      .top(162);
      .fs(14);
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      line-height: 150%;
      text-align: center;
      .my-team{
        position: absolute;
        .width(107);
        .h(28);
        .left(10);
        .top(10);
        .fs(16);
        color: rgba(0, 0, 0, 1);
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }
      .number-invitees{
        position: absolute;
        .width(57);
        .h(20);
        .left(13);
        .top(43);
        .fs(12);
        color: rgba(166, 166, 166, 1);
        line-height: 150%;
        text-align: left;
      }
      .number-comsumers{
        position: absolute;
        .width(57);
        .h(20);
        .left(105);
        .top(43);
        .fs(12);
        color: rgba(166, 166, 166, 1);
        line-height: 150%;
        text-align: left;
      }
      .total-money{
        position: absolute;
        .width(117);
        .h(20);
        .left(196);
        .top(43);
        .fs(12);
        color: rgba(166, 166, 166, 1);
        line-height: 150%;
        text-align: left;
      }
      .team-span-style{
        color: rgba(0, 0, 0, 1);
        .fs(14);
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }
    }
    .reward-box{
      position: absolute;
      .width(374);
      .h(99);
      .left(1);
      .top(277);
      .fs(14);
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      line-height: 150%;
      text-align: center;
      .month-reward{
        position: absolute;
        .width(107);
        .h(28);
        .left(10);
        .top(10);
        .fs(16);
        color: rgba(0, 0, 0, 1);
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }
      .date-title{
        position: absolute;
        .width(59);
        .h(23);
        .left(90);
        .top(12);
        .fs(14);
        color: rgba(0, 121, 255, 1);
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }
      .icon-down{
        position: absolute;
        .width(24);
        .h(24);
        .left(142);
        .top(10);
        .fs(24);
        color: rgba(0, 121, 255, 1);
        background-image: url("../../assets/imgs/index/arrow-down.svg");
        background-size: cover;
      }
      .rule-desc{
        position: absolute;
        .width(59);
        .h(23);
        .left(282);
        .top(14);
        .fs(14);
        color: rgba(0, 121, 255, 1);
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }
      .icon-right{
        position: absolute;
        .width(24);
        .h(24);
        .left(336);
        .top(12);
        .fs(24);
        color: rgba(0, 121, 255, 1);
        background-image: url("../../assets/imgs/index/arrow-right-blue.svg");
        background-size: cover;
      }
      .reward-title{
        position: absolute;
        .width(87);
        .top(43);
        .h(20);
        .fs(12);
        color: rgba(166, 166, 166, 1);
        line-height: 150%;
        text-align: left;
        .number-invitation-reward{
          position: absolute;
          .left(13);
        }
        .number-comsumers-reward{
          position: absolute;
          .w(87);
          .left(105);
        }
        .month-comsume{
          position: absolute;
          .left(200);
        }
        .this-month-reward{
          position: absolute;
          .left(287);
        }
        .reward-span-style{
          color: rgba(0, 0, 0, 1);
          .fs(14);
          line-height: 150%;
          text-align: left;
          font-weight: bold;
        }
      }
    }
  }
}

.page-content{
  .mb(98);
}
</style>
