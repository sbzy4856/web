<template>
  <div class="main-page">
    <div class="left-side-nav">
      <el-menu
        :default-active="activerouter"
        text-color="#fff"
        background-color="#1D61AA"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        router
      >
        <template v-for="(menu, index) in sideNavRouter">
          <el-menu-item
            v-if="!menu.children"
            :index="menu.name"
            :class="$route.name === menu.name ? 'is-active' : ''"
            :key="index"
          >
            <span
              :class="menu.meta.icon ? menu.meta.icon : ''"
              slot="title"
            >
              {{ menu.meta.title }}
            </span>
          </el-menu-item>
          <el-submenu
            :index="menu.name"
            v-if="menu.children"
            :key="index"
          >
            <template slot="title">
              <span :class="menu.meta.icon ? menu.meta.icon : ''">
                {{ menu.meta.title }}
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(value, index) in menu.children"
                :key="index"
                :index="value.name"
                :class="$route.name === value.name ? 'is-active' : ''"
              >
                {{ value.meta.title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
import router from '@/router/admin'
import store from '@/store'
import { mapGetters } from 'vuex'
import systemManage from '@/router/system-manage'
export default {
  props: {
    sideNavRouter: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    activerouter: function () {
      let _this = this
      let acve = ''
      acve = _this.$route.name
      console.log(_this.$route.name, '_this.$route.name')
      return acve
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
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

