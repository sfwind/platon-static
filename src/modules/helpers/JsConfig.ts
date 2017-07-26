import { pget,mark } from "utils/request"
import * as _ from "lodash"

export function config(apiList,callback) {
  if(window.ENV.osName === 'ios'){
    pget(`/wx/js/signature?url=${encodeURIComponent(window.ENV.configUrl)}`).then(res => {
      if (res.code === 200) {
        wx.config(_.merge({
          debug: false,
          jsApiList: ['hideOptionMenu', 'showOptionMenu', 'onMenuShareAppMessage', 'onMenuShareTimeline'].concat(apiList),
        }, res.msg))
        wx.ready((res) => {
          hideOptionMenu();
          if (callback && _.isFunction(callback)) {
            callback();
          }
        })
        wx.error((e)=>{
          // TODO 上线前删掉
          // 支付页面报错\
          let memo = "url:" + window.location.href +",configUrl:"+ window.ENV.configUrl
            + ",os:" + window.ENV.systemInfo +",signature:" + (res?(_.isObjectLike(res.msg)?JSON.stringify(res.msg):res.msg):'空');
          if(e){
            memo = 'error:'+JSON.stringify(e) + ','+memo;
          }
          mark({
            module: "JSSDK",
            function: "ios",
            action: "签名失败",
            memo: memo
          });
          // TODO 上线前删掉
          // alert("还是注册错了:"+e.errMsg);
        })
      } else {
      }
    }).catch((err) => {
    })
  } else {
    pget(`/wx/js/signature?url=${encodeURIComponent(window.location.href)}`).then(res => {
      if (res.code === 200) {
        wx.config(_.merge({
          debug: false,
          jsApiList: ['hideOptionMenu', 'showOptionMenu', 'onMenuShareAppMessage'].concat(apiList),
        }, res.msg))
        wx.ready(() => {
          hideOptionMenu();
          if(callback && _.isFunction(callback)){
            callback();
          }
        })
        wx.error((e) => {
          // TODO 上线前删掉
          // 支付页面报错\
          let memo = "url:" + window.location.href +",configUrl:"+ window.ENV.configUrl
            + ",os:" + window.ENV.systemInfo +",signature:" + (res?(_.isObjectLike(res.msg)?JSON.stringify(res.msg):res.msg):'空');
          if(e){
            memo = 'error:'+JSON.stringify(e) + ','+memo;
          }
          mark({
            module: "JSSDK",
            function: "notios",
            action: "签名失败",
            memo: memo
          });
          // TODO 上线前删掉
          // alert("还是注册错了:" + e.errMsg);
        })
      } else {
      }
    }).catch((err) => {
    })
  }

}


export function preview(current, picList) {
	wx.previewImage({
		current: current, // 当前显示图片的http链接
		urls: picList // 需要预览的图片http链接列表
	});
}

export function closeWindow(current, picList) {
	wx.closeWindow();
}

export function hideOptionMenu(current, picList) {
	wx.hideOptionMenu();
}

export function pay(config, success, cancel, error) {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', config,
    (res) => {
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        if (success && _.isFunction(success)) {
          success();
        }
      }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      else if (res.err_msg == "get_brand_wcpay_request:cancel") {
        if (cancel && _.isFunction(cancel)) {
          cancel(res);
        }
      } else {
        if (_.isFunction(error)) {
          error(res);
        }
      }
    }
  );
}




export function configTest(apiList,callback,configUrl) {
  if(configUrl){
    pget(`/wx/js/signature?url=${encodeURIComponent(window.ENV.configUrl)}`).then(res => {
      if (res.code === 200) {
        wx.config(_.merge({
          debug: false,
          jsApiList: ['hideOptionMenu', 'showOptionMenu', 'onMenuShareAppMessage', 'onMenuShareTimeline'].concat(apiList),
        }, res.msg))
        wx.ready((res) => {
          hideOptionMenu();
          if (callback && _.isFunction(callback)) {
            callback();
          }
        })
        wx.error((e)=>{
          // TODO 上线前删掉
          // 支付页面报错\
          alert(JSON.stringify(e));
          let memo = "url:" + window.location.href +",configUrl:"+ window.ENV.configUrl
            + ",os:" + window.ENV.systemInfo +",signature:" + (res?(_.isObjectLike(res.msg)?JSON.stringify(res.msg):res.msg):'空');
          if(e){
            memo = 'error:'+JSON.stringify(e) + ','+memo;
          }
          mark({
            module: "JSSDK",
            function: "ios",
            action: "签名失败",
            memo: memo
          });
          // TODO 上线前删掉
          // alert("还是注册错了:"+e.errMsg);
        })
      } else {
      }
    }).catch((err) => {
    })
  } else {
    pget(`/wx/js/signature?url=${encodeURIComponent(window.location.href)}`).then(res => {
      if (res.code === 200) {
        wx.config(_.merge({
          debug: false,
          jsApiList: ['hideOptionMenu', 'showOptionMenu', 'onMenuShareAppMessage'].concat(apiList),
        }, res.msg))
        wx.ready(() => {
          hideOptionMenu();
          if(callback && _.isFunction(callback)){
            callback();
          }
        })
        wx.error((e) => {
          // TODO 上线前删掉
          // 支付页面报错\
          alert(JSON.stringify(e));
          let memo = "url:" + window.location.href +",configUrl:"+ window.ENV.configUrl
            + ",os:" + window.ENV.systemInfo +",signature:" + (res?(_.isObjectLike(res.msg)?JSON.stringify(res.msg):res.msg):'空');
          if(e){
            memo = 'error:'+JSON.stringify(e) + ','+memo;
          }
          mark({
            module: "JSSDK",
            function: "notios",
            action: "签名失败",
            memo: memo
          });
          // TODO 上线前删掉
          // alert("还是注册错了:" + e.errMsg);
        })
      } else {
      }
    }).catch((err) => {
    })
  }

}
