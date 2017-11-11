import * as React from 'react'
import './SchedulePlan.less'
import { connect } from 'react-redux'
import { loadSchedulePlan } from './async'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { changeTitle } from '../../../utils/helpers'
import { mark } from '../../../utils/request'
import { Dialog, Progress } from 'react-weui'

const { Alert } = Dialog

/**
 * rise_icon_hr 左侧较宽 TODO
 */
@connect(state => state)
export default class SchedulePlan extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {
      data:{},
    }
    changeTitle('圈外同学')
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({
      module: '打点',
      function: '学习',
      action: '打开学习计划页面',
      memo: window.ENV.osName
    })

    const { dispatch, location } = this.props
    dispatch(startLoad())

    loadSchedulePlan().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({data:res.msg})
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  learn(item){
    this.context.router.push({pathname:'/rise/static/plan/study', query:{planId:item.id}})
  }

  render() {
    const { data } = this.state
    const { month, topic, today, majorProblem=[], minorProblem=[], minorPercent = 0, majorPercent = 0, trialProblem=[], completeProblem=[] } = data


    const renderMajorCourse = ()=>{
      return majorProblem.map((item, index)=>{
          return (
            <div className="course-card">
              <div className="img">
                <div className={`problem-item-backcolor catalog4`}/>
                <div className={`problem-item-backimg catalog4`}/>
                <div className="problem-item-subCatalog">{item.problem.abbreviation}</div>
              </div>
              <span>{item.problem.problem}</span>
            </div>
          )
        }
      )
    }

    const renderMinorCourse = ()=>{
      return minorProblem.map((item, index)=>{
        return (
          <div className="course-card">
            <div className="img">
              <div className={`problem-item-backcolor catalog1`}/>
              <div className={`problem-item-backimg catalog1`}/>
              <div className="problem-item-subCatalog">{item.problem.abbreviation}</div>
            </div>
            <span>{item.problem.problem}</span>
          </div>
        )
      })
    }

    const renderTrialCourse = ()=>{
      return trialProblem.map((item, index)=>{
        return (
          <div className="course-card">
            <div className="img">
              <div className={`problem-item-backcolor catalog3`}/>
              <div className={`problem-item-backimg catalog3`}/>
              <div className="problem-item-subCatalog">{item.problem.abbreviation}</div>
            </div>
            <span>{item.problem.problem}</span>
          </div>
        )
      })
    }

    const renderCompleteCourse = ()=>{
      return completeProblem.map((item, index)=>{
        return (
          <div className="complete-plan">
            <div className="plan-close-date">{item.closeTime}</div>
            <div className="plan-name">{item.problem.problem}</div>
            <div className="plan-click" onClick={()=> this.learn(item)}>{'>'}</div>
          </div>
        )
      })
    }

    const renderCourseCategory = (title)=>{
      return (
        <div className="course-category">
          <div className="category-line"/>
          <div className="category-title">{title}</div>
          <div className="category-line"/>
        </div>
      )
    }

    return (
      <div className="schedule-plan-container" style={{minHeight:window.innerHeight}}>
        <div className="monthly-topic">
          {month}月{' '+topic}
        </div>
        <div className="schedule-plan">
          <div className="plan-button">
            {'学习计划 >'}
          </div>
        </div>
        <div className="card">
          <div className="card-icon"></div>
          <div className="card-topic">本月进度</div>
          <div className="today">{today}</div>
          <div className="major-progress">
            <div className="progress-name">主修课</div>
            <div className="progress-bar">
              <Progress value={majorPercent}/>
            </div>
            <div className="progress-percent">
              {majorPercent+'%'}
            </div>

          </div>
          <div className="minor-progress">
            <div className="progress-name">辅修课</div>
            <div className="progress-bar">
              <Progress value={minorPercent}/>
            </div>
            <div className="progress-percent">
              {minorPercent+'%'}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-icon"></div>
          <div className="card-topic">进行中</div>
          {renderCourseCategory('主修课')}
          <div className="course-container">
            {renderMajorCourse()}
          </div>
          {renderCourseCategory('辅修课')}
          <div className="course-container">
            {renderMinorCourse()}
          </div>
          {renderCourseCategory('试听课')}
          <div className="course-container">
            {renderTrialCourse()}
          </div>
        </div>
        <div className="card">
          <div className="card-icon"></div>
          <div className="card-topic">已完成</div>
          <div className="complete-course-container">
            <div className="process-line" style={{height:completeProblem.length*30}}></div>
            <div className="complete-course-detail">
              {renderCompleteCourse()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
