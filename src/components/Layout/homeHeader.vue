<template>
  <div class="header">
    <div class="header-site">
      <div class="image-message">
        <!-- <img src="@/assets/logo.png" alt="" class="image-logo" /> -->
        <p class="company">{{ siteName }}</p>
      </div>
      <div class="site-nav">
        <el-menu
          background-color="#024996"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router
        >
          <el-menu-item
            :index="item.name"
            v-for="(item, index) in headerMenu"
            :key="index"
          >
            {{ item.meta.title }}
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="header-user">
      <router-link
        class="white mr20"
        to="/login"
      >
        登录
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      electronicManager: false,
      activerouter: '',
      siteName: '',
      casEnable: false,
      headerMenu: []
    }
  },
  methods: {
    handleSelect() {}
  }
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  height: 60px;
  .header-site {
    display: flex;
    justify-content: flex-start;
    .image-message {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 20px;
      .image-logo {
        height: 19px;
        margin-left: 20px;
        margin-right: 2px;
      }
      .company {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-right: 62px;
      }
    }
  }
  .header-user {
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    align-items: center;
    .user-logo {
      height: 36px;
      width: 36px;
      margin: 0 6px 0 17px;
    }
    .username {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
  background: #4c8af2;
}
.el-menu--horizontal > .el-menu-item {
  color: #ffffff;
  height: 49px;
  margin-right: 30px;
}
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: #024996 !important;
  color: #fffe00;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 3px solid #fffe00;
  color: #fffe00;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
.el-menu-item {
  padding: 0;
  margin-right: 30px;
}
.msgPrompt {
  font-size: 26px;
  position: relative;
  color: #ffffff;
  .badge {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    color: #ffffff;
    background: #ff0000;
    line-height: 20px;
    display: block;
    font-size: 11px !important;
    text-align: center;
    position: absolute;
    top: 16%;
    left: 66%;
  }
}

::v-deep .el-dropdown {
  color: #ffffff;
}
</style>

