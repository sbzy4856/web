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
        label="用户名："
        prop="userName"
      >
        <el-input
          v-model="formData.userName"
          :disabled="type === 'detail'"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="账号："
        prop="userAccount"
      >
        <el-input
          v-model="formData.userAccount"
          placeholder="请输入账号"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号："
        prop="mobile"
      >
        <el-input
          v-model="formData.mobile"
          :disabled="type === 'detail'"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱："
        prop="email"
      >
        <el-input
          v-model="formData.email"
          :disabled="type === 'detail'"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="生日："
        prop="birthday"
      >
        <el-input
          v-model="formData.birthday"
          :disabled="type === 'detail'"
          placeholder="请输入生日"
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
import { modifyUser } from '@/api/user/login'

export default {
  data() {
    return {
      title: '',
      visible: false,
      type: null,
      formData: {},
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        userAccount: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    show(option) {
      console.log(option)
      this.visible = true
      this.type = option.type
      if (option.type === 'add') {
        this.title = '添加公告'
      } else if (option.type === 'detail') {
        this.title = '查看公告'
        this.formData = option.data
      } else {
        this.title = '修改公告'
        this.formData = option.data
      }
    },
    handleClose() {
      this.visible = false
      this.formData = {}
    },
    save() {
      console.log(this.formData)
      modifyUser({
        data: { ...this.formData }
      }).then((res) => {
        this.$message.success('修改成功！')
        this.visible = false
        this.$emit('onload')
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
