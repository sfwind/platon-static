import * as _ from "lodash"
// import UA from "ua-device"

export function ron(flag, render, normal) {
  if(flag) {
    if(_.isFunction(render)) {
      return render();
    } else {
      return render;
    }
  } else {
    if(_.isFunction(normal)) {
      return normal();
    } else if(_.isUndefined(normal)) {
      return null;
    } else {
      return normal;
    }
  }
}

export function isPending(state, key): boolean {
  return _.get(state, '$view.$pending') ? _.get(state, '$view.$pending')[key] : false
}

// export function isIOS() {
// 	return _.get(new UA(navigator.userAgent), 'os.name') === 'iOS'
// }

export function changeTitle(title) {
  document.title = title;
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'display: none; width: 0; height: 0;';
  iframe.src = 'https://static.iqycamp.com/images/logo.png';
  //iframe.src = require('./img/text_delete.png');
  const listener = () => {
    setTimeout(() => {
      iframe.removeEventListener('load', listener);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 0);
    }, 0);
  };
  iframe.addEventListener('load', listener);
  document.body.appendChild(iframe);
}

var chnUnitChar = ["", "十", "百", "千"];
var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

function SectionToChinese(section) {
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
  while(section > 0) {
    var v = section % 10;
    if(v === 0) {
      if(!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}

export function scroll(target, container) {
  if(document.querySelector(target)){
    let y = document.querySelector(target).offsetTop
    if(document.querySelector(container)){
      document.querySelector(container).scrollTop = y
    }
  }
}
// 数字转汉字
export function NumberToChinese(num) {
  var unitPos = 0;
  var strIns = '', chnStr = '';
  var needZero = false;

  if(num === 0) {
    return chnNumChar[0];
  }

  while(num > 0) {
    var section = num % 10000;
    if(needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
}

// 字符串截取方法
export function splitText(text: string, length: number) {
  if(text) {
    let cleanText = removeHtmlTags(text);
    return cleanText.length <= length ? text : cleanText.slice(0, length) + '...'
  }
}

export function removeHtmlTags(str) {
  str = str.replace(/<[^>]+>/g, "");
  return str
}

export function filterHtmlTag(content) {
  return _.isString(content) ? content.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "") : "";
}

/**
 * 描述：ios系统，1.点击石墨外链，进入石墨,2.点击系统返回按钮,3.此时签名会失败，支付会报url（石墨的）未注册
 * 解决方案：如果监听到ios的后退操作，并且configUrl已经是石墨的url了（下面的方法update的configUrl)
 * 就刷新页面
 */
export function fixIosShimoBug(){
  if(window.ENV.osName === 'ios') {
    window.addEventListener("popstate", function(e) {
      if(window.ENV.configUrl.indexOf("shimo.im") != -1) {
        // alert("刷新:" + window.location.href + "," + document.referrer + ":" + document.title);
        window.location.href = window.location.href;
      }
    });
  }
}

/**
 * 跳转到其他外链地址
 * @param url 检查一下这个外链是不是shimo，如果是石墨，并且是ios系统，就修改configUrl
 */
export function goOtherWeb(url){
  if(window.ENV.osName === 'ios' && url.indexOf('shimo.im') != -1) {
    window.ENV.configUrl = url;
  }
  window.location.href = url;
}
