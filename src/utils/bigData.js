/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件名称：src-> utils -> bigData.js(大数据埋点函数)
 3. 作者： liyang@iquanwai.com
 4. 说明：{
       module："模块"  ,   // 模块
       func:"功能",        // 功能
       platForm: "we_mobile" //代表来自移动端
       action:"",         //具体事件名
       memo:"",         // 额外说明
     }
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import ApiDataFilter from './apiDataFilter';
import sa from 'sa-sdk-javascript'

class bigData {
  constructor() {

  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    发送埋点函数
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  sendBigData({module = "打点", func, action, memo}) {
    let param = {
      module: module,
      function: func,
      action: action,
      memo: memo
    };
    ApiDataFilter.request({
      apiPath: "common.bigData",
      method: "post",
      data: param,
      contentType: "application/json",
      successCallback(data) {
        console.log("埋点成功")
      },
      errorCallback() {

      }
    });
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    神策埋点
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    sa.track("frontMark", param);
  }
}

const BigData = new bigData();  // new一个实例

export default BigData
