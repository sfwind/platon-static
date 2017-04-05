import qs from "qs";
import { merge,isUndefined,isNull,values } from "lodash";
import { get, post } from "axios";

const debug = getQueryString('debug')

const config = {
  timeout: 10000,
}

export function appendQs(query:Object):string {
  let queryCount = values(query).filter(item=> !isNull(item) && !(isUndefined(item))).length;
  return queryCount === 0 ? "" : `?${qs.stringify(merge(query, { debug: debug }))}`
}

export function pget(url:string, query?:Object) {
  return get(`${url}${appendQs(merge(query, { debug: debug }))}`).then((res) => {
      return res.data
    }
  ).catch(error => {
    if (error.response) {
      log(url, JSON.stringify(error.response))
    } else {
      log(url, error.message)
    }
    throw "网络不给力";
  })
}

export function ppost(url:string, body:Object) {
  return post(url, body).then((res) => res.data).catch(error => {
    if (error.response) {
      log(url, JSON.stringify(error.response))
    } else {
      log(url, error.message)
    }
    throw "网络不给力";
  })
}

function log(url, msg) {
  ppost('/rise/b/log', { url: url, result: msg, cookie: document.cookie })
}

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return undefined;
}
