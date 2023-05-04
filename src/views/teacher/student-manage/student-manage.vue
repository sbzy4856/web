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
        prop="courseName"
        label="课程名称"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="projectName"
        label="实验项目名称"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="studentName"
        label="学生姓名"
      ></el-table-column>
      <el-table-column
        prop="score"
        label="成绩"
      ></el-table-column>
      <el-table-column
        prop="do"
        label="操作"
      >
        <el-button type="text">评分</el-button>
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
  </div>
</template>

<script>
import { getAllStudents } from '@/api/student-project/student-project'

export default {
  data() {
    return {
      formData: {},
      paginationData: {},
      tableData: []
    }
  },
  created() {
    this.formData.projectId = this.$route.query.projectId
    this.initData()
  },
  methods: {
    getAllStudents(resetCurrent = false) {
      getAllStudents({
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
      this.getAllStudents()
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
