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
        label="学生名称："
        prop="studentName"
      >
        <el-input
          v-model="formData.studentName"
          :disabled="true"
          placeholder="请输入学生名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="课程名称："
        prop="courseName"
      >
        <el-input
          v-model="formData.courseName"
          :disabled="true"
          placeholder="请输入课程名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="分数："
        prop="score"
      >
        <el-input
          v-model="formData.score"
          placeholder="请输入分数"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="bottom">
      <el-button @click="handleClose">取消</el-button>
      <el-button
        type="primary"
        @click="save"
      >
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addCourse, updateCourse } from '@/api/course/course'
import { revisionOfStudentGrades } from '@/api/student-project/student-project'

export default {
  data() {
    return {
      title: '',
      visible: false,
      formData: {},
      rules: {
        score: [{ required: true, message: '请输入分数', trigger: 'change' }]
      },
      user: null
    }
  },
  methods: {
    show(option) {
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
      this.visible = true
      this.title = '评分'
      this.formData = option
    },
    handleClose() {
      this.visible = false
      this.formData = {}
    },
    save() {
      console.log(this.formData)
      this.$refs.form.validate((valid) => {
        if (valid) {
          revisionOfStudentGrades(
            { data: { ...this.formData } },
            this.user.userId,
            this.user.userName
          ).then((res) => {
            if (res) {
              this.$message.success('操作成功！')
              this.visible = false
              this.$emit('onload')
            }
          })
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
