import * as React from "react";
import {connect} from "react-redux";
import "./PlanMain.less";
import { loadPlan, completePlan, closePlan, updateOpenRise,
  checkPractice,gradeProblem , isRiseMember, learnKnowledge, mark, queryChapterList} from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import AssetImg from "../../components/AssetImg";
import Tutorial from "../../components/Tutorial"
import DropChoice from "../../components/DropChoice"
import {merge, isBoolean, get, isEmpty} from "lodash"
import {Toast, Dialog} from "react-weui"
import {ToolBar} from "../base/ToolBar"
import {Sidebar} from '../../components/Sidebar';
import { NumberToChinese } from "../../utils/helpers"
import SwipeableViews from 'react-swipeable-views';
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
      // nextSeriesModal: {
      //   buttons: [
      //     {label: '我不听', onClick: () => this.next(true)},
      //     {label: '做本节练习', onClick: () => this.setState({showNextSeriesModal: false})}
      //   ],
      // },
      nextModal: {
        buttons: [
          {label: '我不听', onClick: () => this.confirmComplete(true)},
          {label: '好的', onClick: () => this.setState({showNextModal: false})}
        ],
      },

      sidebarOpen:false,
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
    const { planId } = this.props.location.query;
    queryChapterList(planId).then(res=>{
      if(res.code === 200){
        this.setState({chapterList:res.msg});
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

    const planId = location.query.planId

    loadPlan(planId).then(res => {
      dispatch(endLoad())
      let {code, msg} = res
      if (code === 200) {
        if (msg !== null) {
          this.setState({planData: msg, currentIndex: msg.currentSeries, selectProblem:msg.problem})
        } else {
          this.context.router.push({
            pathname: '/rise/static/welcome'
          })
        }
      }
      else dispatch(alertMsg(msg))
    }).then(() => this.riseMemberCheck()).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))})

  }

  onPracticeSelected(item) {
    const {dispatch} = this.props
    const {planData, currentIndex} = this.state
    const {problemId} = planData
    const {type, practicePlanId, planId} = item
    // if (!unlocked) {
    //   dispatch(alertMsg("该训练尚未解锁"))
    //   return
    // }
    checkPractice(currentIndex,planId).then(res =>{
      const { code, msg } = res
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
      } else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(alertMsg(ex))
    })
  }

  // prev() {
  //   const { dispatch ,location} = this.props
  //   const { planData } = this.state
  //   const { series } = planData
  //   const { planId } = location.query
  //   if (series === 1) {
  //     dispatch(alertMsg("当前已经是第一节训练"))
  //     return
  //   }
  //
  //   let query;
  //   if(planId){
  //     query = {series: series - 1, planId: planId}
  //   }else{
  //     query = {series: series - 1}
  //   }
  //   this.context.router.push({ pathname: this.props.location.pathname, query })
  //
  //   this.refs.plan.scrollTop = 0
  // }
  //
  // next(force,otherSeries) {
  //   const {location} = this.props
  //   const { planData} = this.state
  //   const {series,doneCurSeriesApplication, totalSeries} = planData
  //   const {planId} = location.query
  //   const unlocked = get(planData,'practice[0].unlocked');
  //   console.log(otherSeries);
  //   if(otherSeries){
  //     // 点击侧边栏
  //     if(series === otherSeries){
  //       // 点击自己
  //       // this.onSetSidebarOpen(false);
  //     } else {
  //       // 直接跳
  //       // this.onSetSidebarOpen(false);
  //       let query;
  //       if(planId){
  //         query = {series: otherSeries, planId: planId}
  //       }else{
  //         query = {series: otherSeries}
  //       }
  //       this.context.router.push({ pathname: this.props.location.pathname, query })
  //     }
  //   } else if (series === totalSeries) {
  //     this.setState({showNextSeriesModal: false});
  //   } else {
  //     if (unlocked && !doneCurSeriesApplication && !force) {
  //       this.setState({showNextSeriesModal: true});
  //       return;
  //     }
  //
  //     this.setState({showNextSeriesModal:false});
  //     let query;
  //     if(planId){
  //       query = {series: series + 1, planId: planId}
  //     }else{
  //       query = {series: series + 1}
  //     }
  //     this.context.router.push({ pathname: this.props.location.pathname, query })
  //   }
  //
  //   this.refs.plan.scrollTop = 0
  // }

  complete() {
    const { dispatch,location } = this.props
    const { selectProblem } = this.state;
    const planId = location.query.planId
    completePlan(planId).then(res => {
      const { code, msg } = res
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
    this.context.router.push({pathname: '/rise/static/problem/view', query: {id: problemId, show:true}})
  }

  nextPlan() {
    const { dispatch,location } = this.props
    const planId = location.query.planId
    closePlan(planId).then(res => {
      const { code, msg } = res
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

  goRiseMemberTips(){
    mark({module:"RISE",function:"升级专业版",action:"点击升级专业版按钮"}).then(() =>{
      window.location.href = `https://${window.location.hostname}/pay/pay`
    })
  }

  goOthers() {
    this.context.router.push({pathname: '/rise/static/problem/priority'})
  }

  onSetSidebarOpen(open){
    this.setState({sidebarOpen:open});
  }

  goSection(series) {
    if(!series){
      return
    }
    const {dispatch} = this.props
    const {planData, showedPayTip} = this.state
    const {sections, id} = planData
    this.setState({currentIndex:series})
    if(showedPayTip){
      return
    }
    dispatch(startLoad());
    checkPractice(series, id).then(res => {
      dispatch(endLoad());
      const {code, msg} = res
      if (code === 200) {
        sections[series-1].practices.map((practice) => {
          practice.unlocked = 1
        })
        this.setState({planData})
      } else {
        dispatch(alertMsg(msg))
        this.setState({showedPayTip:true})
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex))
    })
  }


  render() {
    const { currentIndex, planData,showScoreModal, showCompleteModal, showConfirmModal,
        selectProblem,riseMember,riseMemberTips,defeatPercent,showNextModal,showNextSeriesModal, chapterList } = this.state
    const {location} = this.props
    const planId = location.query.planId
    const {
      problem = {}, sections = [], point, deadline, status, totalSeries, openRise, completeSeries
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

    const renderSidebar = ()=>{
      return (
        <div className="plan-side-bar">
          <div className="side-header-title">
           <span className="content" style={{width:`${window.innerWidth * 0.7 - 20}`}}>{selectProblem.problem}</span>
          </div>
          <div className="side-content" style={{height:`${window.innerHeight-50-65}px`,overflowY:'scroll'}}>
            {chapterList?chapterList.map((item,key)=>{
              return (
                <div key={key} className={`chapter-area`}>
                  <div className="cell">
                    <div className="chapter">
                      <div>
                      <div className="label">{NumberToChinese(item.chapterId)}、</div><div className="str" style={{maxWidth:`${window.innerWidth * 0.7 - 50}px`}}>{item.chapter}</div>
                      </div>
                    </div>
                    {item.sectionList.map((section,index)=>{
                      return (
                        <div className={`section  ${currentIndex===section.series?'open':''}`}  onClick={()=>this.goSection(section.series)} key={index}>
                          <div>
                          <div className="label">{item.chapterId}.{section.sectionId}</div><div className="str" style={{maxWidth:`${window.innerWidth * 0.7 - 50}px`}}>{section.section}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }):null}
          </div>
        </div>
      )
    }

    const renderSection = (item,idx)=>{
      return (
      <div key={idx}>
        <div className="plan-progress">
          <div className="intro">
            <div className="intro-chapter">{NumberToChinese(item.chapter)}{'、 '}{item.chapterName}</div>
            <div className="bar"/>
          </div>
          <div className="intro-section">{item.chapter+'.'+item.section}{' '}{item.name}</div>
        </div>
        <div className="plan-main">
          <div className="list">
            {practiceRender(item.practices)}
          </div>
          <div className="padding-footer"></div>
        </div>
      </div>)
    }


    return (
      <div>
        <Sidebar sidebar={ renderSidebar() }
                 open={this.state.sidebarOpen}
                 onSetOpen={(open)=>this.onSetSidebarOpen(open)}
                 trigger={()=>this.onSetSidebarOpen(!this.state.sidebarOpen)}
        >
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
          <div className="content">
            <div className="text">确定开始新小课吗</div>
            <div className="text">当前小课的巩固练习将无法查看</div>
          </div>
          <div className="content2">
            <div className="text">（PC端应用练习仍然开放）</div>
          </div>
        </Modal>

        <Tutorial show={isBoolean(openRise) && !openRise} onShowEnd={()=>this.tutorialEnd()}/>

        <Modal show={status===3 && !planId}
               buttons={[{click:()=>this.nextPlan(),content:"开始新小课"}]}
        >
          <div className="content">
            <div className="text">糟糕！好久没学，小课到期了！</div>
          </div>
          <div className="content2">
            <div className="text">你完成了<span className="number">{completeSeries}</span>节</div>
            <div className="text">获得了<span className="number">{point}</span>积分</div>
          </div>
        </Modal>

        {/*<Alert { ...this.state.nextSeriesModal }*/}
          {/*show={showNextSeriesModal}>*/}
          {/*<div className="global-pre" dangerouslySetInnerHTML={{__html:this.state.planData.alertMsg}}/>*/}
        {/*</Alert>*/}

        <Alert { ...this.state.nextModal }
          show={showNextModal}>
          <div className="global-pre" dangerouslySetInnerHTML={{__html:this.state.planData.alertMsg}}/>
        </Alert>

        <div className="header-img">
          <AssetImg url={problem.pic} style={{height: this.state.style.picHeight, float:'right'}}/>
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
          <div className="left" onClick={() => this.essenceShare(problem.id, currentIndex)}>
            <span className="essence"><AssetImg type="essence" height={13} width={19}/></span>
            <span>小课论坛</span>
          </div>
          <div className="right" onClick={() => this.problemReview(problem.id)}>
            <span className="problem_detail"><AssetImg type="problem_detail" height={12} width={14}/></span>
            <span>小课介绍</span>
          </div>
        </div>
          {!isEmpty(planData)?
              <div style={{padding:"0 15px", backgroundColor: '#f5f5f5'}}>
                <SwipeableViews index={currentIndex-1} onChangeIndex={(index, indexLatest)=>this.goSection(index+1)}>
                  {sections?sections.map((item, idx)=>{
                        return renderSection(item, idx)
                      }):null}
                </SwipeableViews>
              </div>
              :null}
        </Sidebar>
        <ToolBar />
        {/*<div className="button-footer">*/}
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
