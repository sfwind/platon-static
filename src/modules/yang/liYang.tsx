/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：platon-static
2. 文件名：src -> modules -> yang -> liyang.tsx(样式页面)
3. 作者：liyang@iquanwai.com
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import * as React from 'react'
import apiDataFilter from "../../utils/apiDataFilter" ;

import './li-yang.less';

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    引入组件
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import  Editor from '../../components/simditor/Editor'
import  bigData from "../../utils/bigData";
export default class LiYang extends React.Component {
  constructor() {
    super();
    this.state = {
      flag:true  , // 判断
    };
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  数据请求
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  getdata() {
  /*bigData({ module:"打点", func:"打点", action:"打点", memo:"打点"})*/
    apiDataFilter.request({
      apiPath: "common.bigData",
      method: "get",
      data: {},
      successCallback(){},
      errorCallback(){

      }
    })
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  页面渲染
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  render() {
    return (
      <div className="sym" onClick={console.log("进入")}>
          <p >你们好！</p>
        <Editor ref="editor" moduleId={3} value={}
                placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。"/>
      </div>
    )
  }
}
