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
        ></el-menu>
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
          <el-dropdown-item @click.native="toPersonal">
            个人信息
          </el-dropdown-item>
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
    toPersonal() {
      this.$router.push({
        name: 'personalCenter'
      })
    },
    logout() {
      sessionStorage.removeItem('userInfo')
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
      padding-right: 20px;
    }
  }
}
::v-deep .el-dropdown {
  cursor: pointer;
  color: #ffffff;
}
</style>

