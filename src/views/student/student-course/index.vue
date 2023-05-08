<template>
  <div>
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
        prop="projectNum"
        label="实验项目数量"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="studentNum"
        label="学生数"
      ></el-table-column>
      <el-table-column
        prop="teacherName"
        label="教师名称"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="courseState"
        label="课程状态"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="checkProject(scope.row)"
          >
            查看关联实验计划
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="courseResources(scope.row)"
          >
            课程资源
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
    <upload
      v-model="importVisible"
      :hide-button="true"
      :action="uploadUrl"
      :data="uploadData"
      @uploadResponse="uploadResponse"
    />
  </div>
</template>

<script>
import { getCourseList, updateCourse } from '@/api/course/course'

export default {
  data() {
    return {
      uploadUrl: '',
      formData: {},
      paginationData: {},
      tableData: [],
      user: null,
      importVisible: false,
      uploadData: {}
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    if (this.user.userState === '未激活') {
      this.$confirm('您还未激活，要去激活吗？', '提示', {
        confirmButtonText: '去激活',
        cancelButtonText: '暂时不去'
      }).then(() => {
        this.$router.push('personalCenter')
      })
    }
    this.formData.userId = this.user.userId
    this.initData()
  },
  methods: {
    getCourseList(resetCurrent = false) {
      getCourseList({
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
      this.getCourseList()
    },
    upload(data) {
      // this.$refs.uploadDialog.show(data)
      this.uploadData = {
        userId: this.user.userId,
        userName: this.user.userName,
        courseId: data.courseId,
        courseName: data.courseName
      }
      this.uploadUrl = `api/upload/teacher`
      this.importVisible = true
    },
    uploadResponse(data) {
      console.log(data, 'uploadREs')
      if (data) {
        this.initData()
        this.$message.success('上传成功！')
      }
    },
    checkProject(data) {
      this.$router.push({
        name: 'student-project',
        params: { courseId: data.courseId }
      })
    },
    courseResources(data) {
      this.$router.push({
        name: 'course-resource',
        params: { courseId: data.courseId }
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
.el-dropdown {
  margin-left: 10px;
  color: #409eff;
  cursor: pointer;
}
</style>
