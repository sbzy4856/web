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
        prop="logAccount"
        label="账号"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="logName"
        label="姓名"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="logTime"
        label="登录时间"
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
import { getAllLogs } from '@/api/login-log/login-log'

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
    getAllLogs(resetCurrent = false) {
      getAllLogs({
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
    },
    initData() {
      this.getAllLogs()
    },
    handleAdd(type, data) {
      let option = {
        type: type,
        data: { ...data }
      }
      this.$refs.addDialog.show(option)
    },
    handlePublish(id) {
      // console.log(id)
      this.$confirm('确认发布此公告吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          modifyNoticeState(id).then((res) => {
            // console.log(res)
            this.$message.success('发布成功！')
            this.initData()
          })
        })
        .catch(() => {
          // this.$message('已取消删除')
        })
    },
    handleDelete(id) {
      // console.log(id)
      this.$confirm('确认删除此公告吗？此操作不可逆。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteNotice(id).then((res) => {
            // console.log(res)
            this.$message.success('删除成功')
            this.initData()
          })
        })
        .catch(() => {
          // this.$message('已取消删除')
        })
    },
    search() {
      // console.log(this.formData)
      this.initData()
    },
    back() {
      this.$router.push('teacher-project')
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
