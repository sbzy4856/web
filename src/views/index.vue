<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <div class="notice">
        <div class="noticeTop">通知公告</div>
        <div class="noticeContent">
          <el-image :src="noticeImg"></el-image>
          <div class="content">
            <div v-for="(item,index) in notice" :key="index">
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rule">
        <div class="ruleTop">规章制度</div>
        <div class="ruleContent"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from '@/components/Layout/homeHeader'
import noticeImg from '@/assets/images/公告.png'

export default {
  components: {
    Header
  },
  data() {
    return {
      sideNavRouter: [],
      noticeImg: noticeImg,
      notice: {}
    }
  }
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
  background: linear-gradient(#29bded, white);
  padding: 0;
  height: 160px !important;
}
.el-container {
  width: 60%;
  height: 100%;
  margin-left: 20%;
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
