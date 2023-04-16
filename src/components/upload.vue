<template>
  <div>
    <el-button
      v-if="!hideButton"
      :type="button.type || 'primary'"
      icon="el-icon-upload2"
      @click="handleShowModal"
    >
      {{ button.text || '导入' }}
    </el-button>
    <el-dialog
      append-to-body
      title="上传文件"
      :visible="value || modaleVisible"
      @close="onCloseModal"
    >
      <div class="upload-content">
        <div class="upload-top">
          <el-upload
            v-loading="uploading"
            :action="action"
            :show-file-list="false"
            :data="data"
            :on-change="handleChange"
          >
            <el-button
              :disabled="uploading"
              icon="el-icon-upload2"
              type="primary"
            >
              上传
            </el-button>
          </el-upload>
          <!-- <a
            class="ml20"
            @click="handleDownLoad"
          >
            <i class="el-icon-download" />
            下载示例模板
          </a> -->
        </div>
        <!-- <div
          v-if="importMsg"
          class="message-body"
        >
          导入完成
          <span>
            ，成功
            <span class="color-primary">{{ importMsg.successNum }}</span>
            条数据！
          </span>
          <p
            v-if="importMsg.failNum && importMsg.failNum > 0"
            class="color-danger mt10"
          >
            失败： {{ importMsg.failNum }}条数据
            <el-button
              class="ml20"
              icon="el-icon-download"
              @click="onDownLoadFailData"
            >
              下载导入时错误数据
            </el-button>
          </p>
        </div> -->
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="onCloseModal">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { requestDownloadFailexcel } from '@/api/file'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    hideButton: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '上传文件'
    },
    action: {
      type: String,
      default: ''
    },
    downDemoLoad: {
      type: Object,
      default: () => {}
    },
    button: {
      type: Object,
      default: () => {}
    },
    downloadUrl: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      modaleVisible: false,
      uploading: false,
      importMsg: {},
      importResponseBody: {}
    }
  },
  watch: {
    value(newV) {
      if (newV) {
        this.importMsg = null
      }
    }
  },
  created() {},
  methods: {
    handleShowModal() {
      this.importMsg = null
      this.modaleVisible = true
    },
    onCloseModal() {
      this.$emit('input', false)
      this.$emit('importResult', this.importMsg)
      this.modaleVisible = false
    },
    handleChange(info) {
      console.log('info', info)
      this.uploading = true
      if (info.status == 'success') {
        if (info.response.code == 200) {
          this.upload = false
          this.uploading = false
          // this.importMsg = info.response.body
          this.importResponseBody = info.response ? info.response.data : {}
          this.$emit('uploadResponse', this.importResponseBody)
        } else {
          this.uploading = false
          this.$message.error(info.response.message)
        }
      }
    },
    handleDownLoad() {
      window.open(this.downloadUrl)
    }
    // onDownLoadFailData() {
    //   requestDownloadFailexcel({
    //     params: { filePath: this.importMsg.target },
    //     isDownload: true
    //   })
    // }
  }
}
</script>
<style scoped>
.upload-content {
  height: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.upload-top {
  display: flex;
  justify-content: center;
  margin: auto;
  line-height: 77px;
}
.message-body {
  text-align: left;
  margin-top: 10px;
  border: 1px solid #e8e8e8;
  padding: 10px;
  min-height: 100px;
  background: #f1f1f1;
}
</style>
