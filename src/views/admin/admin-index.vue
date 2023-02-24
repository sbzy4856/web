<template>
  <el-container>
    <el-header>
      <Header @changeSideRouter="changeSideRouter"></Header>
    </el-header>
    <el-container>
      <el-aside width="184px">
        <SideNav :sideNavRouter="sideNavRouter" />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from './header'
import SideNav from '@/components/Layout/side-nav'
export default {
  components: {
    Header,
    SideNav
  },
  data() {
    return {
      sideNavRouter: []
    }
  },
}
</script>
<style lang="scss" scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif, MicrosoftYaHei-Bold,
    MicrosoftYaHei;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.el-header {
  // background: #4c8af2;
  background: #024996;
  padding: 0;
}
.el-container {
  background: #f4f5f7;
  height: 100%;
}
.el-aside {
  background: #1d61aa;
}
.el-main {
  overflow: auto;
  padding: 0 !important;
  margin: 10px 20px 0 10px;
  height: calc(100vh - 70px);
  background: #f2f3f4;
}
</style>

