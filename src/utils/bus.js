var bus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return bus
    }
  }
})
