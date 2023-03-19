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
        label="公告标题："
        prop="noticeTitle"
      >
        <el-input
          v-model="formData.noticeTitle"
          :disabled="type === 'detail'"
          placeholder="请输入公告标题"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="公告内容："
        prop="noticeContent"
      >
        <el-input
          v-model="formData.noticeContent"
          :disabled="type === 'detail'"
          type="textarea"
          rows="5"
          placeholder="请输入公告内容"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="公告状态："
        prop="noticeState"
      >
        <el-select
          v-model="formData.noticeState"
          clearable
          :disabled="type === 'detail'"
          placeholder="请选择公告状态"
        >
          <el-option
            key="未发布"
            label="不发布"
            value="未发布"
          ></el-option>
          <el-option
            key="已发布"
            label="发布"
            value="已发布"
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
import { addNotice, modifyNotice } from '@/api/notice/notice'

export default {
  data() {
    return {
      title: '',
      visible: false,
      type: null,
      formData: {},
      rules: {
        noticeTitle: [
          { required: true, message: '请输入公告标题', trigger: 'change' }
        ],
        noticeContent: [
          { required: true, message: '请输入公告内容', trigger: 'change' }
        ],
        noticeState: [
          { required: true, message: '请选择公告状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    show(option) {
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
      if (this.type === 'add') {
        addNotice({ data: { ...this.formData } }).then((res) => {
          if (res) {
            this.$message.success('添加成功！')
            this.visible = false
            this.$emit('onload')
          }
        })
      } else if (this.type === 'modify') {
        modifyNotice(this.formData.noticeId, {
          data: { ...this.formData }
        }).then((res) => {
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
