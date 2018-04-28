/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：  activityList  校友活动列表页
 3. 作者： liyang@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react'
import './activityList.less'
import ActivityItem from '../../../components/activityItem/activityItem' //校友活动组件
import Layout from '../../../components/layout/layout' //弹框罩层
import  apiDataFilter from  '../../../utils/apiDataFilter'; // api组件
import  commonFun from '../../../utils/commonFun'  // 公共方法函数
export default class ActivityList extends React.Component {

  constructor () {
    super();
    this.state = {
      activitiesFlows: [],
      layoutDescription:'' // 弹框语言说明
    }
  }

  componentWillMount() {
    commonFun.sendBigData({ module: '打点', function: '着陆二级页', action: '打开活动列表页' }); // 页面埋点
    let self =this;
    apiDataFilter.request({
      apiPath: "home.activitiesList",
      successCallback(data) {
        self.setState({
          activitiesFlows:data.msg
        })
      },
      otherCallback(data) {
       self.getActivityInfo(data.msg)
      }
    })
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   校友活动结束活动 收到组件点击之后的信息接收
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  getActivityInfo(layoutDescription){
    this.setState({
      layoutDescription: layoutDescription
    })
  }
  render () {
    const {activitiesFlows} = this.state;
    return (
      <div className="activity-list-page-container">
        {activitiesFlows.map((item,index)=><ActivityItem activity={item} key={index} finishActivity={this.getActivityInfo.bind(this)}></ActivityItem>)}
        <Layout description={this.state.layoutDescription}></Layout>
      </div>
    )
  }

}
