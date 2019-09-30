<template>
  <div class="income-body">
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value}年"
      month-format="{value}月"
      date-format='{value}日'
      @confirm="dateConfirm"
      v-model="pickerValue">
    </mt-datetime-picker>
    <div class="body-header">
      <div class="header-top">
        <!--<span class="left-icon"></span>
        <span class="return-back">返回</span>-->
        <span class="income">收益</span>
      </div>
    </div>
    <div class="body-middle">
      <div class="middle-word-0">累计收入(元)</div>
      <div class="middle-value-0">{{incomeObject?incomeObject.sum_price/100:0}}</div>
      <div class="middle-value-1">{{incomeObject?incomeObject.can_get_price/100:0}}</div>
      <div class="middle-value-2">{{incomeObject?incomeObject.pay_price/100:0}}</div>
      <div class="middle-word-1">可提现(元)</div>
      <div class="middle-word-2">结算中(元)</div>
      <div class="vertical-line"></div>
      <button class="middle-word-3" @click="toWithdraw">我要提现</button>
    </div>
    <div class="body-bottom">
      <div class="income-detail">
        <div class="detail-word">收益明细</div>
        <div class="year-month">{{pickerShowValue}}</div>
        <div class="icon-down-1" @click="openPicker"></div>
        <div class="all">
          <select v-model="customType" @change="queryBySort"  style="background-color: rgba(255,255,255,1)" >
            <option value="all">全部客户</option>
            <option value="direct">直接客户</option>
            <option value="indirect">间接客户</option>
          </select>
        </div>
        <div class="icon-down-2"></div>
        <div class="sort-desc">排序从高到低</div>
      </div>
      <mt-loadmore
        :top-method="loadTop"
        auto-fill='false'
        :bottom-all-loaded="allLoaded" ref="loadmore">
        <div  class="detail-infos">
          <div class="detail-info" v-for="(item, index) in list" :key="index">
            <span class="total-reward">
              {{item?item.profit/100:0}}
            </span>
            <span class="reward-desc">累计奖励</span>
            <div class="head-portrait">
              <img :src=item?item.head_image:1>
            </div>
            <div class="custom-type">{{item.type}}</div>
            <div class="from">{{item.name}}</div>
            <div class="buy-card">买卡</div>
            <div class="card-money">{{item.card_profit/100}}</div>
            <div class="buy-traffic">买流量</div>
            <div class="traffic-money">{{item.data_plan_profit/100}}</div>
            <div class="phone">{{item.mobile}}</div>
          </div>
        </div>
      </mt-loadmore>
      <div class="scrollTop" @click="scrollTop">
        <div class="icon-arrow-up">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {DatetimePicker, Picker} from 'mint-ui'
import moment from 'moment'
import Vue from 'vue'
import * as incomeApi from 'api/income-api'

Vue.component(Picker.name, Picker)
Vue.component(DatetimePicker.name, DatetimePicker)

