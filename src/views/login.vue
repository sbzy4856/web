<template>
  <div class="box">
    <div class="shell">
      <div
        class="container b-container"
        id="b-container"
      >
        <el
          action=""
          method=""
          class="form"
          id="b-form"
        >
          <h2 class="form_title title">登入账号</h2>
          <div class="form_icons">
            <el-image
              class="iconfont"
              :src="qq"
            ></el-image>
            <el-image
              class="iconfont"
              :src="weixin"
            ></el-image>
            <el-image
              class="iconfont"
              :src="bilibili"
            ></el-image>
          </div>
          <span class="form_span">选择登录方式或账号密码登录</span>
          <input
            type="text"
            class="form_input"
            placeholder="账号"
            v-model="formData.userAccount"
          />
          <input
            type="text"
            class="form_input"
            placeholder="密码"
            v-model="formData.password"
          />
          <a class="form_link">忘记密码？</a>
          <button class="form_button button submit">登录</button>
        </el>
      </div>
    </div>
  </div>
</template>

<script>
import qq from '@/assets/images/QQ.png'
import weixin from '@/assets/images/weixin.png'
import bilibili from '@/assets/images/icon_bilibili-square.png'

export default {
  data() {
    return {
      qq: qq,
      weixin: weixin,
      bilibili: bilibili,
      formData: []
    }
  },
  created() {
    let switchCtn = document.querySelector('#switch-cnt')
    let switchC1 = document.querySelector('#switch-c1')
    let switchC2 = document.querySelector('#switch-c2')
    let switchCircle = document.querySelectorAll('.switch_circle')
    let switchBtn = document.querySelectorAll('.switch-btn')
    let aContainer = document.querySelector('#a-container')
    let bContainer = document.querySelector('#b-container')
    let allButtons = document.querySelectorAll('.submit')
    let getButtons = (e) => e.preventDefault()
    let changeForm = (e) => {
      // 修改类名
      switchCtn.classList.add('is-gx')
      setTimeout(function () {
        switchCtn.classList.remove('is-gx')
      }, 1500)
      switchCtn.classList.toggle('is-txr')
      switchCircle[0].classList.toggle('is-txr')
      switchCircle[1].classList.toggle('is-txr')

      switchC1.classList.toggle('is-hidden')
      switchC2.classList.toggle('is-hidden')
      aContainer.classList.toggle('is-txl')
      bContainer.classList.toggle('is-txl')
      bContainer.classList.toggle('is-z')
    }
    // 点击切换
    let shell = (e) => {
      for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener('click', getButtons)
      for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener('click', changeForm)
    }
    window.addEventListener('load', shell)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
}
.shell {
  position: relative;
  width: 600px;
  height: 600px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
}
/* 设置响应式 */
@media (max-width: 1200px) {
  .shell {
    transform: scale(0.7);
  }
}
@media (max-width: 1000px) {
  .shell {
    transform: scale(0.6);
  }
}
@media (max-width: 800px) {
  .shell {
    transform: scale(0.5);
  }
}
@media (max-width: 600px) {
  .shell {
    transform: scale(0.4);
  }
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.iconfont {
  width: 40px;
  height: 40px;
  margin: 0 5px;
  border: rgba(0, 0, 0, 0.5) 2px solid;
  border-radius: 50%;
  font-size: 25px;
  padding: 3px;
  opacity: 0.5;
  transition: 0.1s;
}
.iconfont:hover {
  opacity: 1;
  transition: 0.15s;
  cursor: pointer;
}
.form_input {
  width: 350px;
  height: 40px;
  margin: 4px 0;
  padding-left: 25px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}
.form_input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}
.form_span {
  margin-top: 30px;
  margin-bottom: 12px;
}
.form_link {
  color: #181818;
  font-size: 15px;
  margin-top: 25px;
  border-bottom: 1px solid #a0a5a8;
  line-height: 2;
  cursor: pointer;
}
.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
  letter-spacing: 10px;
}
.description {
  font-size: 14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}
.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4b70e2;
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
}
.b-container {
  z-index: 0;
}
</style>
