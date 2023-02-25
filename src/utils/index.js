/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    // new Date(time) time为-连接，在IE浏览器转换错误
    date = new Date(time.replace(/-/g, '/'))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @returns {string | null}
 */
export function getComporeTime(time) {
  let statrTime = ''
  if (time) {
    let nowDate = parseTime(new Date())
    let dt = nowDate.split(' ')
    let st = ''

    if (parseTime(time).split(' ')[0] == dt[0]) {
      // 是今天,选择 的时间开始为此刻的时分秒
      st = dt[1]
    } else {
      // 明天及以后从0时开始
      st = '00:00:00'
    }

    statrTime = st + ' - 23:59:59'
  }
  return statrTime
}
/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getFullYear() +
      '年' +
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function downloadFile(response) {
  if (!response) {
    return
  }

  const realFileName = decodeURI(
    response.headers['content-disposition'].split('"')[1]
  )
  const blob = new Blob([response.data], {
    type: 'text/plain;charset=utf-8'
  })

  if (window.navigator.msSaveOrOpenBlob) {
    // IE11
    window.navigator.msSaveOrOpenBlob(blob, realFileName)
  } else {
    // Google chome, Firefox, ....
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = [realFileName]
    document.getElementById('app').appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }
}

export function getDate(dateNow, intervalDays, bolPastTime) {
  let oneDayTime = 24 * 60 * 60 * 1000
  let list = []
  let lastDay

  if (bolPastTime == true) {
    lastDay = new Date(dateNow.getTime() - intervalDays * oneDayTime)
    list.push(formateDate(lastDay))
    list.push(formateDate(dateNow))
  } else {
    lastDay = new Date(dateNow.getTime() + intervalDays * oneDayTime)
    list.push(formateDate(dateNow))
    list.push(formateDate(lastDay))
  }
  return list
}

export function formateDate(time) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()

  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day + ''
}

export function getCurrentTimeString() {
  var today = new Date()
  var month = today.getMonth() + 1
  month = month < 10 ? '0' + month : month
  var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
  var hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours()
  var mins =
    today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
  var secs =
    today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds()
  return (
    today.getFullYear() +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hours +
    ':' +
    mins +
    ':' +
    secs
  )
}

export function deWeight(arr, key) {
  var obj = {},
    newArr = []

  newArr = arr.reduce(function (a, b) {
    obj[b[key]] ? '' : (obj[b[key]] = true && a.push(b))
    return a
  }, [])
  return newArr
}

export function timeStamp(time) {
  if (parseInt(time) > 60) {
    var second = parseInt(time) % 60
    var min = parseInt(time / 60)
    var timeStr = ''
    timeStr = min + '分' + second + '秒'
    if (min > 60) {
      min = parseInt(time / 60) % 60
      var hour = parseInt(parseInt(time / 60) / 60)
      timeStr = hour + '小时' + min + '分' + second + '秒'

      if (hour > 24) {
        hour = parseInt(parseInt(time / 60) / 60) % 24
        var day = parseInt(parseInt(parseInt(time / 60) / 60) / 24)
        timeStr = day + '天' + hour + '小时' + min + '分' + second + '秒'
      }
    }
  }
  if (time < 0) {
    timeStr = '0天00小时00分00秒'
  }
  return timeStr
}

export function defaultWeek(weekLength, columns, weekDayLength, weekData) {
  let lists = [
    {
      weekDay: 1,
      status: 'false'
    },
    {
      weekDay: 2,
      status: 'false'
    },
    {
      weekDay: 3,
      status: 'false'
    },
    {
      weekDay: 4,
      status: 'false'
    },
    {
      weekDay: 5,
      status: 'false'
    },
    {
      weekDay: 6,
      status: 'false'
    },
    {
      weekDay: 7,
      status: 'false'
    }
  ]
  if (weekLength > 1) {
    if (weekDayLength != 7) {
      let arr = lists.slice(0, 7 - weekDayLength)
      return (columns = arr.concat(weekData))
    } else {
      return (columns = weekData)
    }
  }
  if (weekLength === 1) {
    if (weekDayLength != 7) {
      if (
        weekData[0].weekDay != 1 &&
        weekData[weekDayLength - 1].weekDay != 7
      ) {
        let startIndex = weekData[0].weekDay,
          endIndex = weekData[weekDayLength - 1].weekDay
        let startData = lists.slice(0, startIndex - 1)
        let endData = lists.slice(endIndex, 7)
        return (columns = startData.concat(weekData).concat(endData))
      }
      if (weekData[0].weekDay != 1) {
        let arr = lists.slice(0, 7 - weekDayLength)
        return (columns = arr.concat(weekData))
      }
      if (weekData[weekDayLength - 1].weekDay != 7) {
        let arr = lists.slice(weekDayLength, 7)
        return (columns = weekData.concat(arr))
      }
    } else {
      return (columns = weekData)
    }
  }
}

export function changeWeek(weekLength, weekData, columns) {
  let lists = [
    {
      weekDay: 1,
      status: 'false'
    },
    {
      weekDay: 2,
      status: 'false'
    },
    {
      weekDay: 3,
      status: 'false'
    },
    {
      weekDay: 4,
      status: 'false'
    },
    {
      weekDay: 5,
      status: 'false'
    },
    {
      weekDay: 6,
      status: 'false'
    },
    {
      weekDay: 7,
      status: 'false'
    }
  ]
  if (weekLength != 7) {
    if (weekData[0].weekDay != 1) {
      let arr = lists.slice(0, 7 - weekLength)
      return (columns = arr.concat(weekData))
    } else {
      let arr = lists.slice(weekLength, 7)
      return (columns = weekData.concat(arr))
    }
  } else {
    return (columns = weekData)
  }
}
