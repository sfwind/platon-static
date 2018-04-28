/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：  activityItem  校友活动组件
 3. 作者： liyang@iquanwai.com
 4. 备注：finishActivity  // 活动结束 点击之后的返回说明  fun
         activity       // 活动具体数据的接收 {}
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react'
import './activityItem.less'
import CommonFun from "../../utils/commonFun";
export default class ActivityItem extends React.Component{
  constructor() {
    super();
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  判断 是否跳入后置业 或者弹框
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  handleClick (targetUrl) {
    CommonFun.sendBigData({ module: '打点', function: '着陆页', action: '点击活动' });
    if (targetUrl) {
      window.location.href = targetUrl
    } else {
      this.props.finishActivity('报名已经结束咯，敬请期待下次活动')
    }
  }
  render(){
    const { activity } = this.props;
    return (
      <div className="activity-item" onClick={()=>{this.handleClick(activity.targetUrl)}}>
        <div className="top-pic">
          <img src={activity.thumbnail} alt="图片"/>
        </div>
        <div className="bottom-description">
          <div className="description">
            <h3>{activity.name}</h3>
            <p>举办方：<span>{activity.holder}</span></p>
            <p>举办时间：<span>{activity.startTimeStr}</span></p>
            <p>举办地点：<span>{activity.location}</span></p>
          </div>
          <span className={activity.status == 1 ? "btn prepare" :(activity.status == 2 ? "btn closed": 'btn review') } >{activity.status == 1 ? "报名" :(activity.status == 2 ? '结束': '回顾') }</span>
        </div>
      </div>
    )
  }
}
