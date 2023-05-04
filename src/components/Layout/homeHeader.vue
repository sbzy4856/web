<template>
  <div class="header">
    <div class="header-site">
      <h1>实验教学管理平台</h1>
    </div>
    <div class="header-user">
      <router-link
        class="white mr20"
        to="/login"
        v-if="userInfo === null"
      >
        登录
      </router-link>
      <router-link
        to
        v-else
      >
        <el-button
          style="color: black; text-decoration: underline; font-size: 16px"
          type="text"
          @click="$router.back(-1)"
        >
          返回
        </el-button>
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
      headerMenu: [],
      userInfo: null
    }
  },
  created() {
    this.userInfo = sessionStorage.getItem('userInfo')
      ? sessionStorage.getItem('userInfo')
      : null
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
    width: 90%;
    display: flex;
    justify-content: center;
    color: #555555;
    h1 {
      font-size: 36px;
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
