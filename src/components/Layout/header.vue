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
          :default-active="activeIndex"
          router
        >
          <el-menu-item index="notice" v-if="user.userType === '管理员'">
            公告管理
          </el-menu-item>
          <el-menu-item v-if="user.userType === '管理员'">
            用户信息管理
          </el-menu-item>
          <el-menu-item
            v-if="
              user.userType === '管理员' ||
              user.userType === '教师' ||
              user.userType === '助教'
            "
          >
            实验项目
          </el-menu-item>
          <el-menu-item
            v-if="
              user.userType === '管理员' ||
              user.userType === '教师' ||
              user.userType === '助教'
            "
          >
            课程管理
          </el-menu-item>
          <el-menu-item v-if="user.userType === '学生'">实验项目</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="header-user">
      <router-link
        class="home"
        to="/"
      >
        首页
      </router-link>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      electronicManager: false,
      activeIndex: 'notice',
      siteName: '',
      casEnable: false,
      headerMenu: []
    }
  },
  methods: {
    handleSelect() {},
    logout() {
      sessionStorage.removeItem('userAccount')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('userType')
      this.$router.push('/login')
    }
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
      margin-left: 184px;
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
    .home {
      color: white;
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

