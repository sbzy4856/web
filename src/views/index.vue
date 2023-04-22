<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <el-carousel indicator-position="outside">
        <el-carousel-item
          class="parent-swiper"
          v-for="(item, index) in imageData"
          :key="index"
        >
          <img
            :src="item.url"
            alt=""
            class="image son-swiper"
          />
        </el-carousel-item>
      </el-carousel>
      <div class="notice">
        <div class="noticeTop">通知公告</div>
        <div class="noticeContent">
          <el-image :src="noticeImg"></el-image>
          <div style="width: 100%">
            <div
              v-for="(item, index) in tableData"
              :key="index"
            >
              <div
                v-if="item.noticeState === '已发布'"
                class="content"
              >
                <el-link @click="toDetail(item)">
                  {{ item.noticeTitle }}
                </el-link>
                <div>{{ item.updateTime }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rule">
        <div class="ruleTop">规章制度</div>
        <div class="ruleContent">
          <div style="width: 100%">
            <div class="content">
              <el-link>浙大城市学院实验教学工作管理条例</el-link>
              <div>2023-02-28 00:00:00</div>
            </div>
            <div class="content">
              <el-link>实验室低值耐用品、易耗品管理办法</el-link>
              <div>2023-02-28 00:00:00</div>
            </div>
            <div class="content">
              <el-link>浙大城市级学院开放性实验教学管理规定</el-link>
              <div>2023-02-28 00:00:00</div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from '@/components/Layout/homeHeader'
import noticeImg from '@/assets/images/公告.png'
import { getAllNotices } from '@/api/notice/notice'

export default {
  components: {
    Header
  },
  data() {
    return {
      sideNavRouter: [],
      noticeImg: noticeImg,
      tableData: [],
      formData: {
        title: '',
        state: ''
      },
      paginationData: {},
      imageData: [
        {
          url: require('@/assets/images/2023030355694.jpeg')
        },
        {
          url: require('@/assets/images/2023030388728_.jpeg')
        },
        {
          url: require('@/assets/images/2023030391833.jpg')
        }
      ]
    }
  },
  created() {
    this.getAllNotices()
  },
  methods: {
    toDetail(data) {
      // console.log(data)
      const { href } = this.$router.resolve({
        name: 'noticeContent',
        query: {
          data: JSON.stringify(data)
        }
      })
      window.open(href, '_blank')
    },
    getAllNotices(resetCurrent = false) {
      getAllNotices({
        params: {
          ...this.formData,
          page: resetCurrent ? 1 : this.paginationData.current || 1,
          size: this.paginationData.size || 10
        }
      }).then((res) => {
        let { records = [], ...other } = res
        this.tableData = records
        this.paginationData = { ...other }
      })
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
  padding: 0;
  height: 160px !important;
}
.el-container {
  background: linear-gradient(#29bded, white);
  width: 100%;
  height: 100%;
  padding-left: 20%;
  padding-right: 20%;
}
.el-aside {
  background: #1d61aa;
}
.el-main {
  overflow: auto;
  padding: 0 !important;
  margin: 10px 20px 0 10px;
  height: calc(100vh - 70px);
}
.noticeTop {
  text-align: center;
  margin: 20px 0 20px 0;
  font-size: 28px;
  font-weight: 700;
}
.noticeContent {
  display: flex;
  .el-image {
    margin-left: 20px;
    width: 40%;
    margin-right: 20px;
  }
  .content {
    width: 100%;
    border-bottom: 1px solid #dedede;
    padding: 2px;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
  }
}
.ruleTop {
  text-align: center;
  margin: 20px 0 20px 0;
  font-size: 28px;
  font-weight: 700;
}
.ruleContent {
  .content {
    width: 80%;
    margin-left: 20px;
    border-bottom: 1px solid #dedede;
    padding: 2px;
    display: flex;
    justify-content: space-between;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.parent-swiper {
  width: 100%;
  height: 100%;
  .son-swiper {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
