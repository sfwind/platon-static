import * as React from 'react'
import './StudyLine.less'
import { connect } from 'react-redux'
import { loadStudyline } from './async'
import { startLoad, endLoad, alertMsg, set } from 'redux/actions'
import { changeTitle, scrollToHeight } from '../../utils/helpers'
import { mark } from '../../utils/request'
import { Dialog } from 'react-weui'
import { ColumnSpan } from '../../components/ColumnSpan'
import { MarkBlock } from '../../components/markblock/MarkBlock'
import { ProblemTitle } from '../problem/components/ProblemTitle'

const { Alert } = Dialog

const MAJOR_PROBLEM = 1
const MINOR_PROBLEM = 2
const TRIAL_PROBLEM = 3

const hanzi = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']



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
    this.learningContainer = ''
    changeTitle('课程学习')
    this.moment = require('moment')
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  async componentWillMount() {
    mark({
      module: '打点',
      function: '学习页面',
      action: '打开新学习页面'
    })

    // window.addEventListener('popstate', (e) => {
    //   window.location.href = '/rise/static/rise'
    // })
    // history.pushState('', '', '#main')

    const { dispatch, location } = this.props
    dispatch(startLoad())

    let res = await loadStudyline(location.query.planId)
    dispatch(endLoad())
    if(res.code === 200) {
      this.setState({ data: res.msg })
    } else {
      dispatch(alertMsg(res.msg))
    }
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

    if(type === 20) {
      const { practicePlanId } = item
      this.context && this.context.router.push({
        pathname: '/rise/static/plan/view',
        query: { id: problemId }
      })
    } else if(type === 21) {
      const { practicePlanId } = item
      this.context && this.context.router.push({
        pathname: '/rise/static/practice/challenge',
        query: { id: problemId, practicePlanId, planId, complete }
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
        pathname: '/rise/static/plan/report',
        query: { problemId, planId }
      })
    } else if(type === 102) {
      this.context && this.context.router.push({
        pathname: '/rise/static/problem/extension',
        query: { problemId, planId }
      })
    }
  }

  componentDidUpdate(){
    if(this.learningContainer){
      scrollToHeight(this.learningContainer, -125)
    }
  }

  render() {
    const { data } = this.state
    const { problemType, problemId, preview = [], review = [], chapters = [] } = data

    let styleType = ''
    if(problemType === MAJOR_PROBLEM) {
      styleType = 'major'
    } else if(problemType === MINOR_PROBLEM) {
      styleType = 'minor'
    }

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
              return renderPractice(title, item)
            })
          }
        </div>
      )
    }

    const renderPractice = (title, item) => {
      let status = ''
      if(item.status<0){
        status = 'locked'
      }else if(item.status == 0){
        if(styleType === 'major'){
          status = 'major_running'
        }else{
          status = 'minor_running'
        }
        this.learningContainer = ".practice-"+item.practicePlanId
      }else if(item.status === 1){
        status = 'complete'
      }
      return (
        <MarkBlock func={'课程提纲'} action={'点击练习'} memo={item.type}
                   className={`practice-detail practice-${item.practicePlanId}`} onClick={() => this.onPracticeSelected(item)}>
          <div className={`status-line ${status}`}></div>
          <div className={`status ${status}`}></div>
          {item.status === 0 && <div className={`start-learning ${status}`}>学习</div>}
          <div className={`practice-column ${status}`}>
            <div className={`title-angle ${status}`}/>
            <div className={`title ${status}`}>{title}
              {item.status === 0 && <div className={`start-practice ${status}`}></div>}
            </div>
          </div>

        </MarkBlock>
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
                  {'第' + hanzi[chapter] + '章 '}{item.name}
                  {
                    sections.map((item, index) => {
                      let title = chapter + '.' + item.section + ' ' + item.name
                      return renderPractice(title, item)
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
          <div className="review-title">课后总结(选做)</div>
          {
            review.map((item, index) => {
              let title = ''
              if(item.type === 101) {
                title = '学习报告'
              } else if(item.type === 102) {
                title = '延伸学习'
              }
              return renderPractice(title, item)
            })
          }
        </div>
      )
    }

    return (
      <div className="study-line-container">
        <ProblemTitle problemId={problemId}/>
        {renderPreview()}
        <ColumnSpan height={1} backgroundColor={'#eee'}/>
        {renderChapter()}
        <ColumnSpan height={1} backgroundColor={'#eee'}/>
        {renderReview()}
      </div>
    )

  }
}
