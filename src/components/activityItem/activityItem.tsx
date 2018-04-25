/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：  activityItem  校友活动组件
 3. 作者： liyang@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react'
import './activityItem.less'
export default class ActivityItem extends React.Component{
  constructor() {
    super();
  }

  render(){
    return (
      <div className="activity-item">
        <div className="top-pic">
          <img src="https://static.iqycamp.com/661521099827_-7ld21bf1.pic@2x.jpg" alt="图片"/>
        </div>
        <div className="bottom-description">
          <div className="description">
            <h3>圈外校友会</h3>
            <p>举办人：<span>圈外校友会</span></p>
            <p>举办时间：<span>2018-04-30 14:00</span></p>
            <p>举办地点：<span>中山公园</span></p>
          </div>
          <span className="btn">报名</span>
        </div>
      </div>
    )
  }
}
