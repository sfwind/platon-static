import * as React from 'react'
import { connect } from 'react-redux'
import './ImprovementReport.less'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { queryReport } from './async'
import { Modal } from '../../components/Modal'
import { isNumber, merge } from 'lodash'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { NumberToChinese } from '../../utils/helpers'
import RenderInBody from '../../components/RenderInBody'
import { ProblemTitle, ProblemTitleType } from '../problem/components/ProblemTitle'
import { FooterButton } from '../../components/submitbutton/FooterButton'
import AssetImg from '../../components/AssetImg'

const numeral = require('numeral')

@connect(state => state)
export class ImprovementReport extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { planId, problemId } = this.props.location.query
    const { dispatch } = this.props
    dispatch(startLoad())
    queryReport(planId).then((res) => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ planData: res.msg })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })

    this.picHeight = (window.innerWidth / (750 / 350)) > 175 ? 175 : (window.innerWidth / (750 / 350))
  }

  renderChapterScores(problemType) {
    const { planData = {} } = this.state
    const { chapterList } = planData
    if(chapterList) {
      return chapterList.map((item, key) => {
        let clazz = 'complete-item ' + (key === 0 ? 'first' : '')
        return (
          <div className={clazz}>
            <div className="info">
              <span className="name">{NumberToChinese(item.chapter)}、{item.name}</span>
              <div className="clear"/>
            </div>
            <Progress progressStyle={{ width: `${window.innerWidth - 170}px` }}
                      score={item.myWarmScore}
                      totalScore={item.totalWarmScore}
                      problemTypeClass={this.calculateMedalTypeClass(problemType)}/>
          </div>
        )
      })
    }
  }

  renderApplicationScores(problemType) {
    const { planData = {} } = this.state
    const {
      applicationTotalScore, applicationShouldCount,
      applicationScore, applicationCompleteCount
    } = planData
    let renderArr = []

    let applications = (
      <div className="complete-item first">
        <div className="info">
          <span className="name">应用题完成 <span
            className="big-point">{applicationCompleteCount}</span> / {applicationShouldCount} 份，得分：</span>
          <div className="clear"/>
        </div>
        <Progress holderClass="article" progressStyle={{ width: `${window.innerWidth - 170}px` }}
                  score={applicationScore}
                  totalScore={applicationTotalScore}
                  problemTypeClass={this.calculateMedalTypeClass(problemType)}/>
      </div>
    )

    renderArr.push(applications)
    return renderArr
  }

  goBack() {
    window.history.back()
  }

  nextPlan() {
    const { location } = this.props
    this.context.router.push('/rise/static/problem/explore')
  }

  closeConfirmModal() {
    this.setState({ showConfirmModal: false })
  }

  handleClickClose() {
    if(window.ENV.showExplore !== 'false') {
      this.context.router.push('/rise/static/rise')
    } else {
      this.context.router.push('/rise/static/course/schedule/plan')
    }
  }

  renderBtns() {
    return (
      <RenderInBody>
        <div className="button-footer">
          <div className="left" onClick={() => this.handleClickClose()}>关闭</div>
          <div className="right" onClick={this.goBack.bind(this)}>返回</div>
        </div>
      </RenderInBody>
    )
  }

  calculateMedalTypeClass(problemType) {
    if(problemType === ProblemTitleType.MAJOR_PROBLEM) {
      return 'major'
    } else if(problemType === ProblemTitleType.MINOR_PROBLEM) {
      return 'minor'
    } else if(problemType === ProblemTitleType.TRIAL_PROBLEM) {
      return 'trial'
    }
  }

  render() {
    const { planData = {}, showConfirmModal, problemType = ProblemTitleType.TRIAL_PROBLEM } = this.state
    const {
      problem, problemId, studyDays = 0, percent = 0, receiveVoteCount, shareVoteCount, totalScore = 0, integratedTotalScore, integratedShouldCount,
      integratedScore, integratedCompleteCount, chapterList, applicationTotalScore, applicationShouldCount,
      applicationScore, applicationCompleteCount, pic, showNextBtn, votedScore, recommendations, doneAllApps
    } = planData

    return (
      <div className="improvement-report">
        <ProblemTitle ref={'problemTitle'} problemId={problemId} style={{ margin: '0 -3rem' }}
                      callBack={(problemType) => this.setState({ problemType: problemType })}/>
        <Modal show={showConfirmModal}
               height={240}
               buttons={[
                 { click: () => this.nextPlan(), content: '确定' },
                 { click: () => this.closeConfirmModal(), content: '取消' }
               ]}>
          <div className="content" style={{ marginTop: '0px' }}>
            <div className="text">确定开始下一课程吗？</div>
          </div>
          <div className="content2">
            <div className="text2">当前课程可以进入我的-我的课程中复习</div>
          </div>
        </Modal>
        <div className="report-header">
          <div className="report-title">学习报告</div>
          <div className={`report-global-data`}>
            <span className={`nickname ${this.calculateMedalTypeClass(problemType)}`}>{window.ENV.userName}</span>
            <div className={`global-medal ${this.calculateMedalTypeClass(problemType)}`}/>
            <div className="data-block">
              <div className="data">
                <div className="type-str">总得分</div>
                <div className="type-point">{totalScore}</div>
              </div>
              <div className="data">
                <div className="type-str">击败</div>
                <div className="type-point">{percent}%</div>
              </div>
              <div className="data">
                <div className="type-str">学习天数</div>
                <div className="type-point">{studyDays === -1 ? '30天' : `${studyDays} 天`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="body-container">
          <div className="body">
            <div className="header"><span className="title">各章选择题得分</span></div>
            {this.renderChapterScores(problemType)}
          </div>
          <div className="body" style={{ marginTop: '36px' }}>
            <div className="header">
              <span className="title">应用题</span>
            </div>
            {this.renderApplicationScores(problemType)}
            <div className="vote-info">
              共送出 <span className="big-point">{shareVoteCount}</span> 个赞，收获 <span
              className="big-point">{receiveVoteCount}</span> 个赞<br/>
              获得 <span className="big-point">{votedScore}</span> 积分 <span className="tips">（1被赞=2积分）</span>
            </div>
          </div>
          <div className="tips">
            {
              doneAllApps ?
                <span>哇哦！你完成了全部的【应用题】，这是赤裸裸秒杀99%同学的节奏！</span> :
                <span>
                  不要在课程完成后，就放松对这些知识的学习哦！<br/>
                  你还可以在已完成列表中，进入课程补作业<br/>
                  偷偷告诉你：补完的作业依然可以获得积分～
                </span>
            }
          </div>
          <AssetImg className="bottom-icon"
                    url={'https://static.iqycamp.com/images/improvement_report_bottom_icon.png?imageslim'}/>
        </div>
        <FooterButton btnArray={[{ click: () => this.context.router.goBack(), text: '关闭' }]}/>
      </div>
    )
  }

}

// 当前分和总分比
class Progress extends React.Component<any, any> {

  constructor() {
    super()
  }

  calculatePercent(score, total) {
    let tempScore = score / total
    if(isNumber(tempScore)) {
      tempScore = tempScore < 0 ? 0 : tempScore > 1 ? 1 : tempScore
      tempScore = numeral(tempScore * 100).format('0.00')
    } else {
      tempScore = 0
    }
    return tempScore
  }

  render() {
    const { holderClass, score, totalScore, problemTypeClass } = this.props
    console.log('problemclass', problemTypeClass)
    let progressStyle = merge({ width: '50%' }, this.props.progressStyle)

    return (
      <div>
        <div className="progress" style={progressStyle}>
          <div className="track"/>
          <div className={`holder ${holderClass && holderClass} ${problemTypeClass}`}
               style={{ width: `${this.calculatePercent(score, totalScore)}%` }}>
          </div>
        </div>
        <span className="score" style={{ width: '65px' }}>
          <span className={`point number ${problemTypeClass}`}>{score}</span>
          &nbsp;/&nbsp;
          <span className="number">{totalScore}</span>
        </span>
      </div>
    )
  }

}
