<template>
  <div>
    <el-button
      type="primary"
      @click="back"
    >
      返回
    </el-button>
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
  </div>
</template>

<script>
import { getAllFiles } from '@/api/file/file'

export default {
  data() {
    return {
      formData: {
        title: '',
        state: ''
      },
      paginationData: {},
      tableData: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    getAllFiles(resetCurrent = false) {
      getAllFiles({
        params: {
          ...this.formData,
          courseId: this.$route.params.courseId,
          page: resetCurrent ? 1 : this.paginationData.current || 1,
          size: this.paginationData.size || 10
        }
      }).then((res) => {
        let { records = [], ...other } = res
        this.tableData = records
        this.paginationData = { ...other }
      })
    },
    initData() {
      this.getAllFiles()
    },
    back() {
      this.$router.push('course-manage')
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
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  margin-top: 20px;
  padding-bottom: 20px;
  .input {
    width: 10%;
  }
  .select {
    width: 10%;
    margin-left: 20px;
  }
  .search {
    margin-left: 20px;
  }
}
.pagination {
  text-align: right;
  margin-top: 20px;
  margin-right: 20px;
}
::v-deep.el-table .cell {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
