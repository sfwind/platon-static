import * as React from 'react'
import { connect } from 'react-redux'
import './PlanMain.less'
import {
  loadPlan, completePlan, updateOpenRise, markPlan,
  gradeProblem, isRiseMember, learnKnowledge, mark, queryChapterList, closePlan, loadChapterCard, loadChapterCardAccess
} from './async'
import { startLoad, endLoad, alertMsg, set } from 'redux/actions'
import AssetImg from '../../components/AssetImg'
import DropChoice from '../../components/DropChoice'
import { merge, isBoolean, get, isEmpty } from 'lodash'
import { Toast, Dialog } from 'react-weui'
import { Sidebar } from '../../components/Sidebar'
import { NumberToChinese, changeTitle } from '../../utils/helpers'
import SwipeableViews from 'react-swipeable-views'
import Ps from 'perfect-scrollbar'
import 'smooth-scrollbar/dist/smooth-scrollbar.css'
import { mark } from '../../utils/request'
import { ToolBar } from '../base/ToolBar'
const { Alert } = Dialog
var FastClick = require('fastclick')

const typeMap = {
  1: { type: '选择题', desc: '具体场景，牛刀小试' },
  2: { type: '选择题', desc: '具体场景，牛刀小试' },
  11: { type: '应用题', desc: '实际案例，学以致用' },
  12: { type: '应用题', desc: '实际案例，学以致用' },
  21: { type: '小目标', desc: '制定目标，帮你更积极地学习' },
  31: { type: '知识点', desc: '作用、方法、要点、例题' },
  32: { type: '知识回顾', desc: '小课知识点合集' }
}

const FREE_PROBLEM_ID = 9

let printerWaitingTimer = null

