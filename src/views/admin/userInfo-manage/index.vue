<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      class="form"
    >
      <el-input
        class="input"
        v-model="formData.account"
        placeholder="请输入用户账号"
        clearable
        @clear="initData"
      ></el-input>
      <el-select
        class="select"
        v-model="formData.type"
        placeholder="请选择用户类型"
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
        prop="userAccount"
        label="账号"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
      ></el-table-column>
      <el-table-column
        prop="userType"
        label="用户类型"
      ></el-table-column>
      <el-table-column
        prop="userState"
        label="用户状态"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleAdd('modify', scope.row)"
            v-if="scope.row.userAccount !== 'admin'"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="resetPassword(scope.row)"
            v-if="scope.row.userAccount !== 'admin'"
          >
            重置密码
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
  </div>
</template>

<script>
import { getAllUsers, modifyUser } from '@/api/user/login'
import addDialog from './components/addDialog.vue'

export default {
  components: { addDialog },
  data() {
    return {
      state: [
        {
          key: '管理员',
          value: '管理员'
        },
        {
          key: '教师',
          value: '教师'
        },
        {
          key: '助教',
          value: '助教'
        },
        {
          key: '学生',
          value: '学生'
        }
      ],
      formData: {
        account: '',
        type: ''
      },
      paginationData: {},
      tableData: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    getAllUsers(resetCurrent = false) {
      getAllUsers({
        params: {
          ...this.formData,
          page: resetCurrent ? 1 : this.paginationData.current || 1,
          size: this.paginationData.size || 10
        }
      }).then((res) => {
        // console.log(res)
        let { records = [], ...other } = res
        this.tableData = records
        this.paginationData = { ...other }
      })
    },
    initData() {
      this.getAllUsers()
    },
    handleAdd(type, data) {
      let option = {
        type: type,
        data: { ...data }
      }
      this.$refs.addDialog.show(option)
    },
    resetPassword(data) {
      // console.log(data)
      this.$confirm('确定要将该用户的密码重置吗？重置后密码为123。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          let sendData = {
            ...data
          }
          sendData.password = '123'
          modifyUser({ data: { ...sendData } }).then((res) => {
            console.log(res)
            this.$message.success('重置成功！')
          })
        })
        .catch(() => {})
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
::v-deep.el-table .cell {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
