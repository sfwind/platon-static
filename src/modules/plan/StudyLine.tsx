import * as React from 'react'
import './StudyLine.less'
import { connect } from 'react-redux'
import { loadStudyline } from './async'
import { startLoad, endLoad, alertMsg, set } from 'redux/actions'
import { changeTitle } from '../../utils/helpers'
import { mark } from '../../utils/request'
import { Dialog, Progress } from 'react-weui'
import AssetImg from '../../components/AssetImg'
import { ColumnSpan } from '../../components/ColumnSpan'

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
    const { dispatch, location } = this.props
    const { planId } = location.query
    const { type, status } = item
    const { data } = this.state
    const { problemId } = data

    if(status === -1) {
      dispatch(alertMsg('完成之前的任务，这一组才能解锁<br> 学习和内化，都需要循序渐进哦'))
      return
    }
    if(status === -3) {
      dispatch(alertMsg('抱歉哦，课程开放期间，你未能完成前面的练习，导致这个练习无法解锁'))
      return
    }

    // 是否完成
    let complete = false
    if(status === 1) {
      complete = true
    }

    //已解锁状态
    if(type === 1 || type === 2) {
      const { practicePlanId } = item
      let integrated = true
      if(type === 1) {
        integrated = false
      }
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/warmup',
        query: { practicePlanId, integrated, planId, complete }
      })
    } else if(type === 11 || type === 12) {
      const { practicePlanId } = item
      let integrated = true
      if(type === 11) {
        integrated = false
      }
      dispatch(set('otherApplicationPracticeSubmitId', undefined))
      dispatch(set('applicationId', undefined))
      dispatch(set('articlePage', undefined))
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/application',
        query: { id: item.practiceIdList[ 0 ], practicePlanId, integrated, planId, complete }
      })
    } else if(type === 21) {
      const { practicePlanId } = item
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/challenge',
        query: { id: item.practiceIdList[ 0 ], practicePlanId, planId, complete }
      })
    } else if(type === 31) {
      const { practicePlanId } = item
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/knowledge',
        query: { practicePlanId, planId, complete }
      })
    } else if(type === 32) {
      const { practicePlanId } = item
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/knowledge/review',
        query: { problemId, practicePlanId, planId, complete }
      })
    } else if(type === 101) {
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/knowledge/review',
        query: { problemId, planId, complete }
      })
    } else if(type === 102) {
      this.context && this.context.router.push({
        pathname: '/rise/static/problem/extension',
        query: { problemId, planId }
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
              let title = ''
              if(item.type === 21) {
                title = '小目标'
              } else if(item.type === 20) {
                title = '课程介绍'
              }
              {
                return renderPractice(title, item)
              }
            })
          }
        </div>
      )
    }

    const renderPractice = (title, item) => {
      let locked = item.status < 0 ? 'locked' : ''
      let source = 'go_icon'
      if(item.status < 0) {
        source = 'lock_icon'
      } else if(item.status === 1) {
        source = 'complete_icon'
      }
      return (
        <div className={`practice-detail`} onClick={()=>this.onPracticeSelected(item)}>
          <div className="practice-column">
            <div className={`status-round ${problemType} ${locked}`}>
              <AssetImg type={source} size="20"/>
            </div>
            <div className="title">{title}</div>
          </div>
          <div className={`status-line ${problemType} ${locked}`}></div>
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
                      let title = chapter + '.' + item.section + ' ' + item.name
                      {
                        return renderPractice(title, item)
                      }
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
              let title = ''
              if(item.type === 101) {
                title = '学习报告'
              } else if(item.type === 102) {
                title = '延伸学习'
              }
              {
                return renderPractice(title, item)
              }
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
