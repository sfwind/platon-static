import qs from 'qs'
import { merge, isUndefined, isNull, values } from 'lodash'
import { get, post } from 'axios'
import * as axios from 'axios'

axios.defaults.headers.platform = 'we_mobile'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 对于 700 返回，默认跳转登录页
axios.interceptors.response.use(function (response) {
  if (response.status === 700) {
    window.location.href = decodeURI(
      `${window.location.protocol}//${window.location.host}/wx/oauth/auth?callbackUrl=${window.location.href}`)
  } else {
    return response
  }
}, function (error) {
})

const debug = _getQueryString('debug')

function pget (url: string, query?: Object) {
  return get(`${url}${_appendQs(merge(query, { debug: debug }))}`, {
    validateStatus: function (status) {
      return status >= 200 && status < 300 || status == 700
    },
  }).then((res) => res.data).catch(error => {
    if (error.response) {
      log(url, JSON.stringify(error.response))
    } else {
      log(url, error.message)
    }
  })
}

function ppost (url: string, body: Object) {
  return post(url, body).then(res => res.data).catch(error => {
    if (error.response) {
      log(url, JSON.stringify(error.response))
    } else {
      log(url, error.message)
    }
  })
}

function mark (param) {
  return ppost('/rise/b/mark', param)
}

function log (url, msg) {
  return post('/b/log',
    JSON.stringify({ result: msg, cookie: document.cookie, url: url }))
}

function _appendQs (query: Object): string {
  let queryCount = values(query).
    filter(item => !isNull(item) && !(isUndefined(item))).length
  return queryCount === 0 ? '' : `?${qs.stringify(merge(query, { debug: debug }))}`
}

function _getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return undefined
}

export { pget, ppost, mark }
