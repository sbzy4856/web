<template>
  <div>
    <el-button>添加公告</el-button>
    <el-form ref="form" :model="formData" class="form">
      <el-input
      class="input"
        v-model="formData.title"
        placeholder="请输入公告标题"
        clearable
      ></el-input>
      <el-select
        v-model="formData.state"
        placeholder="请选择公告状态"
        clearable
      >
        <el-option
          v-for="item in state"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        ></el-option>
      </el-select>
    </el-form>
    <el-table></el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: [
        {
          key: 'published',
          value: '已发布'
        },
        {
          key: 'notPublished',
          value: '未发布'
        }
      ],
      formData: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.form{
  display: flex;
  .input{
    width: 10%;
  }
}
</style>