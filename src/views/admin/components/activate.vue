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
        label="邮箱："
        prop="email"
      >
        <el-input
          v-model="formData.email"
          placeholder="请输入邮箱"
        ></el-input>
        <el-button
          type="text"
          @click="sendCode"
        >
          发送验证码
        </el-button>
      </el-form-item>
      <el-form-item
        label="邮箱："
        prop="email"
      >
        <el-input
          v-model="formData.email"
          placeholder="请输入邮箱"
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
import { activated } from '@/api/user/login'

export default {
  data() {
    return {
      title: '',
      visible: false,
      type: null,
      formData: {},
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: '邮箱格式不对',
            trigger: 'blur'
          }
        ]
      },
      user: null
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    handleClose() {
      this.visible = false
      this.formData = {}
    },
    save() {
      console.log(this.formData)
      this.$refs.form.validate((valid) => {
        if (valid) {
          activated(
            { params: { ...this.formData } },
            this.user.userId,
            this.user.userName
          ).then((res) => {
            if (res) {
              this.$message.success('激活成功！')
              this.visible = false
              this.$emit('onload')
            }
          })
        }
      })
    },
    sendCode() {
      if (this.formData.email) {
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
