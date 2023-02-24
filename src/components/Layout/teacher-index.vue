<template>
  <el-container>
    <el-header>
      <Header @changeSideRouter="changeSideRouter"></Header>
    </el-header>
    <el-container>
      <el-aside width="184px">
        <SideNav :sideNavRouter="sideNavRouter" />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from './header'
import SideNav from '@/components/Layout/side-nav'
import router from '@/router/admin'
export default {
  components: {
    Header,
    SideNav
  },
  data() {
    return {
      sideNavRouter: []
    }
  },
  mounted() {
    console.log(this.$route, 'route!')
    let headerMenu = router[0].children.filter((item) => {
      return JSON.parse(localStorage.getItem('userInfo')).permissions.includes(
        item.meta.code
      )
    })
    let childRouter = {}
    let firstSideRouter = []
    console.log(headerMenu, 'headerMenu')
    if (headerMenu && headerMenu.length > 0) {
      headerMenu[0].children.forEach((item) => {
        if (item.children && item.children.length > 0) {
          item.children.forEach((k) => {
            if (
              k.meta.noCache === true &&
              JSON.parse(localStorage.getItem('userInfo')).permissions.includes(
                k.meta.code
              )
            ) {
              childRouter = k
            }
          })
        }
      })
      console.log(childRouter, 'childRouter')
      if (JSON.stringify(childRouter) != '{}') {
        firstSideRouter.push(childRouter)
      }
      headerMenu[0].children.forEach((item) => {
        if (
          item.meta.noCache === true &&
          JSON.parse(localStorage.getItem('userInfo')).permissions.includes(
            item.meta.code
          )
        ) {
          firstSideRouter.push(item)
          console.log('父级的')
        }
      })
    }

    // let firstSideRouter = headerMenu[0].children.filter((item) => {
    //   return (
    //     item.meta.noCache === true &&
    //     JSON.parse(localStorage.getItem("userInfo")).permissions.includes(item.meta.code)
    //   );
    // });
    console.log(
      localStorage.getItem('sideNavRouter'),
      localStorage.getItem('sideNavRouter')
    )
    this.sideNavRouter = localStorage.getItem('sideNavRouter')
      ? JSON.parse(localStorage.getItem('sideNavRouter'))
      : firstSideRouter
    console.log(this.sideNavRouter, 'this.sideNavRouter')

    console.log(this.sideNavRouter, 'sideNavRouter!')
  },
  methods: {
    changeSideRouter(data) {
      let sideroute = JSON.parse(data)
      if (sideroute.length > 0 && sideroute[0].children) {
        this.$router.push({
          name: sideroute[0].children[0].name
        })
      } else {
        this.$router.push({
          name: JSON.parse(data)[0].name
        })
      }
      this.sideNavRouter = JSON.parse(data)
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>

