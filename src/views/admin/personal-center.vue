<template>
  <el-container>
    <el-header>
      <Header :user="user"></Header>
    </el-header>
    <el-container>
      <el-aside width="184px">
        <SideNav
          :sideNavRouter="sideNavRouter"
          :user="user"
        />
      </el-aside>
      <el-main>
        <div class="formContent">
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
              label="密码："
              prop="password"
            >
              <el-input
                v-model="formData.password"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item
              label="手机号："
              prop="mobile"
            >
              <el-input
                v-model="formData.mobile"
                placeholder="请输入手机号"
              ></el-input>
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
            <el-form-item
              label="生日："
              prop="birthday"
            >
              <el-input
                v-model="formData.birthday"
                placeholder="请输入生日"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户类型："
              prop="userType"
            >
              <el-input
                v-model="formData.userType"
                placeholder="请输入用户类型"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户状态："
              prop="userState"
            >
              <span v-if="formData.userState === '已激活'">
                {{ formData.userState }}
              </span>
              <div v-else>
                <span style="margin-right: 20px">{{ formData.userState }}</span>
                <el-button
                  type="text"
                  @click="activate"
                >
                  去激活
                </el-button>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button
              type="primary"
              style="margin-top: 20px"
              @click="save"
            >
              确认修改
            </el-button>
          </div>
        </div>
      </el-main>
    </el-container>
    <activate ref="activate"></activate>
  </el-container>
</template>

<script>
import Header from '@/components/Layout/header'
import SideNav from '@/components/Layout/side-nav'
import activate from './components/activate'
import { modifyUser } from '@/api/user/login'

export default {
  components: {
    Header,
    SideNav,
    activate
  },
  data() {
    return {
      sideNavRouter: [],
      user: null,
      formData: {},
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        userAccount: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
      this.formData = this.user
      console.log(this.user)
    },
    onSubmit() {
      console.log('submit!')
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
    },
    activate() {
      this.$refs.activate.show()
    }
  }
}
</script>
<style lang="scss" scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif, MicrosoftYaHei-Bold,
    MicrosoftYaHei;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.el-header {
  // background: #4c8af2;
  background: #024996;
  padding: 0;
}
.el-container {
  background: #f4f5f7;
  height: 100%;
}
.el-aside {
  background: #1d61aa;
}
.el-main {
  overflow: auto;
  padding: 0 !important;
  margin: 10px 20px 0 10px;
  height: calc(100vh - 70px);
  background: #f2f3f4;
}
.formContent {
  background: white;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .el-form {
    width: 30%;
    .el-form-item {
      margin-top: 20px;
    }
  }
}
</style>
