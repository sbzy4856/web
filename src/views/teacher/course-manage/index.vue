<template>
  <div>
    <el-button
      type="primary"
      @click="handleAdd('add', {})"
    >
      添加课程
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
            @click="upload(scope.row)"
          >
            上传文件
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="studentManage(scope.row)"
          >
            学生管理
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="closeCourse(scope.row)"
            v-if="scope.row.courseState === '开启'"
          >
            关闭课程
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
    <upload
      v-model="importVisible"
      :hide-button="true"
      :action="uploadUrl"
      @importResult="importResult"
    />
  </div>
</template>

<script>
import { getAllCourses, updateCourse } from '@/api/course/course'
import addDialog from './components/addDialog.vue'

export default {
  components: {
    addDialog
  },
  data() {
    return {
      uploadUrl: '',
      formData: {},
      paginationData: {},
      tableData: [],
      user: null,
      importVisible: false
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
      this.getAllCourses()
    },
    handleAdd(type, data) {
      let option = {
        type: type,
        data: { ...data }
      }
      this.$refs.addDialog.show(option)
    },
    upload(data) {
      // this.$refs.uploadDialog.show(data)
      this.importVisible = true
    },
    importResult(data) {
      if (data && data.successNum > 0) {
        this.initData()
      }
    },
    studentManage() {},
    closeCourse(data) {
      console.log(data)
      data.courseState = '关闭'
      this.$confirm(
        '确认关闭此课程吗？关闭课程代表课程结束且不可逆，请确认！',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      )
        .then(() => {
          updateCourse({ data: { ...data } }).then((res) => {
            console.log(res)
            this.$message.success('关闭成功！')
            this.initData()
          })
        })
        .catch(() => {
          // this.$message('已取消删除')
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
