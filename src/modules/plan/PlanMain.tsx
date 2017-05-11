import * as React from "react";
import {connect} from "react-redux";
import "./PlanMain.less";
import {
  loadPlan,
  loadPlanHistory,
  loadWarmUpNext,
  completePlan,
  closePlan,
  updateOpenRise,
  checkPractice,
  gradeProblem,
  isRiseMember,
  learnKnowledge,
  promote,
  mark
} from "./async";
import {loadProblem} from "../problem/async"
import {startLoad, endLoad, alertMsg} from "redux/actions";
import AssetImg from "../../components/AssetImg";
import Tutorial from "../../components/Tutorial"
import DropChoice from "../../components/DropChoice"
import ProblemViewer from "../problem/components/ProblemViewer"
import {merge, isBoolean, get} from "lodash"
import {Toast, Dialog} from "react-weui"
import {ToolBar} from "./components/ToolBar"
import EventWall from "./EventWall"
const {Alert} = Dialog


const typeMap = {
  1: '巩固练习',
  2: '巩固练习',
  11: '应用练习',
  12: '综合练习',
  21: '小目标',
  31: '知识理解',
  32: '知识回顾',
}

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
      questionList: [
        {
          id: 1,
          subject: "你已完成了本小课的训练<br/>对本小课的学习难度打个分吧",
          choiceList: [
            {
              id: 5,
              subject: "非常难"
            }, {
              id: 4,
              subject: "比较难"
            }, {
              id: 3,
              subject: "适中"
            }, {
              id: 2,
              subject: "较简单"
            }, {
              id: 1,
              subject: "很简单"
            }
          ]
        },
        {
          id: 2,
          subject: "本小课的训练对工作/生活有用吗？",
          choiceList: [
            {
              id: 5,
              subject: "非常实用，大部分能马上应用"
            }, {
              id: 4,
              subject: "较为实用，不少能实际应用"
            }, {
              id: 3,
              subject: "实用性一般，要找找应用场景"
            }, {
              id: 2,
              subject: "不太实用，偶尔能用上"
            }, {
              id: 1,
              subject: "大部分不能应用"
            }
          ]
        }
      ],
      showedPayTip: false,
      nextSeriesModal: {
        buttons: [
          {label: '我不听', onClick: () => this.next(true)},
          {label: '做本节练习', onClick: () => this.setState({showNextSeriesModal: false})}
        ],
      },
      nextModal: {
        buttons: [
          {label: '我不听', onClick: () => this.confirmComplete(true)},
          {label: '好的', onClick: () => this.setState({showNextModal: false})}
        ],
      },


      tabIndex: 0,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  resize() {
    this.setState({
      style: {
        // picWidth:window.innerWidth,
        picHeight: (window.innerWidth / (750 / 350)) > 175 ? 175 : (window.innerWidth / (750 / 350))
      }
    })
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.query.series !== newProps.location.query.series && newProps.location.query.series !== undefined) {
      this.componentWillMount(newProps.location.query.series)
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  riseMemberCheck() {
    const {dispatch, location} = this.props
    return isRiseMember().then(res => {
      if (res.code === 200) {
        this.setState({riseMember: res.msg});
        if (!res.msg) {
          setTimeout(() => {
            this.setState({riseMemberTips: true});
          }, 10)

        }
      } else {
        dispatch(alertMsg(res.msg));
      }
    });
  }

  componentWillMount(id) {
    this.resize();
    const {dispatch, location} = this.props
    const {showedPayTip} = this.state;
    dispatch(startLoad())
    let series;
    if (id !== undefined && !isNaN(id)) {
      series = id
    } else if (location.query.series !== undefined && !isNaN(location.query.series)) {
      series = location.query.series
    }


    if (series) {
      loadPlanHistory(series).then(res => {
        dispatch(endLoad())
        let {code, msg} = res
        if (code === 200 || code === 213) {
          if (msg !== null) {
            this.setState({planData: msg, currentIndex: msg.currentSeries})
            loadProblem(msg.problemId).then(res => {
              let {code, msg} = res
              if (code === 200) {
                this.setState({selectProblem: msg})
              }
            })
          }
          if (code === 213 && !showedPayTip) {
            this.setState({showedPayTip: true});
            dispatch(alertMsg("试用版仅能体验前三节内容 <br/> 点击右上角按钮，升级正式版吧"))
          }
        } else if (code === 212) {
          this.context.router.push({pathname: location.pathname})
          dispatch(alertMsg("先完成这一节的必修任务吧"))
        }
        else dispatch(alertMsg(msg))
      }).then(() => this.riseMemberCheck()).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    } else {
      loadPlan().then(res => {
        dispatch(endLoad())
        let {code, msg} = res
        if (code === 200) {
          if (msg !== null) {
            this.setState({planData: msg, currentIndex: msg.currentSeries})
            loadProblem(msg.problemId).then(res => {
              let {code, msg} = res
              if (code === 200) {
                this.setState({selectProblem: msg})
              }
            })
          } else {
            this.context.router.push({
              pathname: '/rise/static/problem/list'
            })
          }
        }
        else dispatch(alertMsg(msg))
      }).then(() => this.riseMemberCheck()).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    }
  }

  onPracticeSelected(item) {
    const {dispatch} = this.props
    const {planData} = this.state
    const {series, problemId} = planData
    const {type, practicePlanId, planId} = item
    // if (!unlocked) {
    //   dispatch(alertMsg("该训练尚未解锁"))
    //   return
    // }
    checkPractice(series).then(res => {
      const {code, msg} = res
      if (code === 200) {
        // 已完成
        if (type === 1 || type === 2) {
          let integrated = true
          if (type === 1) {
            integrated = false
          }
          if (item.status === 1) {
            this.context ? this.context.router.push({
              pathname: '/rise/static/practice/warmup/analysis',
              query: {practicePlanId, series, integrated}
            }) : null;
          } else {
            this.context ? this.context.router.push({
              pathname: '/rise/static/practice/warmup',
              query: {practicePlanId, series, integrated}
            }) : null;
          }
        } else if (type === 11) {
          this.context ? this.context.router.push({
            pathname: '/rise/static/practice/application',
            query: {id: item.practiceIdList[0], series, integrated: false, planId}
          }) : null;
        } else if (type === 12) {
          this.context ? this.context.router.push({
            pathname: '/rise/static/practice/application',
            query: {id: item.practiceIdList[0], series, integrated: true, planId}
          }) : null;
        } else if (type === 21) {
          this.context ? this.context.router.push({
            pathname: '/rise/static/practice/challenge',
            query: {id: item.practiceIdList[0], series}
          }) : null;
        } else if (type === 31) {
          this.context ? this.context.router.push({
            pathname: '/rise/static/practice/roadmap',
            query: {practicePlanId, series}
          }) : null;
        } else if (type === 32) {
          learnKnowledge(practicePlanId).then(res => {
            const {code, msg} = res
            if (code === 200) {
              this.context ? this.context.router.push({
                pathname: '/rise/static/practice/knowledge/review',
                query: {problemId}
              }) : null;
            }
          })
        }
      } else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(alertMsg(ex))
    })
  }

  nextTask() {
    const {dispatch} = this.props
    loadWarmUpNext().then(res => {
      const {code, msg} = res
      if (code === 200) {
        this.onPracticeSelected(msg)
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  prev() {
    const {dispatch} = this.props
    const {planData} = this.state
    const {series} = planData
    if (series === 1) {
      dispatch(alertMsg("当前已经是第一节训练"))
      return
    }
    this.context.router.push({pathname: this.props.location.pathname, query: {series: series - 1}})

    this.refs.plan.scrollTop = 0
  }

  next(force) {
    const {dispatch} = this.props
    const {planData, currentIndex} = this.state
    const {series, doneCurSeriesApplication, totalSeries} = planData
    const unlocked = get(planData, 'practice[0].unlocked');
    if (series === totalSeries) {
      this.setState({showNextSeriesModal: false});
    } else {
      if (unlocked && !doneCurSeriesApplication && !force) {
        this.setState({showNextSeriesModal: true});
        return;
      }
      this.setState({showNextSeriesModal: false});
      this.context.router.push({pathname: this.props.location.pathname, query: {series: series + 1}})
    }

    this.refs.plan.scrollTop = 0
  }

  complete() {
    const {dispatch} = this.props
    const {selectProblem} = this.state;
    completePlan().then(res => {
      const {code, msg} = res
      if (code === 200) {
        if (msg.iscomplete === true) {
          if (selectProblem.hasProblemScore) {
            // 已经评分
            this.setState({defeatPercent: msg.percent, mustStudyDays: msg.mustStudyDays})
            this.confirmComplete()
          } else {
            // 未评分
            this.setState({showScoreModal: true, defeatPercent: msg.percent, mustStudyDays: msg.mustStudyDays})
          }
        } else {
          dispatch(alertMsg('至少要完成所有知识理解和巩固练习哦'))
        }
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  confirmComplete(force) {
    const {dispatch} = this.props;
    const {planData} = this.state
    const {doneAllIntegrated} = planData
    if (!force && !doneAllIntegrated) {
      this.setState({showCompleteModal: false, showNextModal: true})
      return
    }
    if (!this.state.mustStudyDays) {
      this.setState({showCompleteModal: true, showNextModal: false})
    } else {
      this.setState({showCompleteModal: false, showNextModal: false})
      dispatch(alertMsg(`学得太猛了，再复习一下吧<br/>本小课推荐学习天数至少为${this.state.mustStudyDays}天<br/>之后就可以开启下一小课了`))
    }
  }

  confirmNextPlan() {
    this.setState({showCompleteModal: false, showConfirmModal: true})
  }

  closeCompleteModal() {
    this.setState({showCompleteModal: false})
  }

  closeConfirmModal() {
    this.setState({showConfirmModal: false})
  }

  essenceShare(problemId, series) {
    this.context.router.push({pathname: '/rise/static/practice/subject', query: {id: problemId, series}})
  }

  problemReview(problemId) {
    mark({module: "RISE", function: "打点", action: "查看小课详情", memo: "每日首页"});
    this.setState({showProblem: true})
  }

  nextPlan() {
    const {dispatch} = this.props
    closePlan().then(res => {
      const {code, msg} = res
      if (code === 200) {
        this.context.router.push("/rise/static/problem/priority")
      } else {
        dispatch(alertMsg(msg))
        this.setState({showConfirmModal: false})
      }
    })
  }


  tutorialEnd() {
    const {dispatch} = this.props
    const {planData} = this.state
    updateOpenRise().then(res => {
      const {code, msg} = res
      if (code === 200) {
        this.setState({planData: merge({}, planData, {openRise: true})})
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  openMessageBox() {
    this.context.router.push({pathname: '/rise/static/message/center'})
  }

  submitScore(questionList) {
    const {selectProblem} = this.state;
    const {dispatch} = this.props;
    let problemScores = questionList.map(item => {
      let selectedChoice;
      item.choiceList.forEach(choice => {
        if (choice.selected) {
          selectedChoice = choice.id;
        }
      });
      return {question: item.id, choice: selectedChoice};
    });
    dispatch(startLoad());
    gradeProblem(problemScores, selectProblem.id).then(res => {
      dispatch(endLoad());
      this.setState({showScoreModal: false, selectProblem: merge({}, selectProblem, {hasProblemScore: true})});
      this.confirmComplete()
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex))
    })

  }

  goRiseMemberTips() {
    promote().then(res => {
      window.location.href = `http://${window.location.hostname}/pay/pay`
    })
  }

  goOthers() {
    this.context.router.push({pathname: '/rise/static/problem/priority'})
  }


  changeTab(tabIndex){
    this.setState({tabIndex:tabIndex});
  }

  render() {
    const {planData, showScoreModal, showCompleteModal, showConfirmModal, showProblem, currentIndex, selectProblem, riseMember, riseMemberTips, defeatPercent, showNextModal, showNextSeriesModal} = this.state
    const {
      problem = {}, practice, point, section, chapter, deadline, status, totalSeries, series, openRise, newMessage, completeSeries
    } = planData
    const practiceRender = (list = []) => {
      return list.map((item, index) => {
        return (
          <div key={index} className="practice-card"
               onClick={() => this.onPracticeSelected(item)}>
            <div className="header">
              {item.type === 1 || item.type === 2 ? item.status !== 1 ?
                <AssetImg type="warmup" size={50}/>:
                <AssetImg type="warmup_complete" size={50}/> : null
              }
              {item.type === 11 ? item.status !== 1 ?
                <AssetImg type="application" size={50}/>:
                <AssetImg type="application_complete" size={50}/> : null
              }
              {item.type === 12 ? item.status !== 1 ?
                <AssetImg type="integrated" size={50}/>:
                <AssetImg type="integrated_complete" size={50}/> : null
              }
              {item.type === 21 ? item.status !== 1 ?
                <AssetImg type="challenge" size={50}/>:
                <AssetImg type="challenge_complete" size={50}/> : null
              }
              {item.type === 31 || item.type === 32 ? item.status !== 1 ?
                <AssetImg type="knowledge" size={50}/>:
                <AssetImg type="knowledge_complete" size={50}/> : null
              }
            </div>
            {item.unlocked === false ?
              <div className="locked"><AssetImg type="lock" height={24} width={20}/></div>: null
            }
            <div className="body">
              <div className="title">{typeMap[item.type]}</div>
            </div>
            <div className="footer">
              {item.optional === true ? <AssetImg type="optional" width={25} height={12}/> : null}
              {item.type === 12 ? <AssetImg type="recommend" width={45} height={12}/> : null}
            </div>
          </div>
        )
      })
    }


    return (
      <div>
        <div style={{display:this.state.tabIndex===0?null:'none'}}>
          {showScoreModal ?<DropChoice onSubmit={(questionList)=>this.submitScore(questionList)}
                                       onClose={()=>this.setState({ showCompleteModal: true, showScoreModal: false })}
                                       questionList={this.state.questionList}/>: null}
          <Modal
            header={{replace:true,children:<AssetImg width={107} height={83} url="http://www.iqycamp.com/images/fragment/finish_modal3.png"/>}}
            buttons={[{click:()=>this.confirmNextPlan(),content:"下一小课"},{click:()=>this.closeCompleteModal(),content:"取消"}]}
            show={showCompleteModal}>
            <div className="content">
              <div className="text2">太棒了!</div>
            </div>
            <div className="content2">你完成了本小课</div>
            <div className="content2">
              已得<span className="number">{point}</span>积分
            </div>
            <div className="content2">
              打败了<span className="number">{defeatPercent}%</span>的Riser
            </div>
          </Modal>

          <Modal show={showConfirmModal}
                 buttons={[{click:()=>this.nextPlan(),content:"确定"},{click:()=>this.closeConfirmModal(),content:"取消"}]}>
            <div className="content">
              <div className="text">确定开始新小课吗</div>
              <div className="text">当前小课的巩固练习将无法查看</div>
            </div>
            <div className="content2">
              <div className="text">（PC端应用练习仍然开放）</div>
            </div>
          </Modal>

          <Tutorial show={isBoolean(openRise) && !openRise} onShowEnd={()=>this.tutorialEnd()}/>

          <Modal show={status===3}
                 buttons={[{click:()=>this.nextPlan(),content:"开始新小课"}]}
          >
            <div className="content">
              <div className="text">本小课已到期</div>
            </div>
            <div className="content2">
              <div className="text">登录</div>
              <div className="text">www.iquanwai.com/community</div>
              <div className="text">可继续完成小课/应用练习</div>
            </div>
          </Modal>

          <Alert { ...this.state.nextSeriesModal }
            show={showNextSeriesModal}>
            <div className="global-pre" dangerouslySetInnerHTML={{__html:this.state.planData.alertMsg}}/>
          </Alert>

          <Alert { ...this.state.nextModal }
            show={showNextModal}>
            <div className="global-pre" dangerouslySetInnerHTML={{__html:this.state.planData.alertMsg}}/>
          </Alert>

          <div className="header-img">
            <AssetImg url={problem.pic} style={{height: this.state.style.picHeight, float:'right'}}/>
            <div className="message-box" onClick={this.openMessageBox.bind(this)}>
              { newMessage ?
                <AssetImg type="has_message" height={33} width={33}/>
                : <AssetImg type="no_message" height={33} width={33}/>
              }
            </div>
            {isBoolean(riseMember) && !riseMember ?
              <div className={`trial-tip ${riseMemberTips?'open':''}`} onClick={()=>this.goRiseMemberTips()}>
              </div>: null}
            <div className="plan-guide">
              <div className="section-title">{problem.problem}</div>
              <div className="section">
                <label>已完成:</label> {completeSeries}/{totalSeries}节训练
              </div>
              {riseMember ?<div className="section">
                <label>距关闭:</label> {deadline}天
              </div>: null}
              <div className="section">
                <label>总得分:</label> {point} 分
              </div>
            </div>
          </div>
          <div className="function-menu">
            <div className="left" onClick={() => this.essenceShare(problem.id, series)}>
              <span className="essence"><AssetImg type="essence" height={13} width={19}/></span>
              <span>小课论坛</span>
            </div>
            <div className="right" onClick={() => this.problemReview(problem.id)}>
              <span className="problem_detail"><AssetImg type="problem_detail" height={12} width={14}/></span>
              <span>小课介绍</span>
            </div>
          </div>
          {showProblem ?
            <ProblemViewer readonly="true" problem={selectProblem} closeModal={()=>this.setState({showProblem:false})}
                           viewOtherProblem={this.goOthers.bind(this)}/>
            : <div className="container has-footer" ref={'plan'}
                   style={{height: window.innerHeight - this.state.style.picHeight - 49, backgroundColor: '#f5f5f5'}}>
            <div className="plan-progress">
              <div className="intro">
                <div className="intro-chapter">{chapter}</div>
                <div className="bar"/>
              </div>
              <div className="intro-section">{section}</div>
            </div>
            <div className="plan-main">
              <div className="list">
                {practiceRender(practice)}
              </div>
              <div className="padding-footer"></div>
            </div>
          </div>}
        </div>

        {
          // 活动
          this.state.tabIndex===1?
          <EventWall/>
          :null
        }
        {/*<div className="button-footer">*/}
        <ToolBar index={this.state.tabIndex} tabClick={(tabIndex)=>this.changeTab(tabIndex)}/>
        {/*<div className={`left origin ${series === 1 ? ' disabled' : ''}`} onClick={this.prev.bind(this)}>上一节*/}
        {/*</div>*/}
        {/*{ series !== totalSeries ? <div className={`right`} onClick={()=>this.next()}>下一节</div> : null }*/}
        {/*{ series === totalSeries ? <div className={`right`} onClick={()=>this.complete()}>*/}
        {/*完成训练</div> : null }*/}
        {/*</div>*/}
      </div>
    )
  }
}


class Modal extends React.Component<any,any> {
  constructor(props) {
    super(props);
  }


  render() {
    const renderButton = (buttons = []) => {
      if (!buttons || buttons.length > 2) {
        return null;
      }
      if (buttons.length == 2) {
        return (
          buttons.map((item, key) => {
            return <div className={`${key==0?'left':'right'}`} onClick={()=>item.click()}>{item.content}</div>
          })
        )
      } else {
        return (
          <div className="button" onClick={()=>buttons[0].click()}>{buttons[0].content}</div>
        )
      }
    }

    return (
      this.props.show ?<div className="mask">
        <div className="finished-modal">
          {this.props.header && this.props.header.replace ? this.props.header.children :
            <div className="modal-header">{this.props.header ? this.props.header.children : null}</div>}
          <div className="modal-context">
            {this.props.children}
          </div>
          <div className="modal-button-footer">
            {renderButton(this.props.buttons)}
          </div>
        </div>
      </div>: null
    )
  }
}
