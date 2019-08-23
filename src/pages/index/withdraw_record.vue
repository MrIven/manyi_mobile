<template>
  <div class="income-body">
    <common-header :tittle="tittle"  :showback="true"></common-header>
    <div class="body-bottom">
      <div class="income-detail">
        <div class="detail-word">提现明细</div>
        <div class="year-month">{{pickerShowValue}}</div>
        <div class="icon-down-1" @click="openPicker"></div>
        <div class="all">全部</div>
        <div class="icon-down-2" @click="openPicker"></div>
        <div class="sort-desc">排序从高到低</div>
        <mt-datetime-picker
          ref="picker"
          type="date"
          year-format="{value}年"
          month-format="{value}月"
          date-format='{value}日'
          @confirm="dateConfirm"
          v-model="pickerValue">
        </mt-datetime-picker>
      </div>
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        auto-fill='true'
        :bottom-all-loaded="allLoaded" ref="loadmore">
        <div  class="detail-infos">
          <div class="detail-info" v-for="(item, index) in list" :key="index" @click="toWithdrawDetail(item.id)">
            <div class="head-portrait" >
              <img class="portrait-img" src="../../assets/imgs/income/head-portrait.jpeg"/>
            </div>
            <div class="desc-0">
              <span class="total-reward">
                +{{item.price/100}}
              </span>
              <div class="from">{{transTimeFormat(item.time)}}</div>
            </div>
            <div class="desc-1">
              <div class="join-time-desc">{{item.type_desc}}</div>
              <div class="join-time">账号：{{item.account}}</div>
            </div>
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
import commonHeader from 'common/common-header'
import * as withdrawRecordApi from 'api/withdraw-record-api'
import moment from 'moment'
import Vue from 'vue'

Vue.component(Picker.name, Picker)
Vue.component(DatetimePicker.name, DatetimePicker)

export default {
  data () {
    return {
      pickerValue: new Date(),
      tittle: '提现记录',
      pickerShowValue: moment(new Date()).format('YYYY年MM月'),
      allLoaded: false,
      list: [],
      curPage: 1
    }
  },
  components: {
    commonHeader
  },
  mounted: function () {
    withdrawRecordApi.fetchWithdrawalRecord(
      {
        token: localStorage.getItem('token'),
        choose_date: moment(this.pickerValue).format('YYYY-MM'),
        page: this.curPage
      }).then((res) => {
      console.log(res)
      this.list = res.data.data
      console.log(this.list)
    }).catch(() => {
    })
  },
  methods: {
    toWithdrawDetail(id) {
      this.$router.goRight('/withdrawApplication/' + id)
    },
    transTimeFormat(time) {
      return moment(time).format('MM-DD HH:mm')
    },
    scrollTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    dateConfirm(item) {
      this.pickerShowValue = moment(item).format('YYYY年MM月')
      withdrawRecordApi.fetchWithdrawalRecord(
        {
          token: localStorage.getItem('token'),
          choose_date: moment(this.pickerValue).format('YYYY-MM'),
          page: 1
        }).then((res) => {
        this.list = res.data.data
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
      this.curPage = 1
      this.getChildLocationList()
    },
    // 加载更多数据
    loadBottom() {
      this.curPage += 1
      this.getChildLocationList()
    },
    getChildLocationList() {
      this.allLoaded = false
      withdrawRecordApi.fetchWithdrawalRecord({
        params: {
          token: localStorage.getItem('token'),
          choose_date: moment(this.pickerValue).format('YYYY-MM'),
          page: this.curPage
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.data) {
            let _list = res.data.data.user_data
            let totalPages = _list.pages // 总页数
            // 下拉刷新 加载更多
            setTimeout(() => {
              this.$refs.loadmore.onTopLoaded()
              this.$refs.loadmore.onBottomLoaded()
            }, 1000)
            if (this.curPage === 1) {
              this.list = _list
            } else {
              if (this.curPage === totalPages) {
                this.allLoaded = true // 若数据已全部获取完毕
              }
              this.list = this.list.concat(_list) // 数组追加
            }
          } else {
            this.$refs.loadmore.onTopLoaded()
            this.allLoaded = true // 若数据已全部获取完毕
            this.list = []
          }
        } else {
          this.$refs.loadmore.onTopLoaded()
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
  .body-bottom{
    position: absolute;
    z-index: 4;
    .w(374);
    height: auto;
    .left(1);
    .top(-30);
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
      .year-month,.all,.sort-desc{
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
        .w(47);
        .left(167);
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
        .left(109);
        .top(48);
        .fs(24);
        color: rgba(42, 130, 228, 1);
        background-image: url("../../assets/imgs/index/arrow-down.svg");
        background-size: cover;
      }
      .icon-down-2{
        position: absolute;
        .left(200);
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
        .h(100);
        .mt(20);
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        .fs(14);
        line-height: 150%;
        text-align: left;
        .desc-0{
          display: inline-block;
          .w(82);
          .total-reward{
            display: inline-block;
            .h(28);
            .ml(8);
            color: rgba(255, 87, 51, 1);
            .fs(22);
            line-height: 150%;
            text-align: right;
            font-weight: bold;
          }
          .from{
            display: inline-block;
            .ml(10);
            .w(80);
            color: rgba(0, 0, 0, 1);
            .fs(14);
            line-height: 150%;
            text-align: left;
            font-weight: bold;
          }
        }
        .desc-1{
          display: inline-block;
          .w(210);
          text-align: right;
          color: rgba(0, 0, 0, 1);
          .fs(12);
          line-height: 150%;
          text-align: right;
          .join-time-desc{
            .w(210);
            display: inline-block;
          }
          .join-time{
            display: inline-block;
          }
        }
        .head-portrait{
          display: inline-block;
          .pt(16);
          .pl(15);
          .w(48);
          .h(48);
          .portrait-img{
            .b-radius(25);
            .w(48);
            .h(48);
            background-image: url('../../assets/imgs/income/head-portrait.jpeg');
            background-size: cover;
          }
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

</style>
