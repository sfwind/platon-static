import * as React from 'react'
import './SchedulePlan.less'
import { connect } from 'react-redux'
import { loadSchedulePlan, createPlan } from './async'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { changeTitle } from '../../../utils/helpers'
import { mark } from '../../../utils/request'
import { Dialog, Progress } from 'react-weui'
import AssetImg from '../../../components/AssetImg'
import * as _ from 'lodash';
import { openAudition } from '../../problem/async'

const { Alert } = Dialog

const MAJOR_PROBLEM = 1;
const MINOR_PROBLEM = 2;
const TRIAL_PROBLEM = 3;

/**
 * rise_icon_hr 左侧较宽 TODO
 */
@connect(state => state)
export default class SchedulePlan extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
    }
    changeTitle('圈外同学')
    this.moment = require('moment')
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({
      module: '打点',
      function: '学习',
      action: '打开学习计划页面'
    })

    const { dispatch, location } = this.props
    dispatch(startLoad())

    loadSchedulePlan().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ data: res.msg })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  clickCourse(type, item) {
    const { dispatch } = this.props

    if(type === TRIAL_PROBLEM) {
      this.context.router.push({ pathname: '/rise/static/plan/study', query: { planId: item.id } })
    }

    // 没有开课
    if(!item.id) {
      this.setState({
        dialogButtons: [
          {
            label: '取消',
            onClick: () => {
              this.setState({ dialogShow: false, dialogButtons: [], dialogContent: '' })
            }
          },
          {
            label: '确认',
            onClick: () => {
              dispatch(startLoad())
              this.setState({ dialogShow: false })
              createPlan(item.problem.id).then(res => {
                dispatch(endLoad())
                if(res.code === 200) {
                  this.context.router.push(`/rise/static/plan/study?planId=${res.msg}`)
                } else {
                  dispatch(alertMsg(res.msg))
                }
              }).catch(e => {
                dispatch(alertMsg(e))
              })
            }
          }
        ],
        dialogShow: true,
        dialogContent: '小课开启后，学习期限为30天。期间完成学习即可永久查看内容。确认开启吗？'
      })
    } else {
      this.context.router.push({ pathname: '/rise/static/plan/study', query: { planId: item.id } })
    }
  }

  learn(item) {
    this.context.router.push({ pathname: '/rise/static/plan/study', query: { planId: item.id } })
  }

  handleClickAuditionPlan(plan) {
    const { planId, errMsg } = plan;
    const { dispatch } = this.props
    // 如果 planId 为 null，代表当前课程未开，点击弹窗提醒
    if(errMsg) {
      dispatch(alertMsg(errMsg));
      return;
    }
    if(planId) {
      this.context.router.push(`/rise/static/plan/study?planId=${planId}`)
    } else {
      this.setState({
        dialogButtons: [
          {
            label: '取消',
            onClick: () => {
              this.setState({ dialogShow: false, dialogButtons: [], dialogContent: '' })
            }
          },
          {
            label: '确认',
            onClick: () => {
              dispatch(startLoad())
              this.setState({ dialogShow: false })
              openAudition().then(res => {
                dispatch(endLoad())
                if(res.code === 200) {
                  this.context.router.push(`/rise/static/plan/study?planId=${res.msg}`)
                } else {
                  dispatch(alertMsg(res.msg))
                }
              }).catch(e => {
                dispatch(alertMsg(e))
              })
            }
          }
        ],
        dialogShow: true,
        dialogContent: '试听课开启后，学习期限为30天。期间完成学习即可永久查看内容。确认开启吗？'
      })
    }
  }

  render() {
    const { data } = this.state
    const { month, topic, today, majorProblem = [], minorProblem = [], minorPercent = 0, majorPercent = 0, trialProblem = [], completeProblem = [] } = data

    const renderMajorCourse = () => {
      return majorProblem.map((item, index) => {
          return (
            <div className="course-card" onClick={() => this.clickCourse(MAJOR_PROBLEM, item)} key={index}>
              <div className="img">
                <div className={`problem-item-backcolor major`}/>
                <div className={`problem-item-backimg`}/>
                <div className="problem-item-subCatalog">{item.problem.abbreviation}</div>
                <div className="problem-month major">
                  <span className="month-large">{item.month}</span>
                  <span className="month-small">{'月'}</span>
                </div>
                {item.id ? null : <div className="wait-open">待开课</div>}
              </div>
              <div className="problem-name">{item.problem.problem}</div>

            </div>
          )
        }
      )
    }

    const renderMinorCourse = () => {
      return minorProblem.map((item, index) => {
        return (
          <div className="course-card" onClick={() => this.clickCourse(MINOR_PROBLEM, item)} key={index}>
            <div className="img">
              <div className={`problem-item-backcolor minor`}/>
              <div className={`problem-item-backimg`}/>
              <div className="problem-item-subCatalog">{item.problem.abbreviation}</div>
              <div className="problem-month minor">
                <span className="month-large">{item.month}</span>
                <span className="month-small">{'月'}</span>
              </div>
              {item.id ? null : <div className="wait-open">待开课</div>}
            </div>
            <div className="problem-name">{item.problem.problem}</div>
          </div>
        )
      })
    }

    const renderTrialCourse = () => {
      return trialProblem.map((item, index) => {
        return (
          <div className="course-card" key={index}
               onClick={() => {
                 this.handleClickAuditionPlan(item)
               }}>
            <div className="img">
              <div className={`problem-item-backcolor trial`}/>
              <div className={`problem-item-backimg`}/>
              <div className="problem-item-subCatalog">{item.problem.abbreviation}</div>
            </div>
            <div className="problem-name">{item.problem.problem}</div>
          </div>
        )
      })
    }

    const renderCompleteCourse = () => {
      return completeProblem.map((item, index) => {
        var year = this.moment(item.closeTime).format('YYYY')
        var date = this.moment(item.closeTime).format('MM.DD')
        return (
          <div className="complete-plan" key={index}>
            <div className="plan-close">
              <div className="plan-close-date">{date}</div>
              <div className="plan-close-year">{year}</div>
            </div>
            <div className="plan-name">{item.problem.problem}</div>
            <div className="plan-click" onClick={() => this.learn(item)}>{'>'}</div>
          </div>
        )
      })
    }

    const renderCourseCategory = (title) => {
      return (
        <div className="course-category">
          <div className="category-line"/>
          <div className="category-title">{title}</div>
          <div className="category-line"/>
        </div>
      )
    }

    const renderDialog = () => {
      const { dialogShow = false, dialogButtons = [], dialogContent } = this.state

      return (
        <Alert
          show={dialogShow}
          buttons={dialogButtons}
        >
          {dialogContent}
        </Alert>
      )
    }

    return (
      <div className="schedule-plan-container" style={{ minHeight: window.innerHeight }}>

        <div className="monthly-topic">
          {topic ? month + '月 ' + topic : null}
        </div>
        <div className="schedule-plan">
          <div className="plan-button"
               onClick={() => this.context.router.push('/rise/static/course/schedule/overview')}>
            {'学习计划'}
          </div>
        </div>
        <div className="card">
          <div className="card-icon"><AssetImg type="current_month_progress" size={18}/></div>
          <div className="card-topic">本月进度</div>
          <div className="today">{today}</div>
          <div className="major-progress">
            <div className="progress-name">主修课</div>
            <div className="progress-bar">
              <Progress value={majorPercent}/>
            </div>
            <div className="progress-percent">
              {majorPercent + '%'}
            </div>

          </div>
          <div className="minor-progress">
            <div className="progress-name">辅修课</div>
            <div className="progress-bar">
              <Progress value={minorPercent}/>
            </div>
            <div className="progress-percent">
              {minorPercent + '%'}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-icon"><AssetImg type="running_plan" size={18}/></div>
          <div className="card-topic">进行中</div>
          {renderCourseCategory('主修课')}
          <div className="course-container">
            {renderMajorCourse()}
          </div>
          {!_.isEmpty(minorProblem) ? renderCourseCategory('辅修课') : null}
          {!_.isEmpty(minorProblem) ? <div className="course-container">
            {renderMinorCourse()}
          </div> : null}
          {!_.isEmpty(trialProblem) ? renderCourseCategory('试听课') : null}
          {!_.isEmpty(trialProblem) ? <div className="course-container">
            {renderTrialCourse()}
          </div> : null}
        </div>
        {!_.isEmpty(completeProblem) ? <div className="card">
          <div className="card-icon"><AssetImg type="complete_plan" size={18}/></div>
          <div className="card-topic">已完成</div>
          <div className="complete-course-container">
            {renderCompleteCourse()}
          </div>
        </div> : null}
        {renderDialog()}
      </div>
    )
  }
}
