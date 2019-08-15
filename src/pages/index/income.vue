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
      <div class="middle-word-3">我要提现</div>
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
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="detail-infos" v-for="(item, index) in list">
          <div class="total-reward">+132.00</div>
          <div class="reward-desc">累计奖励</div>
          <div class="head-portrait"></div>
          <div class="custom-type">直推客户</div>
          <div class="from">来自: 李四</div>
          <div class="buy-card">买卡</div>
          <div class="card-money">10.00</div>
          <div class="buy-traffic">买流量</div>
          <div class="traffic-money">122.00</div>
          <div class="phone">180 5896 8584</div>
        </div>
      </mt-loadmore>
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
      pickerShowValue: moment(new Date()).format('YYYY年DD月'),
      allLoaded: false,
      curPage: 1
    }
  },
  methods: {
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
    },
    todetail() {
      this.$router.togo('/Home/Detail')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.body-header{
  position: absolute;
  width: 375px;
  height: 191px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(42, 130, 228, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.body-middle{
  position: absolute;
  z-index: 5;
  width: 349px;
  height: 204px;
  left: 13px;
  top: 79px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  .middle-word-0{
    position: absolute;
    width: 77px;
    height: 20px;
    left: 20px;
    top: 20px;
    color: rgba(0, 0, 0, 1);
    font-size: 12px;
    line-height: 150%;
    text-align: left;
  }
  .middle-value-0{
    position: absolute;
    width: 152px;
    height: 30px;
    left: 97px;
    top: 10px;
    color: rgba(0, 0, 0, 1);
    font-size: 26px;
    line-height: 150%;
    text-align: left;
    font-weight: bold;
  }
  .middle-value-1,.middle-value-2{
    position: absolute;
    width: 104px;
    height: 27px;
    left: 51px;
    top: 66px;
    color: rgba(0, 0, 0, 1);
    font-size: 24px;
    line-height: 150%;
    text-align: center;
    font-weight: bold;
  }
  .middle-value-2{
    left: 197px;
  }
  .middle-word-1,.middle-word-2{
    position: absolute;
    width: 104px;
    height: 27px;
    left: 51px;
    top: 93px;
    color: rgba(166, 166, 166, 1);
    font-size: 12px;
    line-height: 150%;
    text-align: center;
  }
  .middle-word-2{
    left: 197px;
  }
  .vertical-line{
    position: absolute;
    width: 1px;
    height: 60px;
    left: 174px;
    top: 63px;
    color: rgba(80, 80, 80, 1);
    background-color: rgba(153, 153, 153, 1);
    font-size: 14px;
    line-height: 150%;
    text-align: center;
  }
  .middle-word-3{
    position: absolute;
    width: 149px;
    height: 42px;
    left: 100px;
    top: 142px;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(255, 87, 51, 1);
    border-radius: 21px;
    font-size: 18px;
    line-height: 250%;
    text-align: center;
  }
}
.body-bottom{
  position: absolute;
  z-index: 4;
  width: 374px;
  height: 400px;
  left: 1px;
  top: 209px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(237, 240, 245, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  .income-detail{
    position: absolute;
    width: 375px;
    height: 87px;
    top: 90px;
    color: rgba(80, 80, 80, 1);
    background-color: rgba(255, 255, 255, 1);
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    .detail-word{
      position: absolute;
      width: 155px;
      height: 26px;
      left: 17px;
      top: 17px;
      color: rgba(0, 0, 0, 1);
      font-size: 20px;
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
    .year-month,.all,.sort-desc{
      position: absolute;
      width: 95px;
      height: 24px;
      left: 17px;
      top: 48px;
      color: rgba(42, 130, 228, 1);
      font-size: 16px;
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
    .all{
      position: absolute;
      width: 47px;
      left: 167px;
    }
    .sort-desc{
      position: absolute;
      width: 135px;
      height: 26px;
      left: 226px;
      top: 47px;
      color: rgba(166, 166, 166, 1);
      text-align: right;
    }
    .icon-down-1,.icon-down-2{
      position: absolute;
      width: 24px;
      height: 24px;
      left: 109px;
      top: 48px;
      font-size: 24px;
      color: rgba(42, 130, 228, 1);
      background-image: url("../../assets/imgs/index/arrow-down.svg");
      background-size: cover;
    }
    .icon-down-2{
      position: absolute;
      left: 200px;
    }
  }
}
.header-top{
  position: absolute;
  width: 375px;
  height: 59px;
  left: 1px;
  top: 0px;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  font-weight: bold;
}
.left-icon{
  position: absolute;
  width: 28px;
  height: 28px;
  left: 6px;
  top: 31px;
  font-size: 28px;
  color: rgba(255, 255, 255, 1);
  background-image: url("../../assets/imgs/index/arrow-left.svg");
  background-size: cover;
}
.return-back{
  position: absolute;
  width: 52px;
  height: 22px;
  left: 30px;
  top: 35px;
  letter-spacing: 0px;
  color: rgba(255, 255, 255, 1);
  font-size: 15px;
  line-height: 130%;
  text-align: left;
}
.income{
  position: absolute;
  width: 52px;
  height: 22px;
  left: 160px;
  top: 32px;
  letter-spacing: 0px;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  font-weight: bold;
}
</style>
