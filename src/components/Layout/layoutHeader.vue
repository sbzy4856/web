<template>
  <div class="header">
    <div class="header-site">
      <div class="image-message">
        <!-- <img src="@/assets/logo.png" alt="" class="image-logo" /> -->
        <p class="company">{{ siteName }}</p>
      </div>
      <div class="site-nav">
        <el-menu
          :default-active="activerouter"
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
            @click="getMenuIndex(index)"
          >
            {{ item.meta.title }}
          </el-menu-item>
          <el-menu-item @click="toStudyPlatform">学习平台</el-menu-item>
          <el-menu-item
            v-if="user.admin"
            @click="toElectronicManage"
          >
            电子班牌管理
          </el-menu-item>
          <el-menu-item @click="toWisdomPlatform">智慧表单系统</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="header-user">
      <router-link
        class="white mr20"
        to="/home"
      >
        首页
      </router-link>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="feedback">意见反馈</el-dropdown-item>
          <el-dropdown-item @click.native="layout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <feedBackDialog ref="feedBackDialog"></feedBackDialog>
  </div>
</template>
<script>
import { findSiteSetting } from '@/api/site-setting'
import { mapGetters } from 'vuex'
import auth from '@/utils/auth'
import router from '@/router/admin'
import feedBackDialog from '@/containers/feed-back/feedBackDialog'
import { getCasEnable, logout } from '../../api/login'
import { userInfo } from 'os'
export default {
  components: { feedBackDialog },
  data() {
    return {
      electronicManager: false,
      activerouter: '',
      siteName: '',
      casEnable: false,
      headerMenu: [],
      username: JSON.parse(localStorage.getItem('userInfo'))
        ? JSON.parse(localStorage.getItem('userInfo')).name
        : '',
      user: JSON.parse(localStorage.getItem('userInfo'))
        ? JSON.parse(localStorage.getItem('userInfo'))
        : {}
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'permissionList'])
  },
  watch: {
    sidebar(newVal) {
      console.log(newVal, 'sidebar')
    }
  },
  created() {
    this.$nextTick(() => {
      this.initActiverouter()
    })
    console.log(router, 'router-----------')
    this.headerMenu = router[0].children.filter((item) => {
      return JSON.parse(localStorage.getItem('userInfo')).permissions.includes(
        item.meta.code
      )
    })
    this.isElectronicManager()
    this.findSetting()
  },
  methods: {
    findSetting() {
      findSiteSetting().then((res) => {
        this.siteName = res.siteName
      })
    },
    initActiverouter() {
      if (this.sidebar) {
        this.activerouter = this.sidebar
      } else {
        this.activerouter = this.headerMenu[0].name
      }
    },
    handleSelect(key, keyPath) {
      this.$store.commit('app/TOGGLE_SIDEBAR', key)
    },
    isElectronicManager() {
      let user = JSON.parse(localStorage.getItem('userInfo'))
      user.authorities.map((item) => {
        this.electronicManager = true

        //对角色进行判断
        if (item.authority == 'ELECTRONIC_CLASS_BOARD_MANAGE') {
          this.electronicManager = true
          console.log('角色为ELECTRONIC_CLASS_BOARD_MANAGE')
        }
      })
      console.log(user.authorities)
    },
    toElectronicManage() {
      window.location = 'http://172.16.8.19:8089/singleLogon.php'
    },
    toStudyPlatform() {
      window.location = 'http://210.47.129.139:8082/login'
    },
    toWisdomPlatform() {
      window.location = 'http://210.47.129.147:8083'
    },
    getMenuIndex(index) {
      let sideNavRouter = this.headerMenu[index].children.filter((item) => {
        return (
          item.meta.noCache == true &&
          JSON.parse(localStorage.getItem('userInfo')).permissions.includes(
            item.meta.code
          )
        )
      })
      console.log(sideNavRouter, '------------------侧边栏')
      localStorage.setItem('sideNavRouter', JSON.stringify(sideNavRouter))
      this.$emit('changeSideRouter', localStorage.getItem('sideNavRouter'))
    },
    layout() {
      localStorage.clear()
      sessionStorage.clear()
      logout()
      this.$router.push({
        path: '/'
      })
      //   getCasEnable().then(res => {
      //     if (res){
      //       logout();
      //     }else {
      //       this.$router.push({
      //         path: "/",
      //       });
      //     }
      //   })
    },
    feedback() {
      if (this.user.admin) {
        this.$router.push({
          name: 'questionFeedback'
        })
      } else {
        this.$refs.feedBackDialog.show()
      }
    }
  }
}
</script>
<style lang="less" scoped>
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

