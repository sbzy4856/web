<template>
  <div class="main-page">
    <div class="left-side-nav">
      <el-menu
        text-color="#fff"
        background-color="#1D61AA"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        router
      >
        <el-menu-item
          index="notice"
          v-if="user.userType === '管理员'"
        >
          公告管理
        </el-menu-item>
        <el-menu-item
          index="userInfo-manage"
          v-if="user.userType === '管理员'"
        >
          用户信息管理
        </el-menu-item>
        <el-menu-item
          index="teacher-project"
          v-if="
            user.userType === '管理员' ||
            user.userType === '教师' ||
            user.userType === '助教'
          "
        >
          实验项目
        </el-menu-item>
        <el-menu-item
          index="course-manage"
          v-if="
            user.userType === '管理员' ||
            user.userType === '教师' ||
            user.userType === '助教'
          "
        >
          课程管理
        </el-menu-item>
        <el-menu-item
          index="login-log"
          v-if="
            user.userType === '管理员' ||
            user.userType === '教师' ||
            user.userType === '助教'
          "
        >
          学生考勤查看
        </el-menu-item>
        <el-menu-item
          index="student-course"
          v-if="user.userType === '管理员' || user.userType === '学生'"
        >
          课程信息
        </el-menu-item>
        <el-menu-item
          index="student-score"
          v-if="user.userType === '管理员' || user.userType === '学生'"
        >
          我参与的实验项目
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.el-menu-item {
  padding-left: 30px !important;
}
.el-submenu .el-menu-item {
  padding-left: 40px !important;
}
::v-deep .el-submenu__title i {
  color: #ffffff;
}
.is-active {
  color: #409eff !important;
  background: #174e88 !important;
}
.left-side-nav {
  background-image: url('../../assets/images/left-background.png');
  background-repeat: no-repeat;
  background-size: 184px 300px;
  background-attachment: fixed;
  background-position-y: bottom;
}
</style>

