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
        prop="projectName"
        label="实验项目名称"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="courseName"
        label="关联课程名称"
      ></el-table-column>
      <el-table-column
        prop="projectType"
        label="实验项目类型"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="studentNum"
        label="学生数"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="join(scope.row)"
          >
            参与课程
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
  </div>
</template>

<script>
import { findByCourseId } from '@/api/project/project'
import { addStudentToProject } from '@/api/student-project/student-project'

export default {
  data() {
    return {
      formData: {},
      paginationData: {},
      tableData: [],
      user: null
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    this.formData.userId = this.user.userId
    this.initData()
  },
  methods: {
    findByCourseId(resetCurrent = false) {
      findByCourseId(this.$route.params.courseId, {
        params: {
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
      this.findByCourseId()
    },
    join(data) {
      console.log(data)
      let sendData = {
        studentId: this.user.userId,
        studentName: this.user.userName,
        courseId: data.courseId,
        courseName: data.courseName,
        projectId: data.projectId,
        projectName: data.projectName
      }
      console.log(sendData)
      addStudentToProject({ data: { ...sendData } }).then((res) => {
        console.log(res)
        if (res) {
          this.$message.success('参与成功！')
          this.initData()
        }
      })
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
    back() {
      this.$router.push('student-course')
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
