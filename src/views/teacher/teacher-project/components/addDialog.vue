<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="40%"
    :before-close="handleClose"
  >
    <el-form
      ref="form"
      :model="formData"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item
        label="实验项目名称："
        prop="projectName"
      >
        <el-input
          v-model="formData.projectName"
          :disabled="type === 'detail'"
          placeholder="请输入实验项目名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="关联课程："
        prop="courseId"
      >
        <el-select
          v-model="formData.courseId"
          :disabled="type === 'detail'"
          placeholder="请选择关联课程"
        >
          <el-option
            v-for="item in courses"
            :key="item.id"
            :label="item.courseName"
            :value="item.courseId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="项目类型："
        prop="projectType"
      >
        <el-select
          v-model="formData.projectType"
          :disabled="type === 'detail'"
          placeholder="请选择项目类型"
        >
          <el-option
            v-for="item in projectTypes"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="bottom">
      <el-button
        v-if="type === 'detail'"
        @click="handleClose"
      >
        关闭
      </el-button>
      <el-button
        v-if="type !== 'detail'"
        @click="handleClose"
      >
        取消
      </el-button>
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        @click="save"
      >
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addProject, updateProject } from '@/api/project/project'
import { getAllCourses } from '@/api/course/course'

export default {
  data() {
    return {
      title: '',
      visible: false,
      type: null,
      formData: {},
      courseId: null,
      rules: {
        projectName: [
          { required: true, message: '请输入实验计划名称', trigger: 'change' }
        ],
        courseId: [
          { required: true, message: '请选择关联课程', trigger: 'change' }
        ],
        projectType: [
          { required: true, message: '请选择计划类型', trigger: 'change' }
        ]
      },
      user: null,
      projectTypes: [{ value: '大型' }, { value: '小型' }],
      courses: []
    }
  },
  methods: {
    show(option) {
      this.visible = true
      this.courseId = option.data.courseId
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
      this.formData.userId = this.user.userId
      this.getAllCourses()
      this.type = option.type
      if (option.type === 'add') {
        this.title = '添加实验项目'
      } else if (option.type === 'detail') {
        this.title = '查看实验项目'
        this.formData = option.data
      } else {
        this.title = '修改实验项目'
        this.formData = option.data
      }
    },
    getAllCourses(resetCurrent = false) {
      getAllCourses({
        params: {
          ...this.formData,
          page: 1,
          size: 500
        }
      }).then((res) => {
        let { records = [], ...other } = res
        this.courses = records
      })
    },
    handleClose() {
      this.visible = false
      this.formData = {}
      this.$refs.form.resetFields()
    },
    save() {
      console.log(this.formData)
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.type === 'add') {
            this.courses.forEach((item, index) => {
              if (this.formData.courseId === item.courseId) {
                this.formData.courseName = item.courseName
                this.formData.studentNum = 0
              }
            })
            addProject(
              { data: { ...this.formData } },
              this.user.userId,
              this.user.userName
            ).then((res) => {
              if (res) {
                this.$message.success('添加成功！')
                this.visible = false
                this.$emit('onload')
              }
            })
          } else if (this.type === 'modify') {
            this.courses.forEach((item, index) => {
              if (this.formData.courseId === item.courseId) {
                this.formData.courseName = item.courseName
              }
            })
            updateProject(this.courseId, { data: { ...this.formData } }).then(
              (res) => {
                this.$message.success('修改成功！')
                this.visible = false
                this.$emit('onload')
              }
            )
          }
        }
      })
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
