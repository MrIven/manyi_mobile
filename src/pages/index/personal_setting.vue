<template>
  <div class="body-box">
    <common-header :tittle="tittle"  :showback="true"></common-header>
    <div class="payment-setting">
      <div class="payment-setting-desc">收款方式设置</div>
    </div>
    <div class="alipay-setting">
      <div class="ali-icon"></div>
      <div class="account-desc">支付宝账号</div>
      <div class="is-setting">已设置</div>
      <div class="right-arrow"></div>
    </div>
    <div class="wechat-setting">
      <div class="wechat-icon"></div>
      <div class="account-desc">微信账号&nbsp;&nbsp;&nbsp;</div>
      <div class="is-setting">未设置</div>
      <div class="right-arrow"></div>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
export default {
  data() {
    return {
      tittle: '个人设置'
    }
  },
  methods: {
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
  .body-box{
    .payment-setting{
      position: absolute;
      .w(375);
      .h(58);
      .top(59);
      .fs(14);
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      line-height: 150%;
      text-align: center;
      .payment-setting-desc{
        position: absolute;
        .w(155);
        .h(26);
        .top(17);
        .left(18);
        .fs(20);
        color: rgba(0, 0, 0, 1);
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }
    }
    .alipay-setting,.wechat-setting{
      position: absolute;
      .w(375);
      .h(57);
      .top(130);
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      .fs(14);
      line-height: 150%;
      text-align: left;
    }
    .wechat-setting{
      .top(189)
    }
  }
  .ali-icon,.wechat-icon{
    display: inline-block;
    .mt(14);
    .ml(19);
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background-image: url("../../assets/imgs/personal_setting/alipay.svg");
    background-size: cover;
  }
  .wechat-icon{
    background-image: url("../../assets/imgs/personal_setting/wechat.svg");
  }
  .account-desc{
    position: relative;
    display: inline-block;
    color: rgba(0, 0, 0, 1);
    .top(-10);
    .fs(16);
    line-height: 150%;
    text-align: left;
  }
  .is-setting{
    position: relative;
    display: inline-block;
    color: rgba(0, 0, 0, 1);
    .top(-10);
    .right(-90);
    .fs(16);
    line-height: 150%;
    text-align: left;
  }
  .right-arrow{
    position: relative;
    display: inline-block;
    color: rgba(0, 0, 0, 1);
    .top(-4);
    .right(-148);
    .fs(16);
    .w(24);
    .h(24);
    .b-radius(9);
    color: #000;
    background-image: url("../../assets/imgs/personal_setting/arrow-right.svg");
    background-size: cover;
  }
</style>
