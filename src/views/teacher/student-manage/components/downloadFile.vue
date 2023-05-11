<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="50%"
    :before-close="handleClose"
  >
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        prop="fileName"
        label="文件名"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="上传人"
      ></el-table-column>
      <el-table-column
        prop="uploadTime"
        label="上传时间"
      ></el-table-column>
      <el-table-column
        prop="operation"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="download(scope.row)"
          >
            下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="paginationData.current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="paginationData.size"
      layout="total,sizes, prev, pager, next"
      :total="paginationData.total"
    ></el-pagination>
    <div class="bottom">
      <el-button @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getStudentFiles } from '@/api/file/file'

export default {
  data() {
    return {
      title: '',
      visible: false,
      formData: {},
      user: null,
      paginationData: {},
      tableData: []
    }
  },
  methods: {
    show(option) {
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
      this.visible = true
      this.title = '评分'
      this.formData = option
      this.getStudentFiles()
    },
    getStudentFiles(resetCurrent = false) {
      getStudentFiles({
        params: {
          userId: this.user.userId,
          type: 'student',
          page: resetCurrent ? 1 : this.paginationData.current || 1,
          size: this.paginationData.size || 10
        }
      }).then((res) => {
        let { records = [], ...other } = res
        this.tableData = records
        this.paginationData = { ...other }
      })
    },
    handleClose() {
      this.visible = false
      this.formData = {}
    },
    handleSizeChange(size) {
      this.paginationData = {
        ...this.paginationData,
        size
      }
      this.initData()
    },
    handleCurrentChange(current) {
      this.paginationData = {
        ...this.paginationData,
        current
      }
      this.initData()
    },
    download(data) {
      console.log(data)
      let filePath = `http://localhost:10086/student/${data.outfileName}`
      window.open(filePath)
      // studentDownload({ params: { file: data.filePath } }).then((res) => {
      //   console.log(res)
      //   window.open(res)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  display: flex;
  flex-direction: row-reverse;
  .el-button {
    margin-left: 20px;
  }
}
</style>
