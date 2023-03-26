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
        label="课程名称："
        prop="courseName"
      >
        <el-input
          v-model="formData.courseName"
          :disabled="type === 'detail'"
          placeholder="请输入课程名称"
        ></el-input>
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
import { addCourse, updateCourse } from '@/api/course/course'

export default {
  data() {
    return {
      title: '',
      visible: false,
      type: null,
      formData: {},
      rules: {},
      user: null
    }
  },
  methods: {
    show(option) {
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
      this.visible = true
      this.type = option.type
      if (option.type === 'add') {
        this.title = '添加课程'
      } else if (option.type === 'detail') {
        this.title = '查看课程'
        this.formData = option.data
      } else {
        this.title = '修改课程'
        this.formData = option.data
      }
    },
    handleClose() {
      this.visible = false
      this.formData = {}
    },
    save() {
      console.log(this.formData)
      if (this.type === 'add') {
        addCourse(
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
        updateCourse({ data: { ...this.formData } }).then((res) => {
          this.$message.success('修改成功！')
          this.visible = false
          this.$emit('onload')
        })
      }
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
