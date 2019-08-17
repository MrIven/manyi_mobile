<template>
  <div class="withdraw-box">
    <common-header :tittle="tittle"  :showback="true"></common-header>
    <div class="box-content">
      <div class="deal-flow-icon">
        <div class="check-right"></div>
        <div class="red-line"></div>
        <div class="white-line"></div>
        <div class="clock"></div>
      </div>
      <div class="desc-5">
        <div class="desc-5-detail-1">提现申请已提交</div>
        <div class="desc-5-detail-2">09-18  21:30</div>
        <div class="desc-5-detail-3">预计到账时间</div>
        <div class="desc-5-detail-4">09-19  21:30</div>
        <div class="desc-5-detail-5">我们将尽快处理，请耐心等待</div>
      </div>
      <div class="split-box"></div>
      <div class="desc-4">
        <div class="desc-4-left">提现金额</div>
        <div class="desc-4-right">¥ 999.99</div>
      </div>
      <div class="desc-3">
        <div class="desc-3-left">收款方式</div>
        <div class="desc-3-right">微信</div>
      </div>
      <div class="desc-2">
        <div class="desc-2-left">收款账号</div>
        <div class="desc-2-right">3jdlajf2332ljfijfdal</div>
      </div>
      <div class="split-box1"></div>
      <div class="desc-1">到账查询</div>
      <div class="desc-1-detail">
        <p>支付宝 > 我的 > 账单</p>
        <p>微信 > 我 > 钱包 > 零钱 > 零钱明细</p>
      </div>
      <button class="withdraw-now" @click="toWithdrawMoney(isActive)" >知道了</button>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import {Popup} from 'mint-ui'
import Vue from 'vue'

Vue.component(Popup.name, Popup)
export default {
  data() {
    return {
      tittle: '提现申请',
      isActive: true,
      popupVisible: false
    }
  },
  methods: {
    selectPaymentType(flag) {
      this.isActive = flag
    },
    toWithdrawMoney(flag) {
      this.popupVisible = true
      if (flag) {
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
  .withdraw-box {
    .box-content {
      position: absolute;
      .w(375);
      .h(608);
      .top(59);
      .fs(14);
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      line-height: 150%;
      text-align: center;
      .deal-flow-icon{
        position: absolute;
        .top(26);
        .left(57);
        .check-right{
          .w(24);
          .height(24);
          background-image: url("../../assets/imgs/withdraw/check-right.svg");
          background-size: cover;
        }
        .red-line{
          .w(2);
          .ml(11);
          .mt(-2);
          .height(35);
          background-color: rgba(255, 87, 51, 1);
        }
        .white-line{
          .w(2);
          .ml(11);
          .height(35);
          background-color: rgba(166, 166, 166, 1);
        }
        .clock{
          .w(24);
          .mt(-2);
          .height(24);
          background-image: url("../../assets/imgs/withdraw/clock.svg");
          background-size: cover;
        }
      }
      .desc-5{
        position: absolute;
        .w(200);
        .left(98);
        .top(30);
        line-height: 150%;
        text-align: left;
        .desc-5-detail-1{
          color: rgba(255, 87, 51, 1);
          .h(26);
          .fs(18);
        }
        .desc-5-detail-2{
          color: rgba(255, 87, 51, 1);
          .h(26);
          .fs(16);
        }
        .desc-5-detail-3{
          color: rgba(166, 166, 166, 1);
          .mt(36);
          .h(26);
          .fs(18);
        }
        .desc-5-detail-4{
          color: rgba(166, 166, 166, 1);
          .h(26);
          .fs(16);
        }
        .desc-5-detail-5{
          color: rgba(255, 87, 51, 1);
          .mt(9);
          .h(26);
          .fs(14);
        }
      }
      .split-box {
        position: absolute;
        .w(374);
        .h(12);
        .left(1);
        .top(248);
        color: rgba(80, 80, 80, 1);
        background-color: rgba(237, 240, 245, 1);
        .fs(14);
        line-height: 150%;
        text-align: center;
      }
      .desc-4{
        position: absolute;
        .w(375);
        .h(26);
        .top(286);
        .fs(16);
        line-height: 150%;
        font-weight: bold;
        .desc-4-left{
          display: inline-block;
          .w(155);
          .left(17);
          color: rgba(0, 0, 0, 1);
          text-align: left;
        }
        .desc-4-right{
          display: inline-block;
          .w(155);
          .left(204);
          color: rgba(255, 87, 51, 1);
          text-align: right;
        }
      }
      .desc-3{
        position: absolute;
        .w(375);
        .h(26);
        .top(332);
        .fs(16);
        line-height: 150%;
        font-weight: bold;
        .desc-3-left{
          display: inline-block;
          .w(155);
          .left(17);
          color: rgba(0, 0, 0, 1);
          text-align: left;
        }
        .desc-3-right{
          display: inline-block;
          .w(155);
          .left(204);
          color: rgba(128, 128, 128, 1);
          text-align: right;
        }
      }
      .desc-2{
        position: absolute;
        .w(375);
        .h(26);
        .top(377);
        .fs(16);
        line-height: 150%;
        font-weight: bold;
        .desc-2-left{
          display: inline-block;
          .w(155);
          .left(17);
          color: rgba(0, 0, 0, 1);
          text-align: left;
        }
        .desc-2-right{
          display: inline-block;
          .w(155);
          .left(204);
          color: rgba(128, 128, 128, 1);
          text-align: right;
        }
      }
      .split-box1{
        position: absolute;
        .w(375);
        .h(2);
        .left(1);
        .top(423);
        color: rgba(80, 80, 80, 1);
        background-color: rgba(237, 240, 245, 1);
        .fs(14);
        line-height: 150%;
        text-align: center;
      }
      .desc-1{
        position: absolute;
        .w(155);
        .h(26);
        .left(17);
        .top(445);
        color: rgba(0, 0, 0, 1);
        .fs(16);
        line-height: 170%;
        text-align: left;
        font-weight: bold;
      }
      .desc-1-detail{
        position: absolute;
        .w(266);
        .h(58);
        .left(17);
        .top(479);
        color: rgba(0, 0, 0, 1);
        .fs(14);
        line-height: 150%;
        text-align: left;
      }
      .withdraw-now {
        position: absolute;
        .w(218);
        .h(50);
        .left(78);
        .top(537);
        color: rgba(255, 255, 255, 1);
        background-color: rgba(0, 121, 255, 1);
        .b-radius(25);
        .fs(20);
        line-height: 250%;
        text-align: center;
      }
    }
  }
</style>
