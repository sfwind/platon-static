import * as React from 'react'
import './SchedulePlan.less'
import CurrentPlanBar from './components/CurrentPlanBar'
import AssetImg from '../../../components/AssetImg'
import { loadPersonSchedulePlan } from './async'

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
    const { completePlans = [], runningPlans = [], joinDays = 0, loginCount = 0, totalPoint = 0 } = this.state.data

    const renderCompleteCourse = () => {
      // return completeProblem.map((item, index) => {
      // var date = formatDate(new Date(), 'yyyy、-MM-dd')
      return (
        <div className="complete-plan">
          <div className="status-line"/>
          <div className="plan-status"/>
          <div className="plan-detail">
            <div className="plan-title-above">
              {/*<div className="plan-name">{`${item.typeDesc} | ${item.problem.abbreviation} | ${item.point}分`}</div>*/}
              <div className="plan-name">1月主修 | 认识自己 | 0分</div>
              <div className="plan-close">
                2017-01-01
              </div>
            </div>
            <div className="plan-title-below">
              {/*{item.problem.abbreviation + '：' + item.problem.problem}*/}
              认识自己：用冰山模型，分析出真正的自己
            </div>
            <div className="plan-stamp"/>
          </div>
        </div>
      )
      // })
    }

    return (
      <div className="schedule-plan-container">
        <div className="personal-detail">
          <AssetImg className="headimg-url" url={window.ENV.headImgUrl}/>
          <div className="nickname">{window.ENV.userName}</div>
          <div className="personal-icon"></div>
          <div className="parameter-box box1">
            <div className="desc">连续登陆圈外天数</div>
            <div className="data">28</div>
          </div>
          <div className="parameter-box box2">
            <div className="desc">加入圈外天数</div>
            <div className="data">328</div>
          </div>
          <div className="parameter-box box3">
            <div className="desc">积分</div>
            <div className="data">20</div>
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
          {renderCompleteCourse()}
        </div>
      </div>
    )
  }

}
