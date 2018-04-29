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
 class CommonFun{
  constructor(){

  }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
      发送埋点函数
      -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   sendBigData({ view = false , module="打点", func, action, memo}){
     let param = {
       module: module,
       function: func,
       action: action,
       memo: memo,
       view: view
     };
     ApiDataFilter.request({
       apiPath:"common.bigData",
       method:"post",
       data: param,
       contentType:"application/json",
       successCallback(data){
         console.log("埋点成功")
       },
       errorCallback(){

       }
     });
     /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     神策埋点
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
     if (!view){
       sa.track("frontMark", param);
     }

   }
   /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   tips 弹窗函数
   -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
   tips(insertText){
     let qwBack = document.createElement("div");  // 背景盒子
     let divQw  =  document.createElement("div"); // tips 盒子
     let inside =`<div class="qw-top"><p>${insertText}</p></div><p id="qwConf">确定</p>`;
     document.body.appendChild(qwBack);
     document.body.appendChild(divQw);
     qwBack.setAttribute("class", "qw-back-ground");
     divQw.setAttribute("class", "qw-tips");
     divQw.setAttribute("id", "qwTips");
     document.getElementById('qwTips').innerHTML = inside;
     let qwTip = document.getElementById('qwTips');
     let conf =  document.getElementById('qwConf');
     qwTip.style.left = parseInt((document.body.clientWidth - qwTip.clientWidth) / 2 , 10) + "px";
     qwTip.style.top = parseInt((window.screen.height - qwTip.clientHeight) / 2, 10) + "px";
     conf.addEventListener('click',()=>{
       document.body.removeChild(qwBack);
       document.body.removeChild(divQw);
     })
   }
}
const commonFun = new CommonFun();  // new一个实例

export default commonFun
