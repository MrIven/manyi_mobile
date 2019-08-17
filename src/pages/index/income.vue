<template>
  <div class="income-body">
    <div class="body-header">
      <div class="header-top">
        <span class="left-icon"></span>
        <span class="return-back">返回</span>
        <span class="income">收益</span>
      </div>
    </div>
    <div class="body-middle">
      <div class="middle-word-0">累计收入(元)</div>
      <div class="middle-value-0">999999999.9</div>
      <div class="middle-value-1">8899.00</div>
      <div class="middle-value-2">6699.00</div>
      <div class="middle-word-1">可提现(元)</div>
      <div class="middle-word-2">结算中(元)</div>
      <div class="vertical-line"></div>
      <button class="middle-word-3">我要提现</button>
    </div>
    <div class="body-bottom">
      <div class="income-detail">
        <div class="detail-word">收益明细</div>
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
          <div class="detail-info" v-for="(item, index) in list" :key="index">
            <span class="total-reward">
              {{item.value1}}
            </span>
            <span class="reward-desc">{{item.value2}}</span>
            <div class="head-portrait">
              <img src="../../assets/imgs/income/head-portrait.jpeg">
            </div>
            <div class="custom-type">{{item.value3}}</div>
            <div class="from">{{item.value4}}</div>
            <div class="buy-card">{{item.value5}}</div>
            <div class="card-money">{{item.value6}}</div>
            <div class="buy-traffic">{{item.value7}}</div>
            <div class="traffic-money">{{item.value8}}</div>
            <div class="phone">{{item.value9}}</div>
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

Vue.component(Picker.name, Picker)
Vue.component(DatetimePicker.name, DatetimePicker)

export default {
  data () {
    return {
      pickerValue: new Date(),
      pickerShowValue: moment(new Date()).format('YYYY年MM月'),
      allLoaded: false,
      list: [
        {
          value1: '+132.00',
          value2: '累计奖励',
          value3: '直推客户',
          value4: '来自: 李四',
          value5: '买卡',
          value6: '10.00',
          value7: '买流量',
          value8: '122.00',
          value9: '180 5896 8584'

        }, {
          value1: '+132.00',
          value2: '累计奖励',
          value3: '直推客户',
          value4: '来自: 李四',
          value5: '买卡',
          value6: '10.00',
          value7: '买流量',
          value8: '122.00',
          value9: '180 5896 8584'

        }, {
          value1: '+132.00',
          value2: '累计奖励',
          value3: '直推客户',
          value4: '来自: 李四',
          value5: '买卡',
          value6: '10.00',
          value7: '买流量',
          value8: '122.00',
          value9: '180 5896 8584'

        }, {
          value1: '+132.00',
          value2: '累计奖励',
          value3: '直推客户',
          value4: '来自: 李四',
          value5: '买卡',
          value6: '10.00',
          value7: '买流量',
          value8: '122.00',
          value9: '180 5896 8584'

        }
      ],
      curPage: 1
    }
  },
  methods: {
    scrollTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    dateConfirm(item) {
      this.pickerShowValue = moment(item).format('YYYY年MM月')
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
      let dateCreated = this.dateCreated
      this.$api.childLocationList({
        params: {
          id: this.uid,
          cid: this.curChildId,
          dateCreated: dateCreated,
          isPager: 1, // 0-不分页，1-分页；
          pageNum: this.curPage, // 第几页
          pageSize: this.pageSize // 每页显示数据条数
        }
      }).then(res => {
        if (res.code === 2000) {
          if (res.row) {
            let _list = res.row.list
            this.curPage = res.row.pageNum
            this.pageSize = res.row.pageSize
            let totalPages = res.row.pages // 总页数
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
      .left(160);
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
</style>
