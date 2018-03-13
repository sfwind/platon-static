import * as React from 'react'
import './SchedulePlan.less'
import { CurrentPlanBar } from './components/CurrentPlanBar'
import AssetImg from '../../../components/AssetImg'
import { loadPersonSchedulePlan } from './async'
import { CompletePlanBar } from './components/CompletePlanBar'

export default class SchedulePlan extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  async componentWillMount() {
    let res = await loadPersonSchedulePlan()
    if(res.code == 200) {
      this.setState({
        data: res.msg
      })
    }
  }

  render() {
    console.log(this.state.data)
    const { completePlans = [], runningPlans = [], joinDays = 0, loginCount = 0, totalPoint = 0 } = this.state.data

    return (
      <div className="schedule-plan-container">
        <div className="personal-detail">
          <AssetImg className="headimg-url" url={window.ENV.headImgUrl}/>
          <div className="nickname">{window.ENV.userName}</div>
          <div className="personal-icon"></div>
          <div className="parameter-box box1">
            <div className="desc">连续登陆圈外天数</div>
            <div className="data">{loginCount}</div>
          </div>
          <div className="parameter-box box2">
            <div className="desc">加入圈外天数</div>
            <div className="data">{joinDays}</div>
          </div>
          <div className="parameter-box box3">
            <div className="desc">积分</div>
            <div className="data">{totalPoint}</div>
          </div>
          <div className="problem-update-tips">课程更新消息！！！</div>
        </div>
        <div className="current-problems">
          <div className="title">我的课程</div>
          <div className="more">更多&nbsp;&nbsp;></div>
          <div className="plan-bar-box">
            {
              runningPlans.map(plan => {
                return (
                  <CurrentPlanBar plan={plan}/>
                )
              })
            }
          </div>
          <span className="view-course-schedule">查看我的学习计划&nbsp;&nbsp;></span>
        </div>
        <div className="complete-problems">
          <div className="title">已完成的课程</div>
          {
            completePlans.map(plan => {
              return (
                <CompletePlanBar plan={plan}/>
              )
            })
          }
        </div>
      </div>
    )
  }

}