@connect(state => state)
export class PlanMain extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      planData: {},
      knowledge: {},
      showScoreModal: false,
      showCompleteModal: false,
      showConfirmModal: false,
      showDoneAll: false,
      currentIndex: 0,
      showProblem: false,
      selectProblem: {},
      defeatPercent: 0,
      expired: false,
      _t: Math.random(),
      questionList: [
        {
          id: 1,
          subject: '你已完成了本小课的训练<br/>对本小课的学习难度打个分吧',
          choiceList: [
            {
              id: 5,
              subject: '非常难'
            }, {
              id: 4,
              subject: '比较难'
            }, {
              id: 3,
              subject: '适中'
            }, {
              id: 2,
              subject: '较简单'
            }, {
              id: 1,
              subject: '很简单'
            }
          ]
        },
        {
          id: 2,
          subject: '本小课的训练对工作/生活有用吗？',
          choiceList: [
            {
              id: 5,
              subject: '非常实用，大部分能马上应用'
            }, {
              id: 4,
              subject: '较为实用，不少能实际应用'
            }, {
              id: 3,
              subject: '实用性一般，要找找应用场景'
            }, {
              id: 2,
              subject: '不太实用，偶尔能用上'
            }, {
              id: 1,
              subject: '大部分不能应用'
            }
          ]
        }
      ],
      showedPayTip: false,
      sidebarOpen: false,
      showExpiredDateWarning: false
    }
    changeTitle('圈外同学')
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  resize() {
    this.setState({
      style: {
        cardWrapperHeight: (window.innerHeight - 197),
        picHeight: (window.innerWidth / (750 / 350)) > 175 ? 175 : (window.innerWidth / (750 / 350)),
        cardTipFontSize: (window.innerWidth / (750 / 28)) > 28 ? 28 : (window.innerWidth / (750 / 28))
      }
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(set('completePracticePlanId', undefined))
    dispatch(set('warmupCurrentIndex', undefined))
    window.removeEventListener('resize', this.resize)
  }

  riseMemberCheck() {
    const { dispatch } = this.props
    return isRiseMember().then(res => {
      if(res.code === 200) {
        this.setState({ riseMember: res.msg })
        if(res.msg != 1) {
          setTimeout(() => {
            this.setState({ riseMemberTips: true })
          }, 10)

        }
      } else {
        dispatch(alertMsg(res.msg))
      }
    })
  }

  componentWillMount(newProps) {
    this.resize()
    const { dispatch, location } = this.props
    let { planId } = location.query
    if(newProps) {
      planId = newProps.location.query.planId
    }
    let blockMsg
    dispatch(startLoad())
    loadPlan(planId).then(res => {
      dispatch(endLoad())
      let { code, msg } = res
      blockMsg = msg
      if(code === 200) {
        if(msg !== null) {
          // 是否是限免小课
          const freeProblem = msg.problemId === FREE_PROBLEM_ID
          this.setState({
            planData: msg,
            currentIndex: msg.currentSeries,
            selectProblem: msg.problem,
            mustStudyDays: msg.mustStudyDays,
            freeProblem
          })
        }
      } else {
        dispatch(alertMsg(msg))
      }
    }).then(() => {
      let completePracticePlanId = this.props.CompleteChapterPracticePlanId
      // 如果当前 redux 存储最近完成的小课是本章的最后一节，则调用接口，获取当前章节卡片
      if(completePracticePlanId) {
        dispatch(set('CompleteChapterPracticePlanId', undefined))
        loadChapterCardAccess(blockMsg.problemId, completePracticePlanId).then(res => {
          if(res.code === 200) {
            if(res.msg) {
              this.setState({ displayCard: true }, () => {
                let printHeaderNode = document.getElementById('print-header')
                if(printHeaderNode) printHeaderNode.style.display = 'none'
              })
              let waitingNode = document.getElementById('printer-waiting')
              if(waitingNode) {
                printerWaitingTimer = setInterval(() => {
                  waitingNode.style.opacity = 1
                  setTimeout(() => {
                    waitingNode.style.opacity = 0
                  }, 500)
                }, 1000)
              }
            }
          }
        }).catch(e => {
          dispatch(alertMsg(e))
        })
        loadChapterCard(blockMsg.problemId, completePracticePlanId).then(res => {
          if(res.code === 200) {
            this.setState({ cardUrl: res.msg }, () => {
              let printHeaderNode = document.getElementById('print-header')
              if(printHeaderNode) printHeaderNode.style.display = ''
              let printAwardNode = document.getElementById('printer-award')
              if(printAwardNode) printAwardNode.style.transform = 'scale(.6, .6)'
              let originNode = document.getElementById('origin')
              if(originNode) originNode.style.opacity = 0
              setTimeout(() => {
                setTimeout(() => {
                  this.setState({ showCard: true })
                }, 300)
                let changedNode = document.getElementById('changed')
                if(changedNode) changedNode.style.opacity = 1
                clearInterval(printerWaitingTimer)
              }, 1000)
            })
          }
        }).catch(e => {
          dispatch(alertMsg(e))
        })
      }
    }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      }
    )
    if(navigator.userAgent.indexOf('WindowsWechat') !== -1) {
      this.setState({ windowsClient: true })
    } else {
      this.setState({ windowsClient: false })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this))
    mark({ module: '打点', function: '首页', action: '打开学习页面' })
    const { planId } = this.props.location.query
    queryChapterList(planId).then(res => {
      if(res.code === 200) {
        this.setState({ chapterList: res.msg }, () => {
          Ps.initialize(this.refs.sideContent, {
            swipePropagation: false,
            handlers: [ 'wheel', 'touch' ]
          })
        })
      }
    })
    FastClick.attach(document.querySelector('.click-btn'))
    isRiseMember().then(res => {
      if(res.code === 200) {
        this.setState({ riseMember: res.msg })
        if(res.msg != 1) {
          setTimeout(() => {
            this.setState({ riseMemberTips: true })
          }, 10)
        }
      }
    })

  }

  riseMemberCheck() {
    const { dispatch } = this.props
    return isRiseMember().then(res => {
      if(res.code === 200) {
        this.setState({ riseMember: res.msg })
        if(res.msg != 1) {
          setTimeout(() => {
            this.setState({ riseMemberTips: true })
          }, 10)
        }
      }
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
      if(lockedStatus === -2) {
        dispatch(alertMsg('试用版仅能体验前三节内容 <br/> 点击右上角按钮，升级正式版吧'))
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
      this.context ? this.context.router.push({
        pathname: '/rise/static/practice/warmup',
        query: { practicePlanId, currentIndex, integrated, planId, complete }
      }) : null
    } else if(type === 11) {
      dispatch(set('otherApplicationPracticeSubmitId', undefined))
      dispatch(set('applicationId', undefined))
      dispatch(set('articlePage', undefined))
      this.context ? this.context.router.push({
        pathname: '/rise/static/practice/application',
        query: { id: item.practiceIdList[ 0 ], practicePlanId, currentIndex, integrated: false, planId, complete }
      }) : null
    } else if(type === 12) {
      dispatch(set('otherApplicationPracticeSubmitId', undefined))
      dispatch(set('applicationId', undefined))
      dispatch(set('articlePage', undefined))
      this.context ? this.context.router.push({
        pathname: '/rise/static/practice/application',
        query: { id: item.practiceIdList[ 0 ], practicePlanId, currentIndex, integrated: true, planId, complete }
      }) : null
    } else if(type === 21) {
      this.context ? this.context.router.push({
        pathname: '/rise/static/practice/challenge',
        query: { id: item.practiceIdList[ 0 ], practicePlanId, currentIndex, planId, complete }
      }) : null
    } else if(type === 31) {
      if(!complete) {
        // 关闭tutorial
        if(!openRise) {
          updateOpenRise()
        }

        learnKnowledge(practicePlanId).then(res => {
          const { code, msg } = res
          if(code === 200) {
            this.context ? this.context.router.push({
              pathname: '/rise/static/practice/knowledge',
              query: { practicePlanId, currentIndex, planId, complete }
            }) : null
          }
        })
      } else {
        this.context ? this.context.router.push({
          pathname: '/rise/static/practice/knowledge',
          query: { practicePlanId, currentIndex, planId, complete }
        }) : null
      }
    } else if(type === 32) {
      if(!complete) {
        learnKnowledge(practicePlanId).then(res => {
          const { code, msg } = res
          if(code === 200) {
            this.context ? this.context.router.push({
              pathname: '/rise/static/practice/knowledge/review',
              query: { problemId, planId, currentIndex, practicePlanId, complete }
            }) : null
          }
        })
      } else {
        this.context ? this.context.router.push({
          pathname: '/rise/static/practice/knowledge/review',
          query: { problemId, planId, currentIndex, practicePlanId, complete }
        }) : null
      }
    }
  }

  handleClickGoReport() {
    const { planId } = this.props.location.query
    this.context.router.push({
      pathname: '/rise/static/plan/report',
      query: { planId: planId }
    })
  }

  handleClickUnComplete() {
    const { dispatch } = this.props
    dispatch(alertMsg(`先完成所有的知识点和选择题<br/>才能查看报告哦`))
  }

  handleClickUnMinStudy() {
    const { dispatch } = this.props
    const { mustStudyDays } = this.state
    dispatch(alertMsg(`学得太猛了，再复习一下吧<br/>本小课推荐学习天数至少为${mustStudyDays}天<br/>之后就可以开启下一小课了`))
  }

  handleClickUnReport() {
    const { dispatch } = this.props
    dispatch(alertMsg('糟糕，你的知识点和选择题部分未完成，无法得出学习报告'))
  }

  complete() {
    const { dispatch, location } = this.props
    const { planData = {} } = this.state
    const { planId } = location.query
    const { status, reportStatus } = planData
    dispatch(startLoad())
    closePlan(planId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        // 设置完成
        if(planData.hasProblemScore) {
          // 已经评分
          this.confirmComplete()
          this.setState({ planData: merge({}, planData, { reportStatus: 3 }) })
        } else {
          // 未评分
          this.setState({
            showScoreModal: true,
            defeatPercent: msg.percent,
            mustStudyDays: msg.mustStudyDays,
            planData: merge({}, planData, { reportStatus: 3 })
          })
        }
      } else {
        if(code === -1) {
          dispatch(alertMsg(`先完成所有的知识点和选择题<br/>才能查看报告哦`))
        } else {
          dispatch(alertMsg(msg))
        }
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  confirmComplete() {
    const { dispatch, location } = this.props
    const { planData, mustStudyDays } = this.state
    const { planId } = location.query
    this.context.router.push({
      pathname: '/rise/static/plan/report',
      query: { planId: planId }
    })
  }

  confirmNextPlan() {
    this.setState({ showCompleteModal: false, showConfirmModal: true })
  }

  closeCompleteModal() {
    this.setState({ showCompleteModal: false })
  }

  closeConfirmModal() {
    this.setState({ showConfirmModal: false })
  }

  essenceShare(problemId, series) {
    mark({ module: '打点', function: '首页', action: '打开延伸学习', memo: '首页' })
    this.context.router.push({ pathname: '/rise/static/problem/extension', query: { problemId: problemId, series } })
  }

  problemReview(problemId) {
    mark({ module: '打点', function: '首页', action: '打开小课介绍', memo: problemId })
    this.context.router.push({ pathname: '/rise/static/plan/view', query: { id: problemId, show: true } })
  }

  goCardsCollection(problemId) {
    mark({ module: '打点', function: '首页', action: '打开小课卡包', memo: problemId })
    this.context.router.push({
      pathname: '/rise/static/problem/cards',
      query: { planId: this.props.location.query.planId }
    })
  }

  goReport() {
    const { planData = {} } = this.state
    const { status, reportStatus } = planData
    if(reportStatus === 3) {
      this.context.router.push({
        pathname: '/rise/static/plan/report',
        query: this.props.location.query
      })
    } else {
      this.context.router.push({
        pathname: '/rise/static/problem/explore'
      })
    }

  }

  onTransitionEnd() {
    const { location } = this.props
    const { planId } = location.query
    const { currentIndex } = this.state
    markPlan(currentIndex, planId)
  }

  tutorialEnd() {
    const { dispatch } = this.props
    const { planData } = this.state
    updateOpenRise().then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({ planData: merge({}, planData, { openRise: true }) })
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  openMessageBox() {
    this.context.router.push({ pathname: '/rise/static/message/center' })
  }

  submitScore(questionList) {
    const { selectProblem, planData } = this.state
    const { dispatch } = this.props
    let problemScores = questionList.map(item => {
      let selectedChoice
      item.choiceList.forEach(choice => {
        if(choice.selected) {
          selectedChoice = choice.id
        }
      })
      return { question: item.id, choice: selectedChoice }
    })
    dispatch(startLoad())
    gradeProblem(problemScores, selectProblem.id).then(res => {
      dispatch(endLoad())
      this.setState({ showScoreModal: false, planData: merge({}, planData, { hasProblemScore: true }) }, () => {
          this.confirmComplete()
        }
      )
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })

  }

  goRiseMemberTips() {
    mark({ module: '打点', function: '首页', action: '点击升级专业版按钮', memo: '首页' }).then(() => {
      window.location.href = `https://${window.location.hostname}/pay/pay`
    })
  }

  onSetSidebarOpen(open) {
    const { currentIndex = 1 } = this.state
    this.setState({ sidebarOpen: open }, () => this.updateSectionChoose(currentIndex))
  }

  goSection(series) {
    if(series <= 0) {
      return
    }
    this.setState({ currentIndex: series }, () => this.updateSectionChoose(series))
  }

  updateSectionChoose(series) {
    let section = this.refs.sideContent.querySelector(`#section${series}`)
    let sectionArr = this.refs.sideContent.querySelectorAll('.section')
    for(let i = 0; i < sectionArr.length; i++) {
      sectionArr[ i ].setAttribute('class', 'section')
    }
    if(section) {
      section.setAttribute('class', 'section open')
    }
  }

  onClickProblemChoose() {
    this.context.router.push({
      pathname: '/rise/static/problem/explore'
    })
  }

  render() {
    const {
      currentIndex, planData, showScoreModal, bgList,
      selectProblem, riseMember, riseMemberTips, chapterList, expired, _t
    } = this.state
    const { location, completePracticePlanId, dispatch } = this.props
    const {
      problem = {}, sections = [], point, deadline, status, totalSeries, openRise, completeSeries, reportStatus, free
    } = planData

    const completePracticeRender = (item) => {
      if(item.status !== 1) {
        return null
      }
      if(completePracticePlanId && completePracticePlanId == item.practicePlanId) {
        return (
          <div className="practice-complete">
            <img src={`https://static.iqycamp.com/images/complete_practice.gif?_t=${_t}`} width={50}/>
          </div>
        )
      } else {
        return (
          <div className="practice-complete">
            <AssetImg type="complete" size={50}/>
          </div>
        )
      }

    }

    const practiceRender = (list = []) => {
      if(!list) {
        return null
      } else {
        return list.map((item, index) => {
          return (
            <div key={index} className="practice-card"
                 onClick={() => this.onPracticeSelected(item)}>
              <div className="header">
                <div className="practice-thumb">
                  {item.type === 1 || item.type === 2 ? item.status !== 1 ?
                    <AssetImg type="warmup" size={50}/> :
                    <AssetImg type="warmup_complete" size={50}/> : null
                  }
                  {item.type === 11 || item.type === 12 ? item.status !== 1 ?
                    <AssetImg type="application" size={50}/> :
                    <AssetImg type="application_complete" size={50}/> : null
                  }
                  {item.type === 21 ? item.status !== 1 ?
                    <AssetImg type="challenge" size={50}/> :
                    <AssetImg type="challenge_complete" size={50}/> : null
                  }
                  {item.type === 31 || item.type === 32 ? item.status !== 1 ?
                    <AssetImg type="knowledge" size={50}/> :
                    <AssetImg type="knowledge_complete" size={50}/> : null
                  }
                </div>
                {
                  completePracticeRender(item)
                }

              </div>
              {item.unlocked === false ?
                <div className="locked"><AssetImg type="lock" height={24} width={20}/></div> : null
              }
              <div className="body">
                <div className="title">{typeMap[ item.type ].type}</div>
                <div className="desc">{typeMap[ item.type ].desc}</div>
              </div>
              <div className="footer">
                {item.optional === true ? <AssetImg type="optional" width={25} height={12}/> : null}
              </div>
            </div>
          )
        })
      }

    }

    const renderSidebar = () => {
      return (
        <div className="plan-side-bar">
          <div className="side-header-title">
            <span className="content"
                  style={{ width: `${window.innerWidth * 0.7 - 20}` }}>{selectProblem.problem}</span>
          </div>

          <div ref="sideContent" className="side-content"
               style={{
                 height: `${window.innerHeight - 50 - 75}px`,
                 width: `${window.innerWidth * 0.7}px`,
                 overflow: 'hidden',
                 position: 'relative'
               }}>

            <div className="chapter-area">
              <div className="cell">
                <div className="chapter" onClick={() => this.problemReview(problem.id)}>小课介绍</div>
              </div>
            </div>
            <div className="chapter-area">
              <div className="cell">
                <div className="chapter" onClick={() => this.essenceShare(problem.id, currentIndex)}>延伸学习</div>
              </div>
            </div>

            {chapterList ? chapterList.map((item, key) => {
              return (
                <div key={key} className={`chapter-area`}>
                  <div className="cell">
                    <div className="chapter">
                      <div>
                        <div className="label">{'第' + NumberToChinese(item.chapterId) + '章'}</div>
                        <div className="str"
                             style={{ maxWidth: `${window.innerWidth * 0.7 - 50}px` }}>{item.chapter}</div>
                      </div>
                    </div>
                    {item.sectionList.map((section, index) => {
                      return (
                        <div id={`section${section.series}`}
                             className={`${currentIndex === section.series ? 'open' : ''} section`}
                             onClick={() => {
                               this.goSection(section.series)
                             }} key={index}>
                          <div>
                            <div className="label">{item.chapterId}.{section.sectionId}</div>
                            <div className="str"
                                 style={{ maxWidth: `${window.innerWidth * 0.7 - 50}px` }}>{section.section}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }) : null}
          </div>
        </div>
      )
    }

    const renderBtnHeader = () => {
      let lastBtn = null
      let preSection = null
      if(currentIndex === 1) {
        preSection = (
          <div className="psbf-w-pre-btn disabled">
            上一节
          </div>
        )
      } else {
        preSection = (
          <div className="click-btn" onClick={() => {this.goSection(currentIndex - 1)}}>
            <div className="psbf-w-pre-btn">
              上一节
            </div>
          </div>
        )
      }
      if(currentIndex === totalSeries) {
        // 对最后一个按钮的渲染
        if(reportStatus === 1) {
          // 可以点击完成按钮
          lastBtn = (
            <div className="click-btn" onClick={() => this.complete()}>
              <div className="psbf-w-next-btn complete">
                完成小课
              </div>
            </div>
          )
        } else if(reportStatus === 3) {
          // 已经完成，直接打开学习报告
          lastBtn = (
            <div className="click-btn" onClick={() => this.handleClickGoReport()}>
              <div className="psbf-w-next-btn report">
                学习报告
              </div>
            </div>
          )
        } else if(reportStatus === 2) {
          // 未完成最小学习天数
          lastBtn = (
            <div className="click-btn" onClick={() => this.handleClickUnMinStudy()}>
              <div className="psbf-w-next-btn complete disabled">
                完成小课
              </div>
            </div>
          )
        } else if(reportStatus === -2) {
          // 没有完成，需要先完成
          lastBtn = (
            <div className="click-btn" onClick={() => this.handleClickUnComplete()}>
              <div className="psbf-w-next-btn complete disabled">
                完成小课
              </div>
            </div>
          )
        } else if(reportStatus === -1) {
          // 开放时间没完成，不能查看学习报告
          lastBtn = (
            <div className="click-btn" onClick={() => this.handleClickUnReport()}>
              <div className="psbf-w-next-btn complete disabled">
                学习报告
              </div>
            </div>
          )
        } else {
          // 默认去调用一下complete接口
          lastBtn = (
            <div className="click-btn" onClick={() => this.complete()}>
              <div className="psbf-w-next-btn complete">
                完成小课
              </div>
            </div>
          )
        }
      } else {
        if(currentIndex !== totalSeries) {
          lastBtn = (
            <div className="click-btn" onClick={() => this.goSection(currentIndex + 1)}>
              <div className="psbf-w-next-btn">
                下一节
              </div>
            </div>
          )
        }
      }

      let currentSection = sections[ currentIndex - 1 ]
      return (
        <div className="plan-study-btn-footer" id="plan-study-btn-footer">
          <div className="psbf-wrapper">
            <div className="psbf-w-pre-wrapper">
              {preSection}
            </div>
            <div className="psbf-w-next-wrapper">
              {lastBtn}
            </div>

            {
              currentSection ?
                <div className="psbf-w-series-wrapper">
                  <span>{'第' + NumberToChinese(currentSection.chapter) + '章'}{'、 '}{currentSection.chapterName}</span>
                  <br/>
                  <span>{currentSection.chapter + '.' + currentSection.section}{' '}{currentSection.name}</span>
                </div> :
                null
            }
          </div>
        </div>
      )
    }

    const renderSection = (item, idx) => {
      return (
        <div key={idx}>
          <div className="plan-main">
            <div className="list">
              {practiceRender(item.practices)}
            </div>
            <div className="padding-footer"/>
          </div>
        </div>)
    }

    const renderDeadline = (deadline) => {
      if(deadline < 0) {
        // 不是会员，不显示
        return null
      } else if(deadline === 0) {
        //是会员 已关闭
        return (
          <div className="section">
            <label>小课已关闭</label>
          </div>
        )
      } else if(deadline > 0) {
        // 是会员 未关闭
        return (
          <div className="section">
            <label>距关闭:</label> {deadline} 天
          </div>
        )
      }
    }

    const renderOtherComponents = () => {
      const alertProps = {
        buttons: [
          { label: '取消', onClick: () => this.setState({ showExpiredDateWarning: false }) },
          {
            label: '确定',
            onClick: () => this.context.router.push(`/rise/static/plan/view?id=${this.state.planData.problemId}`)
          }
        ]
      }
      let others = []
      others.push(
        <Alert show={this.state.showExpiredDateWarning} {...alertProps}>
          <div className="global-pre"
               dangerouslySetInnerHTML={{ __html: '限免小课已到期，请到发现页面再次开启小课' }}/>
        </Alert>
      )
      others.push(<ToolBar/>)
      if(showScoreModal) {
        others.push(<DropChoice onSubmit={(questionList) => this.submitScore(questionList)}
                                onClose={() => this.setState({ showScoreModal: false }, () => {
                                  this.confirmComplete()
                                })}
                                questionList={this.state.questionList}/>)
      }
      return others
    }

    const renderCard = () => {
      let { cardUrl, displayCard, riseMember } = this.state
      let problemId = get(planData, 'problem.id')
      const renderCardBody = () => {
        if(problemId === FREE_PROBLEM_ID && !riseMember) {
          return (
            <div>
              <div className="printer-top">
                <div id="print-header" className="printer-header">
                  <div className="header-left">邀请好友</div>
                  <div className="header-right">一起学习</div>
                </div>
              </div>
              <div className="printer-body">
                <img id="printer-award"
                     src="https://static.iqycamp.com/images/fragment/free_limit_printer_award.png?imageslim"/>
                <div className="share-tip">
                  <div id="origin" className="share-tip-origin">
                    <div className="card-tips">邀请好友一起学习</div>
                    <div className="card-tips small">得50元奖学金</div>
                  </div>
                  <div id="changed" className="share-tip-changed">
                    <div className="step-one">
                      <img src="https://static.iqycamp.com/images/fragment/free_limit_printer_left.jpg?imageslim"
                           alt=""/>
                      <span>长按卡片保存到相册<br/>在朋友圈分享该卡片</span>
                    </div>
                    <div className="step-two">
                      <img src="https://static.iqycamp.com/images/fragment/free_limit_printer_right.jpg?imageslim"
                           alt=""/>
                      <span>6个好友扫码上课<br/>￥50 奖学金 get！</span>
                    </div>
                    <div className="changed-tip">详情见“卡包”页面</div>
                  </div>
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div>
              <div className="printer-top">
                <div className="printer-header">
                  <div className="header-normal">棒！你已完成本章知识学习，获得一张知识卡
                  </div>
                </div>
              </div>
              <div className="printer-body" style={{ height: 95 }}>
                <div className="share-tip-normal">
                  <div className="tip-normal-top">如果觉得有启发，记得分享给好友哦！</div>
                  <div className="tip-normal-bottom">长按卡片保存到相册，在朋友圈分享该卡片</div>
                </div>
              </div>
            </div>
          )
        }
      }

      if(displayCard) {
        return (
          <div className="chapter-card-container">
            <div className="printer-machine" style={{ width: window.innerWidth }}>
              <div className="printer-close" onClick={() => {
                this.setState({ displayCard: false })
              }}>
                <div style={{ display: 'inline-block', float: 'right' }}>
                  <AssetImg type="white_close_btn" size="24px" style={{ float: 'right', marginRight: '10px' }}/>
                </div>
              </div>
              {renderCardBody()}
              <div className="printer-gap"/>
              <div className="printer-port">
                <div className="clear-mg"/>
                <div className="printer-push-port">
                  <div className="mask-port"/>
                  {
                    cardUrl ?
                      <div className="chapter-card-wrapper"
                           style={{ height: `${this.state.style.cardWrapperHeight}px` }}
                           onTouchStart={() => {
                             startTime = new Date()
                           }}
                           onTouchEnd={() => {
                             endTime = new Date()
                             if(endTime.getTime() - startTime.getTime() >= 500) {
                               mark({ module: '打点', function: '弹窗卡片', action: '长按保存' })
                             }
                           }}>
                        <img className={`${this.state.showCard ? 'show' : ''} card-pic`} src={this.state.cardUrl}/>
                      </div> :
                      null
                  }
                </div>
                <div id="printer-waiting" className="printer-waiting"/>
              </div>
              <div className="printer-bottom">
              </div>
            </div>
            <div className="card-mask"/>
          </div>
        )
      } else {
        return null
      }
    }

    return (
      <div className="rise-main">
        {isBoolean(openRise) && !openRise ? <div className="first-open-rise-mask">
          <AssetImg url="https://static.iqycamp.com/images/point_tutorial3.gif" width={150} marginLeft={20}/>
        </div> : null}

        {renderCard()}
        <div>
          <div className="rise-main">
            <Sidebar sidebar={ renderSidebar() }
                     open={this.state.sidebarOpen}
                     onSetOpen={(open) => this.onSetSidebarOpen(open)}
                     trigger={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>
              <div className="header-img" style={{ height: 175, overflow: 'visible' }}>
                <AssetImg url={problem.pic} style={{ height: this.state.style.picHeight, float: 'right' }}/>
                {riseMember != 1 ?
                  <div className={`trial-tip ${riseMemberTips ? 'open' : ''}`}
                       onClick={() => this.goRiseMemberTips()}>
                  </div> : null}
                <div className="plan-guide">
                  <div className="section-title">{problem.problem}</div>
                  <div className="section">
                    <label>已完成:</label> {completeSeries}/{totalSeries}节训练
                  </div>
                  <div className="section">
                    <label>总得分:</label> {point} 分
                  </div>
                  {renderDeadline(deadline)}
                </div>
                <div className="header-card-collection" onClick={() => this.goCardsCollection(problem.id)}>
                  <AssetImg url="https://static.iqycamp.com/images/fragment/card-collection.png?imageslim"
                            width={97} height={85}/>
                </div>
              </div>

              {renderBtnHeader()}
              {!isEmpty(planData) ?
                <div style={{ padding: '0 15px', backgroundColor: '#f5f5f5' }}>
                  <SwipeableViews ref="planSlider" index={currentIndex - 1}
                                  onTransitionEnd={() => this.onTransitionEnd()}
                                  onChangeIndex={(index, indexLatest) => this.goSection(index + 1)}>
                    {sections ? sections.map((item, idx) => {
                      return renderSection(item, idx)
                    }) : null}
                  </SwipeableViews>
                </div>
                : null}
            </Sidebar>
          </div>
        </div>
        {renderOtherComponents()}
      </div>
    )
  }
}
