import * as React from 'react'
import './SchedulePlan.less'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import { CurrentPlanBar } from './components/CurrentPlanBar'
import { CompletePlanBar } from './components/CompletePlanBar'
import AssetImg from '../../../components/AssetImg'
import { loadPersonSchedulePlan } from './async'
import { mark } from '../../../utils/request'
import { ToolBar } from '../../base/ToolBar'
import { ColumnSpan } from '../../../components/ColumnSpan'
import * as FontAwesome from 'react-fontawesome'
import { MarkBlock } from '../../../components/markblock/MarkBlock'
import { testAlert } from '../../../components/globalalert/GlobalRequest'
import DailyTalk from './DailyTalk/DailyTalk'
import WXHeadImg from '../../customer/components/WXHeadImg'

@connect(state => state)
export default class SchedulePlan extends React.Component {

  constructor () {
    super()
    this.state = {
      showPage: false,
      data: {
        showAllRunningPlan: false, sliceRunningPlans: [],
      },
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  async componentWillMount () {
    mark({ view: true, module: '打点', function: '学习', action: '打开学习计划页面' })
    const { dispatch, location } = this.props

    let res = await loadPersonSchedulePlan()
    this.setState({
      data: res.msg,
      showPage: true,
    })
  }

  handleGoPersonalCenter () {
    this.context.router.push('/rise/static/customer/new/profile')
  }

  handleClickCourse (planId) {
    this.context.router.push({ pathname: '/rise/static/plan/study', query: { planId: planId } })
  }

  handleGoOverView () {
    this.context.router.push('/rise/static/course/schedule/overview')
  }

  handleSwitchToolBar (toolBarStatus) {
    this.setState({
      showToolBar: toolBarStatus,
    })
  }

  render () {
    let {
      showAllRunningPlan,
      sliceRunningPlans,
      showPage,
      showToolBar,
    } = this.state
    let {
      announce,
      completePlans = [],
      runningPlans = [],
      joinDays = 0,
      loginCount = 0,
      totalPoint = 0,
      hasCourseSchedule = true,
      countDownElement = {},
    } = this.state.data

    sliceRunningPlans = !showAllRunningPlan ? runningPlans.slice(0, 3) : runningPlans

    if (!showPage) {
      return <div></div>
    }

    return (
      <div className="schedule-plan-container">
        <div className='info-container'>
          <div className="personal-detail">
            <div className="detail-top">

              {/*<AssetImg className="headimg-url"*/}
                        {/*url={window.ENV.headImgUrl}/>*/}

                <WXHeadImg className="headimg-url" src={window.ENV.headImgUrl} riseId={window.ENV.riseId}/>
              <div className="nickname">{window.ENV.userName}</div>
              <div className="personal-icon"
                   onClick={() => this.handleGoPersonalCenter()}></div>
              {
                countDownElement &&
                <div className="count-down">距离<span className="bold">{countDownElement.description}</span>开学还有<span className="number">{countDownElement.remainCount}</span>天
                </div>
              }
            </div>
            <div className="parameter-box box1">
              <div className="desc">连续学习天数</div>
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
          </div>
          {
            announce &&
            <div>
              <ColumnSpan height={10}/>
              <div className="person-tip">
                <div className="problem-update-tip-icon"></div>
                <span>{announce}</span>
              </div>
              <ColumnSpan height={10}/>
            </div>
          }
          <div className="current-problems">
            <div className="title">我的课程</div>
            {
              runningPlans.length > 0 ?
                !showAllRunningPlan ?
                  runningPlans.length > 3 ?
                    <div className="more"
                         onClick={() => this.setState({ showAllRunningPlan: true })}>
                      更多&nbsp;
                      <FontAwesome name="angle-right"/>
                    </div> :
                    <div></div> :
                  <div className="more"
                       onClick={() => this.setState({ showAllRunningPlan: false })}>
                    收起&nbsp;
                    <FontAwesome name="angle-down"/>
                  </div> :
                <div className="no-running-plans">
                  <div className="no-running-icon"></div>
                  <div className="no-running-tip1">现在没有在学的课程哦！</div>
                  {
                    hasCourseSchedule &&
                    <MarkBlock module={'打点'}
                               func={'学习页面'}
                               action={'点击学习计划按钮'}
                               className="no-running-tip2">
                      点击查看我的学习计划立即开启学习之旅
                    </MarkBlock>
                  }
                </div>
            }
            <div className="plan-bar-box">
              {
                sliceRunningPlans.map((plan, index) => <CurrentPlanBar key={index}
                                                                       plan={plan}/>)
              }
            </div>
            {
              hasCourseSchedule &&
              <span className="view-course-schedule"
                    onClick={() => this.handleGoOverView()}>查看我的学习计划&nbsp;<FontAwesome name="angle-right"/></span>
            }
          </div>
          {
            completePlans.length > 0 &&
            <div className="complete-problems">
              <div className="title">已完成的课程</div>
              {completePlans.map((plan, index) => <CompletePlanBar key={index}
                                                                   plan={plan}/>)}
            </div>
          }
          <DailyTalk switchToolbar={(toolbarStatus) => this.handleSwitchToolBar(toolbarStatus)}/>
          <ToolBar hidden={!showToolBar}/>
        </div>
      </div>
    )
  }

}
