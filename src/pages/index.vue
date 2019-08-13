<template>
  <div class="page">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="nav-footer">
      <footer>
        <router-link v-for='(item, index) in navList' :to='item.path' :key='index'
                     v-bind:class="{'active':activeRoute == item.path}">
          <div :class="'tab-'+index"></div>
          <p :class="'tab_name'" v-text="item.name"></p>
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        {
          'path': '/home',
          'name': '主页'
        },
        {
          'path': '/income',
          'name': '收益'
        },
        {
          'path': '/team',
          'name': '团队'
        }
      ]
    }
  },
  computed: {
    activeRoute () {
      return this.$route.path
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.nav-footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    .h(47);
    background: @tab-general-bg-color;
    display: block;
    footer {
      font-size: 0;
      border-top: 1px solid #E7E7E7;
      border-bottom: 1px solid #F8F8F8;
      .pt(8);
      line-height: 1.2;
      width: 100%;
      .h(47);
      display: flex;
      a {
        text-decoration: none;
        color: @base-font-color;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
        box-sizing: border-box;
        display: block;
        .fs(22);
        .tab-0, .tab-1, .tab-2, .tab-3 {
          display: inline-block;
          .ml(0);
          .h(28);
          .w(28);
          background-size: cover;
        }
        .tab_name {
          position: absolute;
          display: inline;
          .top(16);
          .ml(3);
          .h(36);
          .fs(16)
        }
        .tab-0 {
          position: absolute;
          .left(36);
          background-image: url("../assets/imgs/index/index-noselect.svg");
        }
        .tab-1 {
          position: absolute;
          .left(161);
          background-image: url("../assets/imgs/index/income-noselect.svg");
        }
        .tab-2 {
          position: absolute;
          .left(286);
          background-image: url("../assets/imgs/index/team-noselect.svg");
        }
        &:hover {
          text-decoration: none;
        }
        &.router-link-active.active {
          .tab-0 {
            background-image: url("../assets/imgs/index/index-select.svg");
          }
          .tab-1 {
            background-image: url("../assets/imgs/index/income-select.svg");
          }
          .tab-2 {
            background-image: url("../assets/imgs/index/team-select.svg");
          }
        }
      }
      p {
        margin: 0;
      }
    }
  }
</style>
