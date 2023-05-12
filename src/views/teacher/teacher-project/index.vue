<template>
  <div>
    <el-button
      type="primary"
      @click="handleAdd('add', {})"
    >
      添加实验项目
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
            size="small"
            @click="handleAdd('detail', scope.row)"
          >
            查看
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleAdd('modify', scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="studentManage(scope.row)"
          >
            学生管理
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
    <addDialog
      ref="addDialog"
      @onload="initData"
    />
  </div>
</template>

<script>
import { getAllProjects } from '@/api/project/project'
import { getAllCourses } from '@/api/course/course'
import addDialog from './components/addDialog.vue'

export default {
  components: {
    addDialog
  },
  data() {
    return {
      formData: {},
      paginationData: {},
      tableData: [],
      user: null,
      courseIds: []
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    this.formData.userId = this.user.userId
    this.initData()
  },
  methods: {
    getAllCourses(resetCurrent = false) {
      getAllCourses({
        params: {
          ...this.formData,
          page: 1,
          size: 500
        }
      }).then((res) => {
        let { records = [], ...other } = res
        records.forEach((item, index) => {
          this.courseIds.push(item.courseId)
        })
        // this.courseIds = records
        this.getAllProjects()
      })
    },
    getAllProjects(resetCurrent = false) {
      getAllProjects({
        params: {
          ...this.formData,
          page: resetCurrent ? 1 : this.paginationData.current || 1,
          size: this.paginationData.size || 10
        }
      }).then((res) => {
        let { records = [], ...other } = res
        records.forEach((item, index) => {
          if (this.courseIds.includes(item.courseId)) {
            this.tableData.push(item)
          }
        })
        // this.tableData = records
        this.paginationData = { ...other }
      })
    },
    initData() {
      this.getAllCourses()
    },
    handleAdd(type, data) {
      let option = {
        type: type,
        data: { ...data }
      }
      this.$refs.addDialog.show(option)
    },
    studentManage(data) {
      this.$router.push({
        name: 'student-manage',
        params: { courseId: data.courseId },
        query: {
          projectId: data.projectId
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
