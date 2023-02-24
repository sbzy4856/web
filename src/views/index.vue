<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/Layout/homeHeader'

export default {
  components: {
    Header,
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
  background: #29bded;
  padding: 0;
  height: 160px !important;
}
.el-container {
  width: 80%;
  height: 100%;
  margin-left: 10%;
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