export default {
  data () {
    return {
      customType: 'all',
      pickerValue: new Date(),
      pickerShowValue: moment(new Date()).format('YYYY年MM月'),
      allLoaded: false,
      incomeObject: {},
      list: [],
      curPage: 1
    }
  },
  mounted: function () {
    incomeApi.getUserRefferGift(
      {
        token: localStorage.getItem('token'),
        choose_date: moment(this.pickerValue).format('YYYY-MM'),
        page: this.curPage
      }).then((res) => {
      if (res.status === 200) {
        this.incomeObject = res.data.data
        this.list = this.incomeObject.user_data
      }
    }).catch(() => {
    })
  },
  methods: {
    queryBySort() {
      let that = this
      incomeApi.getUserRefferGift(
        {
          token: localStorage.getItem('token'),
          choose_date: moment(this.pickerValue).format('YYYY-MM'),
          type: this.customType,
          page: this.curPage
        }).then((res) => {
        if (res.status === 200) {
          this.incomeObject = res.data.data
          if (this.customType === 'all') {
            console.log('all')
            that.list = this.incomeObject.user_data
          } else if (this.customType === 'direct') {
            console.log('direct')
            that.list = this.incomeObject.direct_user_data
          } else if (this.customType === 'indirect') {
            console.log('indirect')
            that.list = this.incomeObject.indirect_user_data
          }
        }
      }).catch(() => {
      })
    },
    scrollTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    toWithdraw() {
      this.$router.goRight('/withdraw')
    },
    dateConfirm(item) {
      this.pickerShowValue = moment(item).format('YYYY年MM月')
      incomeApi.getUserRefferGift(
        {
          token: localStorage.getItem('token'),
          choose_date: moment(this.pickerValue).format('YYYY-MM'),
          page: 1
        }).then((res) => {
        if (res.status === 200) {
          this.incomeObject = res.data.data
          this.list = this.incomeObject.user_data
        }
      }).catch(() => {
      })
    },
    openPicker() {
      this.$refs.picker.open()
      let a = document.getElementsByClassName('picker-slot')
      for (let i = 0; a && i < a.length; i++) {
        if (i === 2) {
          a[i].style.display = 'none'
        }
      }
    },
    // 下拉刷新
    loadTop() {
      this.curPage += 1
      this.getChildLocationList('top')
    },
    getChildLocationList(type) {
      this.allLoaded = false
      let that = this
      incomeApi.getUserRefferGift({
        params: {
          token: localStorage.getItem('token'),
          choose_date: moment(this.pickerValue).format('YYYY-MM'),
          page: this.curPage // 第几页
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.data) {
            if (type === 'top') {
              let _list = []
              if (that.customType === 'all') {
                _list = res.data.data.user_data
              } else if (that.customType === 'direct') {
                _list = res.data.data.direct_user_data
              } else {
                _list = res.data.data.indirect_user_data
              }
              if (_list.length > 0) {
                that.list = that.list.concat(_list)
              } else {
                alert('数据已全部加载完毕')
              }
              this.$refs.loadmore.onTopLoaded()
            } else {
              let _list = []
              if (that.customType === 'all') {
                _list = res.data.data.user_data
              } else if (that.customType === 'direct') {
                _list = res.data.data.direct_user_data
              } else {
                _list = res.data.data.indirect_user_data
              }
              that.list = that.list.concat(_list)
            }
          } else {
            if (type === 'top') {
              alert('暂无数据')
            } else {
              that.allLoaded = true // 若数据已全部获取完毕
              alert('数据以加载完毕')
            }
          }
        } else {
          alert('请求失败')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
@import "~styles/base.less";
.body-header{
  position: absolute;
  .w(374);
  .h(191);
  color: rgba(80, 80, 80, 1);
  background-color: rgba(42, 130, 228, 1);
  .fs(14);
  line-height: 150%;
  text-align: center;
  .header-top{
    position: absolute;
    .w(374);
    .h(59);
    .left(1);
    .top(0);
    color: rgba(255, 255, 255, 1);
    .fs(18);
    line-height: 150%;
    text-align: center;
    font-weight: bold;
    .left-icon{
      position: absolute;
      .w(28);
      .h(28);
      .left(6);
      .top(31);
      .fs(28);
      color: rgba(255, 255, 255, 1);
      background-image: url("../../assets/imgs/index/arrow-left.svg");
      background-size: cover;
    }
    .return-back{
      position: absolute;
      .w(52);
      .h(22);
      .left(30);
      .top(35);
      letter-spacing: 0px;
      color: rgba(255, 255, 255, 1);
      .fs(15);
      line-height: 130%;
      text-align: left;
    }
    .income{
      position: absolute;
      .w(52);
      .h(22);
      .left(161.5);
      .top(32);
      letter-spacing: 0px;
      color: rgba(255, 255, 255, 1);
      .fs(18);
      line-height: 150%;
      text-align: center;
      font-weight: bold;
    }
  }
}
.body-middle{
  position: absolute;
  z-index: 5;
  .w(349);
  .h(204);
  .left(13);
  .top(79);
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  .fs(14);
  line-height: 150%;
  text-align: center;
  .middle-word-0{
    position: absolute;
    .w(77);
    .h(20);
    .left(20);
    .top(20);
    color: rgba(0, 0, 0, 1);
    .fs(12);
    line-height: 150%;
    text-align: left;
  }
  .middle-value-0{
    position: absolute;
    .w(152);
    .h(30);
    .left(97);
    .top(10);
    color: rgba(0, 0, 0, 1);
    .fs(26);
    line-height: 150%;
    text-align: left;
    font-weight: bold;
  }
  .middle-value-1,.middle-value-2{
    position: absolute;
    .w(104);
    .h(27);
    .left(51);
    .top(66);
    color: rgba(0, 0, 0, 1);
    .fs(24);
    line-height: 150%;
    text-align: center;
    font-weight: bold;
  }
  .middle-value-2{
    .left(197);
  }
  .middle-word-1,.middle-word-2{
    position: absolute;
    .w(104);
    .h(27);
    .left(51);
    .top(93);
    color: rgba(166, 166, 166, 1);
    .fs(12);
    line-height: 150%;
    text-align: center;
  }
  .middle-word-2{
    .left(197);
  }
  .vertical-line{
    position: absolute;
    .w(1);
    .h(60);
    .left(174);
    .top(63);
    color: rgba(80, 80, 80, 1);
    background-color: rgba(153, 153, 153, 1);
    .fs(14);
    line-height: 150%;
    text-align: center;
  }
  .middle-word-3{
    position: absolute;
    .w(149);
    .h(42);
    .left(100);
    .top(142);
    color: rgba(255, 255, 255, 1);
    background-color: rgba(255, 87, 51, 1);
    .b-radius(21);
    .fs(18);
    line-height: 150%;
    text-align: center;
  }
}
.body-bottom{
  position: absolute;
  z-index: 4;
  .w(374);
  height: auto;
  .left(1);
  .top(209);
  color: rgba(80, 80, 80, 1);
  background-color: rgba(237, 240, 245, 1);
  .fs(14);
  line-height: 150%;
  text-align: center;
  .income-detail{
    position: absolute;
    .w(374);
    .h(87);
    .top(90);
    color: rgba(80, 80, 80, 1);
    background-color: rgba(255, 255, 255, 1);
    .fs(14);
    line-height: 150%;
    text-align: center;
    .detail-word{
      position: absolute;
      .w(155);
      .h(26);
      .left(17);
      .top(17);
      color: rgba(0, 0, 0, 1);
      .fs(20);
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
    .year-month,.sort-desc{
      position: absolute;
      .w(95);
      .h(24);
      .left(17);
      .top(48);
      color: rgba(42, 130, 228, 1);
      .fs(16);
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
    .all{
      position: absolute;
      .left(152);
      .h(24);
      .top(48);
      color: rgba(42, 130, 228, 1);
      background-color: rgba(255,255,255,1);
      .fs(16);
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
    .sort-desc{
      position: absolute;
      .w(135);
      .h(26);
      .left(226);
      .top(47);
      color: rgba(166, 166, 166, 1);
      text-align: right;
    }
    .icon-down-1,.icon-down-2{
      position: absolute;
      .w(24);
      .h(24);
      .left(98);
      .top(48);
      .fs(24);
      color: rgba(42, 130, 228, 1);
      background-image: url("../../assets/imgs/index/arrow-down.svg");
      background-size: cover;
    }
    .icon-down-2{
      position: absolute;
      .left(212);
    }
  }
  .detail-infos{
    position: absolute;
    .w(372);
    .top(188);
    .mb(60);
    height: auto;
    background: rgba(237, 240, 245, 1);
    .detail-info{
      position: relative;
      .w(374);
      .h(110);
      .mt(10);
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      .fs(14);
      line-height: 150%;
      text-align: center;
      .reward-desc{
        float: left;
        .h(20);
        .pt(34);
        color: rgba(0, 0, 0, 1);
        .fs(12);
        line-height: 150%;
        text-align: left;
      }
      .total-reward{
        float: left;
        .pt(24);
        .pl(15);
        .h(28);
        color: rgba(255, 87, 51, 1);
        .fs(22);
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }
      .head-portrait{
        float: right;
        .pt(16);
        .pr(15);
        .w(48);
        .h(48);
        img{
          .b-radius(64);
          filter: saturate(1.0) hue-rotate(0deg) brightness(1.0) contrast(1.0);
          .w(48);
          .h(48);
        }
      }
      .custom-type{
        clear: left;
        float: left;
        .pl(15);
        .pt(2);
        color: rgba(255, 87, 51, 1);
        .fs(14);
        line-height: 150%;
        text-align: left;
      }
      .from{
        clear: right;
        float: right;
        .pr(15);
        color: rgba(0, 0, 0, 1);
        .fs(14);
        line-height: 150%;
        text-align: right;
        font-weight: bold;
      }
      .buy-card{
        clear: left;
        float: left;
        .pt(10);
        .pl(15);
        color: rgba(166, 166, 166, 1);
        .fs(12);
        line-height: 150%;
        text-align: left;
      }
    .card-money{
      float: left;
      color: rgba(0, 0, 0, 1);
      .fs(14);
      .pl(2);
      .pt(8);
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
    .buy-traffic{
      float: left;
      .pl(50);
      .pt(10);
      color: rgba(166, 166, 166, 1);
      .fs(12);
      line-height: 150%;
      text-align: left;
    }
    .traffic-money{
      float: left;
      color: rgba(0, 0, 0, 1);
      .pl(2);
      .pt(8);
      .fs(14);
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
    .phone{
      clear: right;
      float: right;
      .pr(15);
      color: rgba(0, 0, 0, 1);
      .fs(14);
      line-height: 150%;
      text-align: right;
    }
    }
  }
  .scrollTop{
    position: fixed;
    .right(20);
    .bottom(70);
    .w(40);
    .h(40);
    background-color: rgba(0, 121, 255, 1);
    .b-radius(21);
    .icon-arrow-up{
      position: fixed;
      .right(28);
      .bottom(82);
      .w(24);
      .h(20);
      .fs(24);
      line-height: 150%;
      text-align: center;
      background-image: url("../../assets/imgs/income/arrow-up-blue.svg");
      background-size: cover;
    }
  }
}
select {
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  .pr(22);
  color: rgba(0, 121, 255, 1);
  background-color: rgba(255,255,255,1) ;
  .fs(16);
  line-height: 150%;
  text-align: left;
  font-weight: bold;
  border: none;

}
select::-ms-expand { display: none; }
</style>
