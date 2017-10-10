import * as React from 'react'
import { connect } from 'react-redux'
import './PlanMain.less'
import {
  loadPlan, completePlan, updateOpenRise, markPlan, hasPrivilege,
  gradeProblem, isRiseMember, learnKnowledge, mark, queryChapterList, closePlan, loadChapterCard, loadChapterCardAccess, loadRecommendations, disCollectProblm, collectProblem
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
let startTime
let endTime

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
      showExpiredDateWarning: false,

      relationTab: 'left',
      relationProblems: []
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
          this.setState({
            planData: msg,
            currentIndex: msg.currentSeries,
            selectProblem: msg.problem,
            mustStudyDays: msg.mustStudyDays
          })
          // 区分加载样式表
          this.handleLoadStyleSheet(msg.problem.catalogId)
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
        let loadCardBeginTime = new Date()
        loadChapterCard(blockMsg.problemId, completePracticePlanId).then(res => {
          let loadCardEndTime = new Date()
          if(res.code === 200) {
            mark({
              module: '打点', function: '首页', action: '等待打印机加载',
              memo: loadCardEndTime.getTime() - loadCardBeginTime.getTime()
            })
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
    })
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
    hasPrivilege().then(res => {
      if(res.code === 200) {
        this.setState({ riseMember: res.msg.riseMember })
        if(res.msg.riseMember != 1) {
          setTimeout(() => {
            this.setState({ riseMemberTips: true })
          }, 10)
        }
      }
    })
  }

  componentDidUpdate() {
    let totalSeries = this.state.planData.totalSeries
    if(totalSeries) {
      for(let i = 0; i < totalSeries; i++) {
        let clickBtns = document.getElementsByClassName(`start-btn${i}`)
        if(clickBtns.length > 0) {
          for(let i = 0; i < clickBtns.length; i++) {
            if(i !== 0) {
              clickBtns[ i ].style.display = 'none'
            }
          }
        }
      }
    }
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
      // 关闭tutorial
      if(!openRise) {
        updateOpenRise()
      }
      if(!complete) {

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
      })
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })

  }

  goRiseMemberTips() {
    mark({ module: '打点', function: '首页', action: '点击升级商学院按钮', memo: '首页' }).then(() => {
      window.location.href = `https://${window.location.hostname}/pay/rise`
    })
  }

  onSetSidebarOpen(open) {
    const { currentIndex = 1 } = this.state
    if(open) {
      let node = document.getElementById('sidebar-content')
      if(node) {
        node.style.left = '70%'
      }
    } else {
      let node = document.getElementById('sidebar-content')
      if(node) {
        node.style.left = '0'
      }
    }
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

  handleLoadStyleSheet(catalogId) {
    // 区分加载样式表
    let node = document.getElementById('rise-main-container')
    if(node) {
      const tempCatalogId = catalogId
      switch(tempCatalogId) {
        case 1:
          node.classList.add('rise-main-container-green')
          require('./PlanMainLessCategory/Green.less')
          break
        case 2:
          node.classList.add('rise-main-container-yellow')
          require('./PlanMainLessCategory/Yellow.less')
          break
        case 3:
          node.classList.add('rise-main-container-orange')
          require('./PlanMainLessCategory/Orange.less')
          break
        case 4:
          node.classList.add('rise-main-container-blue')
          require('./PlanMainLessCategory/Blue.less')
          break
        case 5:
          node.classList.add('rise-main-container-purple')
          require('./PlanMainLessCategory/Purple.less')
          break
        default:
          break
      }
    }
  }

  render() {
    const {
      currentIndex, planData, showScoreModal, selectProblem, riseMember, riseMemberTips, chapterList, _t
    } = this.state
    const { completePracticePlanId } = this.props
    const {
      problem = {}, sections = [], point, totalSeries, reportStatus
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

    const practiceRender = (list = [], sequence) => {
      if(!list) {
        return null
      } else {
        return list.map((item, index) => {
          return (
            <div key={index} className="practice-card"
                 onClick={() => this.onPracticeSelected(item)}>
              <div className="header">
                <div className="practice-thumb">
                  <div className="bottom-platform"/>
                  {item.type === 1 || item.type === 2 ?
                    <div className="warmup" style={{ opacity: `${item.status === 1 ? 0.3 : 1}` }}/> : null}
                  {item.type === 11 || item.type === 12 ?
                    <div className="application" style={{ opacity: `${item.status === 1 ? 0.3 : 1}` }}/> : null}
                  {item.type === 21 ?
                    <div className="challenge" style={{ opacity: `${item.status === 1 ? 0.3 : 1}` }}/> : null}
                  {item.type === 31 || item.type === 32 ?
                    <div className="knowledge" style={{ opacity: `${item.status === 1 ? 0.3 : 1}` }}/> : null}
                </div>
                {completePracticeRender(item)}
              </div>
              {item.unlocked === false ?
                <div className="locked"><AssetImg type="lock" height={24} width={20}/></div> : null}
              <div className="body">
                <div className="title">
                  {typeMap[ item.type ].type}
                  <span style={{ fontSize: 13, color: '#999' }}>{item.optional ? '' : '（必修）'}</span>
                </div>
                <div className="desc">{typeMap[ item.type ].desc}</div>
                {
                  item.status === 1 ?
                    <div className="completed-span">已完成</div> :
                    item.unlocked === true ?
                      <div className={`practice-start-btn start-btn${sequence}`}/> : null
                }
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
                <div className="chapter description" onClick={() => this.problemReview(problem.id)}>
                  <div/>
                  <span>小课介绍</span>
                </div>
              </div>
            </div>
            <div className="chapter-area">
              <div className="cell">
                <div className="chapter extension" onClick={() => this.essenceShare(problem.id, currentIndex)}>
                  <div/>
                  <span>延伸学习</span>
                </div>
              </div>
            </div>

            {chapterList ? chapterList.map((item, key) => {
              return (
                <div key={key} className={`chapter-area`}>
                  <div className="cell">
                    <div className="chapter">
                      <div style={{ whiteSpace: 'nowrap' }}>
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
                          <div style={{ whiteSpace: 'nowrap' }}>
                            <div className="label">{item.chapterId}.{section.sectionId}</div>
                            <div className="str"
                                 style={{ maxWidth: `${window.innerWidth * 0.7 - 70}px` }}>{section.section}</div>
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
          <div className="click-btn">
            <div className="psbf-w-pre-btn disabled">
              上一节
            </div>
          </div>
        )
      } else {
        preSection = (
          <div className="click-btn" onClick={() => {
            this.goSection(currentIndex - 1)
          }}>
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
            <div className="click-btn" onClick={() => this.complete()}>
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
              {practiceRender(item.practices, idx)}
            </div>
            <div className="padding-footer"/>
          </div>
        </div>
      )
    }

    const renderOtherComponents = () => {
      const alertProps = {
        buttons: [
          { label: '取消', onClick: () => this.setState({ showExpiredDateWarning: false }) },
          {
            label: '确定',
            onClick: () => {this.context.router.push(`/rise/static/plan/view?id=${this.state.planData.problemId}`)}
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
        if(problemId === FREE_PROBLEM_ID && riseMember === -1) {
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
                      <img src="https://static.iqycamp.com/images/fragment/free_limit_printer_left_3.jpg?imageslim"/>
                      <span>长按下方卡片<br/>发送给朋友</span>
                    </div>
                    <div className="step-two">
                      <img src="https://static.iqycamp.com/images/fragment/free_limit_printer_right.jpg?imageslim"/>
                      <span>6人扫码完成课前测试<br/>￥50 奖学金 get！</span>
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
                  <div className="tip-normal-top">如果觉得有启发</div>
                  <div className="tip-normal-bottom">长按下方卡片，分享给好友哦！</div>
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
              <div className="printer-bottom"/>
            </div>
            <div className="card-mask"/>
          </div>
        )
      } else {
        return null
      }
    }

    const renderProblemLearn = () => {
      return (
        <section>
          {renderBtnHeader()}
          {!isEmpty(planData) ?
            <div style={{ backgroundColor: '#FFF' }}>
              <SwipeableViews ref="planSlider" index={currentIndex - 1}
                              onTransitionEnd={() => this.onTransitionEnd()}
                              onChangeIndex={(index, indexLatest) => this.goSection(index + 1)}>
                {sections ? sections.map((item, idx) => {
                  return renderSection(item, idx)
                }) : null}
              </SwipeableViews>
            </div> : null}
        </section>
      )
    }

    return (
      <div className="rise-main-container" id="rise-main-container">
        {renderCard()}
        <Sidebar
          sidebar={ renderSidebar() } open={this.state.sidebarOpen}
          contentClassName="sidebar-content" contentId="sidebar-content"
          onSetOpen={(open) => this.onSetSidebarOpen(open)}
          trigger={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>
          <div className="header-img">
            <div className="back-img"/>
            <div className="outline" onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>
              <span>提纲</span>
            </div>
            <div className="card-collection" onClick={() => this.goCardsCollection(problem.id)}>
              <span>卡包</span>
            </div>
            {riseMember !== 1 ?
              <div className={`trial-tip ${riseMemberTips ? 'open' : ''}`}
                   onClick={() => this.goRiseMemberTips()}>
              </div> :
              null}
            <div className="section-title">{problem.problem}</div>
            <div className="section">总得分：{point} 分</div>
          </div>
          {renderProblemLearn()}
        </Sidebar>
        {renderOtherComponents()}
      </div>
    )
  }
}
