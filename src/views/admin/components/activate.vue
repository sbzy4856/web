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
        label="验证码："
        prop="code"
      >
        <el-input
          v-model="formData.code"
          placeholder="请输入验证码"
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
import { sendEmail, active } from '@/api/user/login'

export default {
  data() {
    return {
      title: '',
      visible: false,
      type: null,
      formData: {},
      user: null,
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: '邮箱格式不对',
            trigger: 'blur'
          }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
      },
      user: null
    }
  },
  methods: {
    show(data) {
      this.user = data
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
          active(this.formData.code, this.user).then((res) => {
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
      if (this.formData.hasOwnProperty('email')) {
        sendEmail({ params: { ...this.formData } }).then((res) => {
          if (res) {
            this.$message.success('发送成功！')
            console.log(res)
          }
        })
      } else {
        this.$message.warning('请输入邮箱！')
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
