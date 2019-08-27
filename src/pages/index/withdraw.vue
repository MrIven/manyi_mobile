<template>
  <div class="withdraw-box">
    <common-header :tittle="tittle"  :showback="true"></common-header>
    <div class="box-content">
      <div class="firt-desc">
        <span>可提现金额</span>
        <span class="record-desc">提现记录</span>
        <span class="withdraw-arrow-right" @click='withdrawRecord'>&nbsp;&nbsp;&nbsp;</span>
      </div>
      <div class="money-style">￥{{withdrawObj?withdrawObj.can_get_price/100:0}}</div>
      <div class="split-box"></div>
      <div class="desc-1">选择收款方式</div>
      <div :class="[isActive?'ali-account1':'ali-account2']" @click="selectPaymentType(true)">
        <div class="account-icon-ali">&nbsp;&nbsp;&nbsp;</div>
        <span class="ali-desc-1">支付宝账户</span>
      </div>
      <div :class="[!isActive?'wechat-account1':'wechat-account2']" @click="selectPaymentType(false)" >
        <div class="account-icon-wechat">&nbsp;&nbsp;&nbsp;</div>
        <span class="we-desc-1">微信账户</span>
      </div>
      <div class="tip-tittle">温馨提示</div>
      <div class="tip-detail">
        <p>1、金额需大于等于10元才可提现、</p>
        <p>2、提现申请将在24小时后审批到账，请耐心等待</p>
        <p>3、请及时关注“提现记录”，查看提现状态</p>
        <p>4、提现到账查询：</p>
        <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支付宝 > 我的 > 账单</p>
        <p> &nbsp;&nbsp;&nbsp;&nbsp; 微信 > 我 > 钱包 > 零钱 > 零钱明细</p>
      </div>
      <button class="withdraw-now" @click="toWithdrawMoney(isActive)" >立即提现</button>
      <mt-popup
        v-model="popupVisible"
        position="bottom"
        popup-transition="popup-fade">
        <div class="popup-content">
          <div class="title-pic">
            <div class="portrait" >
              <img :src=withdrawObj?withdrawObj.head_image:1>
            </div>
            <div class="white-backgroud"></div>
            <div class="platform-pic">
              <img src="../../assets/imgs/withdraw/wechat.png">
            </div>
          </div>
          <div class="popup-money">
            ￥{{withdrawObj?withdrawObj.can_get_price/100:0}}
          </div>
          <div class="desc-2">
            即将提现到您的微信钱包
          </div>
          <div class="account-info">
            账户：{{withdrawObj?withdrawObj.weixin_account:'暂无'}}
          </div>
          <button class="cancle" @click="cancle">取消</button>
          <button class="confirm" @click="confirm">确认</button>
        </div>
      </mt-popup>
      <mt-popup
        v-model="alertMsgVisible"
        popup-transition="popup-fade"
        class="alertMessage"
        position="top">
        {{alertMessage}}
      </mt-popup>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import * as withdrawApi from 'api/withdraw-api'
import {Popup} from 'mint-ui'
import Vue from 'vue'

