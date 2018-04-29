/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：  LiveListPage  大咖直播列表页
 3. 作者： liyang@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react'
import './LiveList.less'
import LivesItem from '../../../components/livesItem/livesItem' //大咖直播组件
import Layout from '../../../components/layout/Layout' //弹框罩层
import apiDataFilter from  '../../../utils/apiDataFilter';
import commonFun from '../../../utils/commonFun'

export default class LiveListPage extends React.Component {

  constructor () {
    super();
    this.state = {
      livesFlows: [],
      layoutDescription:'' // 弹框语言说明
    }
  }

   componentWillMount () {
     commonFun.sendBigData({  module: '打点', function: '着陆二级页', action: '打开直播列表页' }); // 页面埋点
     let self =this;
     apiDataFilter.request({
       apiPath: "home.livesList",
       successCallback(data) {
         self.setState({
           livesFlows: data.msg
         })
       },
       otherCallback(data) {
         self.setState({
           layoutDescription: data.msg
         })
       }
     })
  }

  render () {
    const {livesFlows} = this.state;
    return (
      <div className="live-list-page-container">
        {livesFlows.map((item,index)=><LivesItem livesItem={item} key={index}></LivesItem>)}
        <Layout description={this.state.layoutDescription}></Layout>
      </div>
    )
  }

}
