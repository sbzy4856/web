<template>
  <el-container>
    <el-main>
      <div class="notice">
        <div class="noticeContent">
          <div style="width: 100%">
            <div class="content">
              <div class="title">{{ data.noticeTitle }}</div>
              <div class="time">{{ data.updateTime }}</div>
            </div>
          </div>
        </div>
        <div class="bottom">{{ data.noticeContent }}</div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      data: null
    }
  },
  created() {
    this.data = JSON.parse(this.$route.query.data)
    // this.content = this.$route.params
    console.log(this.data)
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
.noticeTop {
  text-align: center;
  margin: 20px 0 20px 0;
  font-size: 28px;
  font-weight: 700;
}
.noticeContent {
  display: flex;
  .content {
    width: 100%;
    border-bottom: 1px solid #dedede;
    padding: 2px;
    padding-right: 20px;
    .title {
      display: flex;
      justify-content: center;
      font-size: 30px;
    }
    .time {
      margin-top: 50px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
    }
  }
}
.bottom {
  padding: 20px 20px 0 20px;
  white-space: pre-line;
}
.ruleTop {
  text-align: center;
  margin: 20px 0 20px 0;
  font-size: 28px;
  font-weight: 700;
}
</style>
