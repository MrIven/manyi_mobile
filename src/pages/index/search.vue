<template>
  <div class="content-box">
    <common-header :tittle="tittle"  :showback="true"></common-header>
    <div class="search-div">
      <input v-model="searchValue" class="search-box"/>
    </div>
    <div class="icon_search" @click="search_click"></div>
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      auto-fill='true'
      :bottom-all-loaded="allLoaded" ref="loadmore">
      <div  class="detail-infos">
        <span class="search_desc" v-if="list.length > 0">搜索结果</span>
        <span class="search_desc" v-else>暂无数据</span>
        <div class="detail-info" v-for="(item, index) in list" :key="index">
            <span class="total-reward">
              {{item.value1}}
            </span>
          <span class="reward-desc">{{item.value2}}</span>
          <div class="head-portrait">
            <div class="portrait-img"></div>
          </div>
          <div class="custom-type">{{item.value3}}</div>
          <div class="from">{{item.value4}}</div>
          <div class="join-time">{{item.value6}}</div>
          <div class="join-time-desc">{{item.value5}}</div>
          <div class="phone">{{item.value9}}</div>
        </div>
      </div>
    </mt-loadmore>
    <div class="scrollTop" @click="scrollTop">
      <div class="icon-arrow-up"></div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
export default {
  data () {
    return {
      tittle: '搜索',
      searchValue: '',
      list: [
        {
          value1: '+132',
          value2: '累计邀请人数',
          value3: '直推客户',
          value4: '来自: 李四',
          value5: '加入时间',
          value6: '2019-07-01',
          value9: '180 5896 8584'

        }, {
          value1: '+132',
          value2: '累计邀请人数',
          value3: '直推客户',
          value4: '来自: 李四',
          value5: '加入时间',
          value6: '2019-07-01',
          value9: '180 5896 8584'

        }, {
          value1: '+132',
          value2: '累计邀请人数',
          value3: '直推客户',
          value4: '来自: 李四',
          value5: '加入时间',
          value6: '2019-07-01',
          value9: '180 5896 8584'

        }, {
          value1: '+132',
          value2: '累计邀请人数',
          value3: '直推客户',
          value4: '来自: 李四',
          value5: '加入时间',
          value6: '2019-07-01',
          value9: '180 5896 8584'

        }
      ],
      num: 0
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    scrollTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    todetail() {
      this.$router.togo('/Home/Detail')
    },
    search_click() {
      alert(this.searchValue)
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
.content-box{
  .search-div{
    position: absolute;
    .w(374);
    .h(87);
    .top(59);
    color: rgba(80, 80, 80, 1);
    background-color: rgba(255, 255, 255, 1);
    .fs(14);
    line-height: 150%;
    text-align: center;
    .search-box{
      position: absolute;
      .w(270);
      .h(41);
      .top(24);
      .left(48);
      .t-indent(5);
      color: rgba(0, 0, 0, 1);
      background-color: rgba(237, 240, 245, 1);
      .b-radius(21);
      .fs(17);
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
  }
  .icon_search{
    position: absolute;
    .w(30);
    .h(30);
    .top(90);
    .left(329);
    .fs(30);
    color: rgba(0, 121, 255, 1);
    background-image: url("../../assets/imgs/team/search.svg");
    background-size: cover;
  }
}
.detail-infos{
  position: absolute;
  .w(372);
  .top(170);
  .mb(60);
  height: auto;
  background: rgba(237, 240, 245, 1);
  .search_desc{
    position: absolute;
    display: inline-block;
    float:left;
    .width(95);
    .height(25);
    .left(18);
    .top(-16);
    .fs(14);
    color: rgba(80, 80, 80, 1);
    line-height: 150%;
    text-align: left;
  }
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
      float: right;
      .h(20);
      .pr(4);
      .pt(34);
      color: rgba(0, 0, 0, 1);
      .fs(12);
      line-height: 150%;
      text-align: right;
    }
    .total-reward{
      float: right;
      .pt(24);
      .pr(15);
      .h(28);
      color: rgba(255, 87, 51, 1);
      .fs(22);
      line-height: 150%;
      text-align: right;
      font-weight: bold;
    }
    .head-portrait{
      float: left;
      .pt(16);
      .pl(15);
      .w(48);
      .h(48);
      .portrait-img{
        .b-radius(25);
        .w(48);
        .h(48);
        background-image: url("../../assets/imgs/income/head-portrait.jpeg");
        background-size: cover;
      }
    }
    .custom-type{
      clear: right;
      float: right;
      .pr(15);
      .pt(12);
      color: rgba(255, 87, 51, 1);
      .fs(14);
      line-height: 150%;
      text-align: right;
    }
    .from{
      clear: left;
      float: left;
      .pl(15);
      color: rgba(0, 0, 0, 1);
      .fs(14);
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
    .join-time-desc{
      float: right;
      color: rgba(166, 166, 166, 1);
      .fs(12);
      .pr(4);
      .pt(2);
      line-height: 150%;
      text-align: right;
    }
    .join-time{
      clear: right;
      float: right;
      .pt(0);
      .pr(15);
      color: rgba(0, 0, 0, 1);
      .fs(14);
      line-height: 150%;
      text-align: right;
      font-weight: bold;
    }
    .phone{
      clear: left;
      float: left;
      .pl(15);
      color: rgba(0, 0, 0, 1);
      .fs(14);
      line-height: 150%;
      text-align: left;
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
</style>
