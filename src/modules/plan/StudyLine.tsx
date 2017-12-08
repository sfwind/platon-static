import * as React from 'react'
import './StudyLine.less'
import { connect } from 'react-redux'
import { loadStudyline } from './async'
import { startLoad, endLoad, alertMsg, set } from 'redux/actions'
import { changeTitle } from '../../utils/helpers'
import { mark } from '../../utils/request'
import { Dialog, Progress } from 'react-weui'
import AssetImg from '../../components/AssetImg'
import ColumnSpan from '../../components/ColumnSpan'

const { Alert } = Dialog

const MAJOR_PROBLEM = 1
const MINOR_PROBLEM = 2
const TRIAL_PROBLEM = 3

const hanzi = [ '零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十' ]

/**
 * rise_icon_hr 左侧较宽 TODO
 */
@connect(state => state)
export default class StudyLine extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {
      data: {}
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
      function: '学习页面',
      action: '打开新学习页面'
    })

    const { dispatch, location } = this.props
    dispatch(startLoad())

    loadStudyline(location.query.planId).then(res => {
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

  onPracticeSelected(item) {
    const { dispatch } = this.props
    const { planData, currentIndex } = this.state
    const { problemId, lockedStatus, status, openRise } = planData
    const { type, practicePlanId, planId, unlocked } = item
    if(!unlocked) {
      if(status === 4) {
        this.setState({ showExpiredDateWarning: true })
        return
      }
      if(lockedStatus === -1) {
        dispatch(alertMsg('完成之前的任务，这一组才能解锁<br> 学习和内化，都需要循序渐进哦'))
      }
      if(lockedStatus === -3) {
        dispatch(alertMsg('抱歉哦，课程开放期间，你未能完成前面的练习，导致这个练习无法解锁'))
      }
      return
    }
    // 是否完成
    let complete = false
    if(item.status === 1) {
      complete = true
    }

    //已解锁状态
    if(type === 1 || type === 2) {
      let integrated = true
      if(type === 1) {
        integrated = false
      }
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/warmup',
        query: { practicePlanId, currentIndex, integrated, planId, complete }
      })
    } else if(type === 11 || type === 12) {
      let integrated = true
      if(type === 11) {
        integrated = false
      }
      dispatch(set('otherApplicationPracticeSubmitId', undefined))
      dispatch(set('applicationId', undefined))
      dispatch(set('articlePage', undefined))
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/application',
        query: { id: item.practiceIdList[ 0 ], practicePlanId, currentIndex, integrated, planId, complete }
      })
    } else if(type === 21) {
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/challenge',
        query: { id: item.practiceIdList[ 0 ], practicePlanId, currentIndex, planId, complete }
      })
    } else if(type === 31) {
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/knowledge',
        query: { practicePlanId, currentIndex, planId, complete }
      })
    } else if(type === 32) {
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/knowledge/review',
        query: { problemId, planId, currentIndex, practicePlanId, complete }
      })
    }
  }

  render() {
    const { data } = this.state
    const { problemName, problemId, preview = [], review = [], chapters = [], problemType } = data

    const renderPreview = () => {
      return (
        <div className="preview-practice">
          <div className="preview-title">课程准备</div>
          {
            preview.map((item, index) => {
              return (
                <div key={index} className={`practice-detail`} onClick={()=>this.onPracticeSelected(item)}>
                  <div className="status-icon">
                    <div className={`status-line ${problemType}`}></div>
                    <div className={`status-round ${problemType}`}></div>
                  </div>
                  <div className="title">{item.type === 20 ? '课程介绍' : ''}{item.type === 21 ? '小目标' : ''}</div>
                </div>
              )
            })
          }
        </div>
      )
    }

    const renderChapter = () => {
      return (
        <div className="chapter-practice">
          {
            chapters.map((item, index) => {

              const { sections, chapter } = item
              return (
                <div key={index} className={`chapter`}>
                  {'第' + hanzi[ chapter ] + '章 '}{item.name}
                  {
                    sections.map((item, index) => {
                      return (
                        <div key={index} className={`practice-detail`} onClick={()=>this.onPracticeSelected(item)}>
                          <div className="status-icon">
                            <div className={`status-line ${problemType}`}></div>
                            <div className={`status-round ${problemType}`}>
                              <AssetImg />
                            </div>
                          </div>
                          <div className="title">{chapter}{'.'}{item.section + ' '}{item.name}</div>
                        </div>
                      )
                    })
                  }

                </div>
              )
            })
          }
        </div>
      )
    }

    const renderReview = () => {
      return (
        <div className="review-practice">
          <div className="review-title">课后总结<span>(选做)</span></div>
          {
            review.map((item, index) => {
              return (
                <div key={index} className={`practice-detail`} onClick={()=>this.onPracticeSelected(item)}>
                  <div className="status-icon">
                    <div className={`status-line ${problemType}`}></div>
                    <div className={`status-round ${problemType}`}></div>
                  </div>
                  <div className="title">{item.type === 1 ? '学习报告' : ''}{item.type === 2 ? '延伸学习' : ''}</div>
                </div>
              )
            })
          }
        </div>
      )
    }

    return (
      <div className="study-line-container">

        <div className={`problem-head ${problemType}`}>
          <div className="problem-name">{problemName}</div>
        </div>
        {renderPreview()}
        <ColumnSpan/>
        {renderChapter()}
        <ColumnSpan/>
        {renderReview()}
      </div>
    )

  }
}
