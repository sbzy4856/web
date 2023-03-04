<template>
  <div>
    <el-button
      type="primary"
      @click="handleAdd('add', {})"
    >
      添加公告
    </el-button>
    <el-form
      ref="form"
      :model="formData"
      class="form"
    >
      <el-input
        class="input"
        v-model="formData.title"
        placeholder="请输入公告标题"
        clearable
        @clear="initData"
      ></el-input>
      <el-select
        class="select"
        v-model="formData.state"
        placeholder="请选择公告状态"
        clearable
        @clear="initData"
      >
        <el-option
          v-for="item in state"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        class="search"
        @click="search"
      >
        查询
      </el-button>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="noticeTitle"
        label="标题"
      ></el-table-column>
      <el-table-column
        prop="noticeContent"
        label="内容"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="noticeState"
        label="状态"
      ></el-table-column>
      <el-table-column
        prop="handler"
        label="操作人"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="操作时间"
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
            @click="handleDelete(scope.row.noticeId)"
          >
            删除
          </el-button>
          <el-button
            v-if="scope.row.noticeState === '未发布'"
            type="text"
            size="small"
            @click="handlePublish(scope.row.noticeId)"
          >
            发布
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
  </div>
</template>

<script>
import {
  getAllNotices,
  modifyNoticeState,
  deleteNotice
} from '@/api/notice/notice'

export default {
  data() {
    return {
      state: [
        {
          key: '已发布',
          value: '已发布'
        },
        {
          key: '未发布',
          value: '未发布'
        }
      ],
      formData: {
        title: '',
        state: ''
      },
      paginationData: {},
      tableData: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    getAllNotices(resetCurrent = false) {
      getAllNotices({
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
      this.getAllNotices()
    },
    handleAdd(type, data) {
      console.log(type, data)
    },
    handlePublish(id) {
      // console.log(id)
      this.$confirm('确认发布此公告吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          modifyNoticeState(id).then((res) => {
            // console.log(res)
            this.$message.success('发布成功！')
            this.initData()
          })
        })
        .catch(() => {
          // this.$message('已取消删除')
        })
    },
    handleDelete(id) {
      // console.log(id)
      this.$confirm('确认删除此公告吗？此操作不可逆。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          deleteNotice(id).then((res) => {
            // console.log(res)
            this.$message.success('删除成功')
            this.initData()
          })
        })
        .catch(() => {
          // this.$message('已取消删除')
        })
    },
    search() {
      // console.log(this.formData)
      this.initData()
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
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
