import { pget, mark } from "utils/request"
import * as _ from "lodash";

interface ConfigParamProps {
  appId: string,
  timestamp: string,
  nonceStr: string,
  signature: string
}

class ConfigBean {
  url: string;
  configParam: ConfigParamProps;
  configTimes: number;
  error:boolean;
  constructor(){
    this.error = false;
    this.configTimes = 0;
  }
}

class JsConfigService {
  private configList: [ConfigBean];
  static MAX_CONFIG_SIZE = 10;

  constructor() {
    this.configList = new Array<ConfigBean>();
    window.configList = this.configList;
    console.log('config',this.configList);
    this.configTimes = 0;
  }

  public getConfigBean(url) {
    return _.get(_.filter(this.configList, { url: url }), '[0]', null);
  }

  public setConfigBean(url, param) {
    let configBean = this.getConfigBean(url);
    if(_.isNull(configBean)) {
      configBean = new ConfigBean();
      configBean.url = url;
      configBean.configParam = param;
      configBean.error = false;
      // 最多存储10个
      if(this.configList.length > JsConfigService.MAX_CONFIG_SIZE){
        this.configList.shift();
      }
      // alert('config 1:'+url+":"+JSON.stringify(configBean));
      this.configList.push(configBean);
    } else {
      configBean.configParam = param;
      configBean.error = false;
      configBean.configTimes = 0;
      // alert('config 2:'+url+":"+JSON.stringify(configBean));
    }
  }

  public setConfigParamError(url,e,apiList,callback) {
    let configBean = this.getConfigBean(url);
    if(!_.isNull(configBean)) {
      configBean.configTimes += 1;
      console.log('configTimes',configBean.configTimes);
      if(configBean.configTimes >= 3){
        // 错误次数大于3则打日志
        configBean.error = true;
        let memo = "url:" + window.location.href + ",configUrl:" + window.ENV.configUrl
          + ",os:" + window.ENV.systemInfo + ",signature:" + JSON.stringify(configBean);
        if(e) {
          memo = 'error:' + JSON.stringify(e) + ',' + memo;
        }
        mark({
          module: "JSSDK",
          function: window.ENV.systemInfo,
          action: "签名失败",
          memo: memo
        });
      } else {
        this.config(apiList,callback);
      }
    }
  }

  public jsConfig(apiList = [],callback){
    let url = this.getUrl();
    let configBean = this.getConfigBean(url);
    if(!_.isNull(configBean)){
      wx.config(_.merge({
        debug: false,
        jsApiList: [ 'hideOptionMenu', 'showOptionMenu', 'onMenuShareAppMessage', 'onMenuShareTimeline' ].concat(apiList),
      }, configBean.configParam));
      wx.error((e) => {
        let url = this.getUrl();
        alert("error："+JSON.stringify(e)+';'+url);
        this.setConfigParamError(url,e,apiList,callback);
      })
      wx.ready(() => {
        // alert("ok"+JSON.stringify(e));
        wx.hideOptionMenu({
          fail:(e)=>{
            alert("hide error："+JSON.stringify(e))
          }
        });
      })
    } else {
      alert("final url"+url);
    }
  }

  public getUrl(){
    if(window.ENV.osName === 'ios') {
      return window.ENV.configUrl ? window.ENV.configUrl.split('#')[0] : window.location.href.split('#')[0];
    } else {
      return window.location.href.split('#')[0];
    }
  }

  public config(apiList = [],callback) {
    let url = this.getUrl();
    let configBean = this.getConfigBean(url);
    if(!_.isNull(configBean) && !configBean.error) {
      console.log('已经有了config', configBean);
      setTimeout(()=>{
        this.jsConfig(apiList,callback);
      },1);
    } else {
      console.log("没有config");
      pget(`/wx/js/signature?url=${encodeURIComponent(url)}`).then(res => {
        // 获取成功
        this.setConfigBean(url,res.msg);
        setTimeout(()=>{
          this.jsConfig(apiList,callback);
        },1);
      }).catch(e => {
        console.log(e);
      });
    }
  }
}


export default new JsConfigService();
