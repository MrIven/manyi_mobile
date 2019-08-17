<template>
    <div class="header-box">
      <div class="left-icon">
        <span v-if="showback" @click="back" class="icon-back"></span>
        <span v-if="showback" @click="back" class="icon-back-desc">返回</span>
      </div>
      <div class="header-title">
        <span v-if="showback" class="title-desc">{{tittle}}</span>
      </div>
      <div class="header-more"></div>
    </div>
</template>

<script>
import cusInput from 'common/cus-input'
export default {
  data() {
    return {}
  },
  props: {
    showright: {
      type: Boolean,
      default: false
    },
    showleft: {
      type: Boolean,
      default: false
    },
    showinput: {
      type: Boolean,
      default: true
    },
    tittle: {
      type: String,
      default: '标题'
    },
    showback: {
      type: Boolean,
      default: true
    },
    showmore: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      this.$router.goBack()
    }
  },
  components: {
    cusInput
  }
}
</script>

<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.header-box{
  .h(59);
  background-color: rgba(42, 130, 228, 1);
  color: @base-header-color;
  .fs(@base-header-size);
  display: flex;
  z-index: 1;
  .left-icon{
    position: relative;
    flex: 1;
    .icon-back{
      position: absolute;
      .w(28);
      .h(28);
      .left(4);
      .top(14);
      background-image: url("../assets/imgs/index/arrow-left.svg");
      background-size: cover;
    }
    .icon-back-desc{
      position: absolute;
      color: @base-header-color;
      .fs(16);
      .top(16);
      .w(56);
      .h(28);
      .left(16);
    }
  }
  .header-title{
    flex: 1;
    .title-desc{
      position: absolute;
      .left(160);
      .top(20);
      .fs(18);
      color: rgba(255, 255, 255, 1);
      line-height: 150%;
      text-align: center;
      font-weight: bold;
    }
  }
  .header-more{
    flex: 1;
  }
}
</style>
