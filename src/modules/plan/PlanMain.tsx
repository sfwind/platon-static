import * as React from "react";
import {connect} from "react-redux";
import "./PlanMain.less";
import { loadPlan, completePlan, closePlan, updateOpenRise, markPlan,
  gradeProblem, isRiseMember, learnKnowledge, mark, queryChapterList} from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import AssetImg from "../../components/AssetImg";
import Tutorial from "../../components/Tutorial"
import DropChoice from "../../components/DropChoice"
import {merge, isBoolean, get, isEmpty} from "lodash"
import {Toast, Dialog} from "react-weui"
import {ToolBar} from "../base/ToolBar"
import {Sidebar} from '../../components/Sidebar';
import { NumberToChinese,changeTitle } from "../../utils/helpers"
import SwipeableViews from 'react-swipeable-views';
import Ps from 'perfect-scrollbar'
import 'smooth-scrollbar/dist/smooth-scrollbar.css'
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
      expired:false,
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
      // nextSeriesModal: {
      //   buttons: [
      //     {label: '我不听', onClick: () => this.next(true)},
      //     {label: '做本节练习', onClick: () => this.setState({showNextSeriesModal: false})}
      //   ],
      // },
      nextModal: {
        buttons: [
          {label: '我不听', onClick: () => this.confirmComplete(true)},
          {label: '好的', onClick: () => this.setState({showWarningModal: false})}
        ],
      },

      sidebarOpen:false,
      showEmptyPage: false,
    }

    changeTitle('RISE');
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

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    const { planId } = this.props.location.query;
    queryChapterList(planId).then(res=>{
      if(res.code === 200){
        this.setState({chapterList:res.msg},()=>{
          // this.scrollbar = Scrollbar.init(this.refs.sideContent,{overscrollEffect:'bounce'});
          Ps.initialize(this.refs.sideContent,{
            swipePropagation:false,
            handlers:[ 'wheel', 'touch']
          });
        });
      }
    })
  }

 componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  riseMemberCheck() {
    const {dispatch} = this.props
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

  componentWillMount(newProps) {
    this.resize();
    const {dispatch, location} = this.props

    let {planId} = location.query
    if(newProps){
        planId = newProps.location.query.planId
    }

    dispatch(startLoad())
    loadPlan(planId).then(res => {
      dispatch(endLoad())
      let {code, msg} = res
      if (code === 200) {
        if (msg !== null) {
          this.setState({planData: msg, currentIndex: msg.currentSeries, selectProblem:msg.problem})
          //从微信菜单按钮进入且已过期，弹出选新小课弹窗
          if(location.pathname === '/rise/static/plan/main' && msg.status === 3) {
             this.setState({expired:true})
          }
        } else {
          // 当点击导航栏进入学习页面，如果当前无小课，展示空页面
          if(location.pathname === '/rise/static/learn') {
            this.setState({
              showEmptyPage: true
            })
          } else {
            this.context.router.push({
              pathname: '/rise/static/welcome'
            })
          }
        }
      }
      else dispatch(alertMsg(msg))
    }).then(() => this.riseMemberCheck()).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))}
    )
    if(navigator.userAgent.indexOf('WindowsWechat') !== -1){
        this.setState({windowsClient:true})
    }else{
        this.setState({windowsClient:false})
    }
  }

  componentWillReceiveProps(newProps){
      if (this.props.location.pathname !== newProps.location.pathname) {
          this.componentWillMount(newProps)
      }
  }

  onPracticeSelected(item) {
    const {dispatch} = this.props
    const {planData, currentIndex} = this.state
    const {problemId, lockedStatus} = planData
    const {type, practicePlanId, planId, unlocked} = item

    if(!unlocked){
      if(lockedStatus===-1){
        dispatch(alertMsg('完成之前的任务，这一组才能解锁<br> 学习和内化，都需要循序渐进哦'))
      }
      if(lockedStatus===-2){
        dispatch(alertMsg('试用版仅能体验前三节内容 <br/> 点击右上角按钮，升级正式版吧'))
      }
      if(lockedStatus===-3){
        dispatch(alertMsg('抱歉哦，课程开放期间，你未能完成前面的练习，导致这个练习无法解锁'))
      }
      return
    }
    //已解锁状态
    if (type === 1 || type === 2) {
      let integrated = true
      if (type === 1) {
        integrated = false
      }
      if (item.status === 1) {
        this.context ? this.context.router.push({
              pathname: '/rise/static/practice/warmup/analysis',
              query: { practicePlanId, currentIndex, integrated ,planId}
            }):null;
      } else {
        this.context?this.context.router.push({
              pathname: '/rise/static/practice/warmup',
              query: { practicePlanId, currentIndex, integrated ,planId}
            }):null;
      }
    } else if (type === 11) {
      this.context ? this.context.router.push({
            pathname: '/rise/static/practice/application',
            query: {id: item.practiceIdList[0], currentIndex, integrated: false, planId}
          }) : null;
    } else if (type === 12) {
      this.context ? this.context.router.push({
            pathname: '/rise/static/practice/application',
            query: {id: item.practiceIdList[0], currentIndex, integrated: true, planId}
          }) : null;
    } else if (type === 21) {
      this.context ? this.context.router.push({
            pathname: '/rise/static/practice/challenge',
            query: { id: item.practiceIdList[0], currentIndex ,planId}
          }):null;
    } else if (type === 31) {
      this.context ? this.context.router.push({
            pathname: '/rise/static/practice/knowledge',
            query: {practicePlanId, currentIndex,planId}
          }) : null;
    } else if (type === 32) {
      learnKnowledge(practicePlanId).then(res => {
        const {code, msg} = res
        if (code === 200) {
          this.context ? this.context.router.push({
                pathname: '/rise/static/practice/knowledge/review',
                query: {problemId,planId}
              }) : null;
        }
      })
    }
  }

  complete() {
    const { dispatch,location } = this.props
    const { planData } = this.state;
    const {planId} = location.query
    completePlan(planId).then(res => {
      const { code, msg } = res
      if (code === 200) {
        if (msg.iscomplete) {
          if (planData.hasProblemScore) {
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
    const {planData, mustStudyDays} = this.state
    const {doneAllIntegrated} = planData
    if (!force && !doneAllIntegrated) {
      this.setState({showCompleteModal: false, showWarningModal: true})
      return
    }
    if (!mustStudyDays) {
        this.setState({showCompleteModal: true, showWarningModal: false})
    } else {
      this.setState({showCompleteModal: false, showWarningModal: false})
      dispatch(alertMsg(`学得太猛了，再复习一下吧<br/>本小课推荐学习天数至少为${mustStudyDays}天<br/>之后就可以开启下一小课了`))
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
    mark({module:"RISE",function:"打点",action:"打开小课介绍",memo:problemId});
    this.context.router.push({pathname: '/rise/static/problem/view', query: {id: problemId, show: true}});
  }

  nextPlan() {
    const { dispatch,location } = this.props
    const {planId} = location.query
    closePlan(planId).then(res => {
      const { code, msg } = res
      if (code === 200) {
        this.context.router.push("/rise/static/problem/explore")
      } else {
        dispatch(alertMsg(msg))
        this.setState({showConfirmModal: false})
      }
    })
  }

  onTransitionEnd(){
      const {location} = this.props
      const {planId} = location.query
      const {currentIndex} = this.state
      markPlan(currentIndex, planId)
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
    const {selectProblem, planData} = this.state;
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
      this.setState({showScoreModal: false, selectProblem: merge({}, planData, {hasProblemScore: true})});
      this.confirmComplete()
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex))
    })

  }

  goRiseMemberTips(){
    mark({module:"RISE",function:"升级专业版",action:"点击升级专业版按钮"}).then(() =>{
      window.location.href = `https://${window.location.hostname}/pay/pay`
    })
  }

  onSetSidebarOpen(open){
    const {currentIndex = 1} = this.state;
    this.setState({sidebarOpen:open},()=>this.updateSectionChoose(currentIndex));
  }

  goSection(series) {
    this.setState({currentIndex:series},()=>this.updateSectionChoose(series));
  }

  updateSectionChoose(series){
    let section = this.refs.sideContent.querySelector(`#section${series}`);
    let sectionArr = this.refs.sideContent.querySelectorAll('.section');
    for(let i=0; i< sectionArr.length;i++){
      sectionArr[i].setAttribute('class','section');
    }
    section.setAttribute('class','section open');
  }

  onClickProblemChoose() {
    this.context.router.push({
      pathname: '/rise/static/problem/explore'
    })
  }

  render() {
    const { currentIndex, planData,showScoreModal, showCompleteModal, showConfirmModal, windowsClient, showEmptyPage,
        selectProblem,riseMember,riseMemberTips,defeatPercent,showWarningModal, chapterList,expired } = this.state
    const {location} = this.props
    const {
      problem = {}, sections = [], point, deadline, status, totalSeries, openRise, completeSeries
    } = planData
    const practiceRender = (list = []) => {
      if (!list) {
        return null
      } else {
        return list.map((item, index) => {
          return (
            <div key={index} className="practice-card"
                 onClick={() => this.onPracticeSelected(item)}>
              <div className="header">
                {item.type === 1 || item.type === 2 ? item.status !== 1 ?
                  <AssetImg type="warmup" size={50}/> :
                  <AssetImg type="warmup_complete" size={50}/> : null
                }
                {item.type === 11 ? item.status !== 1 ?
                  <AssetImg type="application" size={50}/> :
                  <AssetImg type="application_complete" size={50}/> : null
                }
                {item.type === 12 ? item.status !== 1 ?
                  <AssetImg type="integrated" size={50}/> :
                  <AssetImg type="integrated_complete" size={50}/> : null
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
              {item.unlocked === false ?
                <div className="locked"><AssetImg type="lock" height={24} width={20}/></div> : null
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

    }

    const renderSidebar = () => {
      return (
        <div className="plan-side-bar">
          <div className="side-header-title">
            <span className="content" style={{width: `${window.innerWidth * 0.7 - 20}`}}>{selectProblem.problem}</span>
          </div>

          <div ref="sideContent" className="side-content" style={{
            height: `${window.innerHeight - 50 - 75}px`,
            width: `${window.innerWidth * 0.7}px`,
            overflow: 'hidden',
            position: 'relative'
          }}>
            {chapterList ? chapterList.map((item, key) => {
              return (
                <div key={key} className={`chapter-area`}>
                  <div className="cell">
                    <div className="chapter">
                      <div>
                        <div className="label">{NumberToChinese(item.chapterId)}、</div>
                        <div className="str"
                             style={{maxWidth: `${window.innerWidth * 0.7 - 50}px`}}>{item.chapter}</div>
                      </div>
                    </div>
                    {item.sectionList.map((section, index) => {
                      return (
                        <div id={`section${section.series}`}
                             className={`${currentIndex === section.series ? 'open' : ''} section`}
                             onClick={() => {
                               this.goSection(section.series);
                             }} key={index}>
                          <div>
                            <div className="label">{item.chapterId}.{section.sectionId}</div>
                            <div className="str"
                                 style={{maxWidth: `${window.innerWidth * 0.7 - 50}px`}}>{section.section}</div>
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

    const renderSection = (item, idx) => {
      return (
        <div key={idx}>
          <div className="plan-progress">
            <div className="intro">
              <div className="intro-chapter">{NumberToChinese(item.chapter)}{'、 '}{item.chapterName}</div>
              <div className="bar"/>
            </div>
            <div className="intro-section">{item.chapter + '.' + item.section}{' '}{item.name}</div>
          </div>
          <div className="plan-main">
            <div className="list">
              {practiceRender(item.practices)}
            </div>
            {windowsClient?
              <div className="submit-btn-footer">
                  <div className={`left origin ${item.series === 1 ? ' disabled' : ''}`} onClick={()=>this.goSection(item.series-1)}>上一节
                  </div>
                  { item.series !== totalSeries ? <div className={`right`} onClick={()=>this.goSection(item.series+1)}>下一节</div> : null }
                  { item.series === totalSeries ? <div className={`right`} onClick={()=>this.complete()}>
                          完成小课</div> : null }
              </div>
            : null}
            { item.series === totalSeries && !windowsClient?
                <div className="submit-btn-footer" onClick={()=>this.complete()}>完成小课</div>:null}
            <div className="padding-footer"></div>
          </div>
      </div>)
    }

    return (
      <div className="rise-main">
        <ToolBar />
        {showScoreModal ?<DropChoice onSubmit={(questionList)=>this.submitScore(questionList)}
                                     onClose={()=>this.setState({ showCompleteModal: true, showScoreModal: false })}
                                     questionList={this.state.questionList}/>: null}
        <Modal
          header={{replace:true,children:<AssetImg width={107} height={83} url="https://www.iqycamp.com/images/fragment/finish_modal3.png"/>}}
          buttons={[{click:()=>this.confirmNextPlan(),content:"下一小课"},{click:()=>this.closeCompleteModal(),content:"取消"}]}
          show={showCompleteModal}>
          <div className="content">
            <div className="text2">太棒了</div>
          </div>
          <div className="content2">你已完成该小课的必做练习</div>
          <div className="content2">
            获得了<span className="number">{point}</span>积分，打败了<span>{defeatPercent}%</span>的Riser
          </div>
          <div className="content2">在已完成中可以再次复习</div>
        </Modal>

        <Modal show={showConfirmModal}
               buttons={[{click:()=>this.nextPlan(),content:"确定"},{click:()=>this.closeConfirmModal(),content:"取消"}]}>
          <div className="content" style={{marginTop:75}}>
            <div className="text">确定开始下一小课吗？</div>
          </div>
          <div className="content2">
            <div className="text2">当前小课可以进入我的-我的小课中复习</div>
          </div>
        </Modal>

        <Tutorial show={isBoolean(openRise) && !openRise} onShowEnd={() => this.tutorialEnd()}/>

        <Modal show={expired}
               buttons={[{click: () => this.nextPlan(), content: "开始新小课"}]}
        >
            <div className="content">
                <div className="text">糟糕！好久没学，小课到期了！</div>
            </div>
            <div className="content2">
                <div className="text">你完成了<span className="number">{completeSeries}</span>节</div>
                <div className="text">获得了<span className="number">{point}</span>积分</div>
            </div>
        </Modal>

        <Alert { ...this.state.nextModal }
            show={showWarningModal}>
            <div className="global-pre" dangerouslySetInnerHTML={{__html: "提升能力和解决问题<br/>需要你的刻意练习<br/>我们推荐你至少完成所有综合练习"}}/>
        </Alert>

        <div>
          {showEmptyPage ? (
            <div>
              <div className="empty-container">
                <div className="empty-img">
                  <AssetImg url="http://www.iqycamp.com/images/plan_empty.png" style={{height: '150'}}/>
                </div>
                <div className="empty-text">
                  <span>没有正在学习的小课哦，</span><br/>
                  <span>点击按钮去选课吧！</span>
                </div>
                <div className="empty-button"><span onClick={this.onClickProblemChoose.bind(this)}>去选课</span></div>
              </div>
            </div>
          ) : (
            <div className="rise-main">
              <Sidebar sidebar={ renderSidebar() }
                       open={this.state.sidebarOpen}
                       onSetOpen={(open) => this.onSetSidebarOpen(open)}
                       trigger={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}
              >
                <div className="header-img">
                  <AssetImg url={problem.pic} style={{height: this.state.style.picHeight, float: 'right'}}/>
                  {isBoolean(riseMember) && !riseMember ?
                    <div className={`trial-tip ${riseMemberTips ? 'open' : ''}`} onClick={() => this.goRiseMemberTips()}>
                    </div> : null}
                  <div className="plan-guide">
                    <div className="section-title">{problem.problem}</div>
                    <div className="section">
                      <label>已完成:</label> {completeSeries}/{totalSeries}节训练
                    </div>
                    {riseMember ? <div className="section">
                      <label>距关闭:</label> {deadline}天
                    </div> : null}
                    <div className="section">
                      <label>总得分:</label> {point} 分
                    </div>
                  </div>
                </div>
                <div className="function-menu">
                  <div className="left" onClick={() => this.essenceShare(problem.id, currentIndex)}>
                    <span className="essence"><AssetImg type="essence" height={13} width={19}/></span>
                    <span>小课论坛</span>
                  </div>
                  <div className="right" onClick={() => this.problemReview(problem.id)}>
                    <span className="problem_detail"><AssetImg type="problem_detail" height={12} width={14}/></span>
                    <span>小课介绍</span>
                  </div>
                </div>
                {!isEmpty(planData) ?
                  <div style={{padding: "0 15px", backgroundColor: '#f5f5f5'}}>
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
          )}
        </div>
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