Vue.component(Popup.name, Popup)
export default {
  data() {
    return {
      withdrawObj: {},
      allAmount: 0,
      alertMessage: '',
      tittle: '提现申请',
      isActive: true,
      popupVisible: false,
      alertMsgVisible: false
    }
  },
  mounted: function () {
    withdrawApi.canWithdrawalAmount({
      token: localStorage.getItem('token')
    }).then((res) => {
      this.withdrawObj = res.data.data
    }).catch(() => {
    })
  },
  methods: {
    withdrawRecord() {
      this.$router.togo('/withdrawRecord')
    },
    confirm() {
      let that = this
      withdrawApi.withdrawMoney({
        token: localStorage.getItem('token'),
        money: that.withdrawObj ? that.withdrawObj.can_get_price / 100 : 0
      }).then((res) => {
        if (res.data.data !== null) {
          if (res.data.data.id !== null) {
            that.$router.togo('/withdrawApplication/' + res.data.data.id)
          } else {
            alert('转账失败')
          }
        } else {
          alert('转账异常')
        }
      })
    },
    cancle() {
      this.popupVisible = false
    },
    selectPaymentType(flag) {
      this.isActive = flag
    },
    toWithdrawMoney(flag) {
      if (flag) {
        this.alertMsgVisible = true
        this.alertMessage = '暂不支持支付宝'
      } else {
        this.popupVisible = true
      }
    },
    back() {
      this.$router.goBack()
    }
  },
  components: {
    commonHeader
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .alertMessage{
    width: 100%;
    .h(59);
    line-height: 350%;
    .fs(16);
    background-color:  rgba(255, 255, 255, 1);
  }
  .withdraw-box{
    .box-content{
      position: absolute;
      .w(375);
      .h(608);
      .top(59);
      .fs(14);
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      line-height: 150%;
      text-align: center;
      .split-box{
        position: absolute;
        .w(374);
        .h(12);
        .left(1);
        .top(129);
        color: rgba(80, 80, 80, 1);
        background-color: rgba(237, 240, 245, 1);
        .fs(14);
        line-height: 150%;
        text-align: center;
      }
      .firt-desc{
        position: absolute;
        .top(31);
        .left(17);
        span{
          color: rgba(0, 0, 0, 1);
          .fs(16);
          line-height: 150%;
          text-align: left;
          font-weight: bold;
        }
        .record-desc{
          position: relative;
          .right(-168);
          color: rgba(0, 121, 255, 1);
          .fs(16);
          line-height: 150%;
        }
        .withdraw-arrow-right{
          position: relative;
          .top(3);
          .right(-164);
          .w(24);
          .h(24);
          .fs(24);
          color: rgba(0, 121, 255, 1);
          background-image: url("../../assets/imgs/index/arrow-right-blue.svg");
          background-size: cover;
        }
      }
      .money-style{
        position: absolute;
        .w(155);
        .h(43);
        .left(17);
        .top(65);
        color: rgba(255, 87, 51, 1);
        .fs(32);
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }
      .desc-1{
        position: absolute;
        .w(155);
        .h(26);
        .left(17);
        .top(155);
        color: rgba(0, 0, 0, 1);
        .fs(16);
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }
      .ali-account1{
        position: absolute;
        .w(148);
        .h(44);
        .left(26);
        .top(207);
        border: rgba(0,0,0,1) solid 1px;
        .b-radius(16);
        .fs(16);
        line-height: 250%;
        text-align: center;
      }
      .ali-account2{
        position: absolute;
        .w(148);
        .h(44);
        .left(26);
        .top(207);
        border: rgba(204,204,204,1) solid 1px;
        .b-radius(16);
        .fs(16);
        line-height: 250%;
        text-align: center;
      }
      .wechat-account1{
        position: absolute;
        .w(148);
        .h(44);
        .left(202);
        .top(207);
        border: rgba(0,0,0,1) solid 1px;
        .b-radius(16);
        .fs(16);
        line-height: 250%;
        text-align: center;
        vertical-align: middle;
      }
      .wechat-account2{
        position: absolute;
        .w(148);
        .h(44);
        .left(202);
        .top(207);
        border: rgba(204,204,204,1) solid 1px;
        .b-radius(16);
        .fs(16);
        line-height: 250%;
        text-align: center;
        vertical-align: middle;
      }
      .tip-tittle{
        position: absolute;
        .w(155);
        .h(26);
        .left(17);
        .top(303);
        color: rgba(0, 0, 0, 1);
        .fs(16);
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }
      .tip-detail{
        position: absolute;
        .w(341);
        .h(165);
        .left(18);
        .top(339);
        color: rgba(0, 0, 0, 1);
        .fs(14);
        line-height: 150%;
        text-align: left;
      }
      .withdraw-now{
        position: absolute;
        .w(218);
        .h(50);
        .left(78);
        .top(521);
        color: rgba(255, 255, 255, 1);
        background-color: rgba(255, 87, 51, 1);
        .b-radius(25);
        .fs(20);
        line-height: 250%;
        text-align: center;
      }
    }
  }
  .account-icon-ali{
    position: relative;
    display: inline-block;
    .top(8);
    .w(30);
    .h(30);
    .fs(24);
    .b-radius(9);
    color: rgba(0, 121, 255, 1);
    background-image: url("../../assets/imgs/personal_setting/alipay.svg");
    background-size: cover;
  }
  .account-icon-wechat{
    position: relative;
    display: inline-block;
    .top(8);
    .w(30);
    .h(30);
    .fs(24);
    .b-radius(9);
    color: rgba(0, 121, 255, 1);
    background-image: url("../../assets/imgs/personal_setting/wechat.svg");
    background-size: cover;
  }
  .popup-content{
    .w(375);
    .h(339);
    color: rgba(80, 80, 80, 1);
    background-color: rgba(255, 255, 255, 1);
    .fs(16);
    line-height: 150%;
    text-align: center;
    .title-pic{
      position: absolute;
      .white-backgroud{
        .ml(204);
        .mt(-23);
        .b-radius(20);
        .w(30);
        .h(30);
        z-index: 2;
        background: rgba(255,255,255,1);
      }
      .portrait{
        .w(74);
        .h(74);
        z-index: 1;
        .ml(151);
        .mt(20);
        .top(348);
        .b-radius(13);
        background-size: cover;
        img{
          .w(74);
          .h(74);
          z-index: 1;
          .top(348);
          .b-radius(13);
        }
      }
      .platform-pic{
       img{
         position: absolute;
         .w(24);
         .h(24);
         z-index: 3;
         background: rgba(112,198,125,1);
         .b-radius(20);
         .top(78);
         .left(202)
       }
      }
    }
    .popup-money{
      .w(155);
      .h(37);
      .ml(120);
      .pt(100);
      color: rgba(0, 0, 0, 1);
      .fs(32);
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
     .desc-2{
      .w(176);
      .h(37);
      .ml(110);
      .pt(10);
     color: rgba(255, 87, 51, 1);
     .fs(16);
     line-height: 150%;
     text-align: center;
     font-weight: bold;
    }
    .account-info{
      color: rgba(0, 0, 0, 1);
      .fs(16);
      line-height: 150%;
      text-align: center;
      font-weight: bold;
    }
    .cancle{
      display: inline-block;
      .mt(20);
      .w(140);
      .h(50);
      color: rgba(255, 87, 51, 1);
      background-color: rgba(255, 255, 255, 1);
      .b-radius(25);
      .fs(20);
      line-height: 250%;
      text-align: center;
      font-weight: bold;
    }
    .confirm{
      display: inline-block;
      .w(140);
      .h(50);
      color: rgba(255, 255, 255, 1);
      background-color: rgba(255, 87, 51, 1);
      .b-radius(25);
      .fs(20);
      line-height: 250%;
      text-align: center;
      font-weight: bold;
    }

  }
</style>
