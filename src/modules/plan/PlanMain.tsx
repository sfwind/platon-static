import * as React from "react";
import { connect } from "react-redux";
import "./PlanMain.less";
import { loadPlan, loadPlanHistory, loadWarmUpNext, completePlan, closePlan, updateOpenRise, checkPractice,gradeProblem } from "./async";
import { loadProblem } from "../problem/async"
import { startLoad, endLoad, alertMsg } from "redux/actions";
import AssetImg from "../../components/AssetImg";
import Tutorial from "../../components/Tutorial"
import DropChoice from "../../components/DropChoice"
import ProblemViewer from "../problem/components/ProblemViewer"
import {merge,isBoolean,get} from "lodash"
import { Toast, Dialog } from "react-weui"
const { Alert } = Dialog


const typeMap = {
  1: '理解训练',
  2: '理解训练',
  11: '应用训练',
  12: '综合训练',
  21: '小目标',
  31: '知识点',
  32: '知识回顾',
}

@connect(state => state)
export class PlanMain extends React.Component <any, any> {
  constructor() {
    super()
    this.picWidth = window.innerWidth
    this.picHeight = window.innerWidth / (750 / 350)
    this.state = {
      planData: {},
      knowledge: {},
      showScoreModal:false,
      showCompleteModal: false,
      showConfirmModal: false,
      showDoneAll: false,
      currentIndex: 0,
      showProblem: false,
      selectProblem: {},
      defeatPercent:0,
      questionList:[
        {
          id:1,
          subject:"你已完成了本专题的训练<br/>对本专题的学习难度打个分吧",
          choiceList:[
            {
              id:5,
              subject:"非常难"
            },{
              id:4,
              subject:"比较难"
            },{
              id:3,
              subject:"适中"
            },{
              id:2,
              subject:"较简单"
            },{
              id:1,
              subject:"很简单"
            }
          ]
        },
        {
          id:2,
          subject:"本专题的训练对工作/生活有用吗？",
          choiceList:[
            {
              id:5,
              subject:"非常实用，大部分能马上应用"
            },{
              id:4,
              subject:"较为实用，不少能实际应用"
            },{
              id:3,
              subject:"实用性一般，要找找应用场景"
            },{
              id:2,
              subject:"不太实用，偶尔能用上"
            },{
              id:1,
              subject:"大部分不能应用"
            }
          ]
        }
      ],
      showedPayTip:false,
      nextSerialModal:{
        buttons:[
          {label:'我不听',onClick:()=>this.next(true)},
          {label:'好的',onClick:()=>this.setState({showNextSerialModal:false})}
        ],
        content:'从了解知识和能够运用，还差一个内化的距离<br/>确定不做应用训练了吗？'
      },
      nextModal:{
        buttons:[
          {label:'我不听',onClick:()=>this.confirm(true)},
          {label:'好的',onClick:()=>this.setState({showNextModal:false})}
        ],
        content:'提升能力和解决问题，需要你的刻意练习<br/>我们推荐你至少完成所有综合案例'
      }
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.query.series !== newProps.location.query.series && newProps.location.query.series !== undefined) {
      this.componentWillMount(newProps.location.query.series)
    }
  }

  componentWillMount(id) {
    const { dispatch, location } = this.props
    const { showedPayTip } = this.state;
    dispatch(startLoad())
    let series;
    if(id !== undefined && !isNaN(id)){
      series =id
    }else if(location.query.series !== undefined && !isNaN(location.query.series)){
      series =location.query.series
    }

    if (series) {
      loadPlanHistory(series).then(res => {
        dispatch(endLoad())
        let { code, msg } = res
        if (code === 200 || code === 213) {
          if (msg !== null) {
            this.setState({ planData: msg, currentIndex:msg.currentSeries })
            loadProblem(msg.problemId).then(res => {
              let { code, msg } = res
              if (code === 200) {
                this.setState({selectProblem:msg})
              }
            })
          } else {
            this.context.router.push({ pathname: location.pathname })
            dispatch(alertMsg("下一组任务明早6点解锁"))
          }
          if(code === 213 && !showedPayTip){
            this.setState({showedPayTip:true});
            dispatch(alertMsg("第三组之后的内容需要付费才能查看"))
          }
        } else if (code === 211) {
          this.context.router.push({ pathname: location.pathname })
          dispatch(alertMsg("下一组任务明早6点解锁"))
        } else if (code === 212) {
          this.context.router.push({ pathname: location.pathname })
          dispatch(alertMsg("先完成这一组的必修任务吧"))
        }
        else dispatch(alertMsg(msg))
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    } else {
      loadPlan().then(res => {
        dispatch(endLoad())
        let { code, msg } = res
        if (code === 200) {
          if (msg !== null) {
            this.setState({ planData: msg, currentIndex:msg.currentSeries})
            loadProblem(msg.problemId).then(res => {
              let { code, msg } = res
              if (code === 200) {
                this.setState({selectProblem:msg})
              }
            })
          } else {
            this.context.router.push({
              pathname: '/rise/static/problem/list'
            })
          }
        }
        else dispatch(alertMsg(msg))
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    }
  }

  onPracticeSelected(item) {
    const { dispatch } = this.props
    const { planData } = this.state
    const { series } = planData
    const { type, practicePlanId, knowledge } = item
    // if (!unlocked) {
    //   dispatch(alertMsg("该训练尚未解锁"))
    //   return
    // }
    checkPractice(series).then(res =>{
      const { code, msg } = res
      if (code === 200) {
        // 已完成
        if (type === 1 || type === 2) {
          if (item.status === 1) {
            this.context?this.context.router.push({
              pathname: '/rise/static/practice/warmup/analysis',
              query: { practicePlanId, kid: knowledge.id, series }
            }):null;
          } else {
            if (!knowledge.appear) {
              this.context?this.context.router.push({
                pathname: '/rise/static/practice/warmup',
                query: { practicePlanId, kid: knowledge.id, series }
              }):null;
            } else {
              this.context?this.context.router.push({
                pathname: '/rise/static/practice/warmup',
                query: { practicePlanId, kid: knowledge.id, series }
              }):null;
            }
          }
        } else if (type === 11) {
          this.context?this.context.router.push({
            pathname: '/rise/static/practice/application',
            query: { id: item.practiceIdList[0], series }
          }):null;
        } else if (type === 21) {
          this.context?this.context.router.push({
            pathname: '/rise/static/practice/challenge',
            query: { id: item.practiceIdList[0], series }
          }):null;
        }
      }else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(alertMsg(ex))
    })
  }

  nextTask() {
    const { dispatch } = this.props
    loadWarmUpNext().then(res => {
      const { code, msg } = res
      if (code === 200) {
        this.onPracticeSelected(msg)
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  prev() {
    const { dispatch } = this.props
    const { planData } = this.state
    const { series } = planData
    if (series === 1) {
      dispatch(alertMsg("当前已经是第一组训练"))
      return
    }
    this.context.router.push({ pathname: this.props.location.pathname, query: { series: series - 1 } })

    this.refs.plan.scrollTop = 0
  }

  next(force) {
    const {dispatch} = this.props
    const {showDoneAll , planData, currentIndex} = this.state
    const {doneAllPractice, series,doneCurSerialApplication, totalSeries} = planData
    const unlocked = get(planData,'practice[0].unlocked');
    // if(!showDoneAll){
    //   if(!doneAllPractice && currentIndex===planData.series){
    //     this.setState({showDoneAll:true})
    //     dispatch(alertMsg('当前组还有任务未完成，后续任务会保持锁定'))
    //   }
    // }
    if (series === totalSeries) {
      this.setState({showNextSerialModal:false});
    } else {
      if(unlocked && !doneCurSerialApplication && !force){
        this.setState({showNextSerialModal:true});
        return;
      }
      this.setState({showNextSerialModal:false});
      this.context.router.push({ pathname: this.props.location.pathname, query: { series: series + 1 } })
    }

    this.refs.plan.scrollTop = 0
  }

  complete() {
    const { dispatch } = this.props
    const { selectProblem } = this.state;
    completePlan().then(res => {
      const { code, msg } = res
      if (code === 200) {
        if(msg.iscomplete === true)
        {
          if(selectProblem.hasProblemScore){
            // 已经评分
            this.setState({showCompleteModal: true, defeatPercent:msg.percent, mustStudyDays:msg.mustStudyDays})
          } else {
            // 未评分
            this.setState({showScoreModal: true, defeatPercent:msg.percent, mustStudyDays:msg.mustStudyDays})
          }
        }else{
          dispatch(alertMsg('至少要完成所有的理解训练哦'))
        }
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  confirm(force) {
    const {dispatch} = this.props;
    const {planData} = this.state
    const {doneAllApplication} = planData
    const unlocked = get(planData,'practice[0].unlocked');
    if(unlocked && !doneAllApplication && !force){
      this.setState({showNextModal:true,showCompleteModal: false});
      return;
    }
    if(!this.state.mustStudyDays){
      this.setState({ showCompleteModal: false, showConfirmModal: true,showNextModal:false })
    } else {
      this.setState({ showCompleteModal: false,showNextModal:false})
      dispatch(alertMsg(`学得太猛了，再复习一下吧<br/>本专题推荐学习天数至少为${this.state.mustStudyDays}天<br/>之后就可以开启下一专题了`))
    }
  }

  closeCompleteModal() {
    this.setState({ showCompleteModal: false })
  }

  closeConfirmModal() {
    this.setState({ showConfirmModal: false })
  }

  essenceShare(problemId, series){
    this.context.router.push({ pathname: '/rise/static/practice/subject', query: { id: problemId, series } })
  }

  problemReview(problemId){
    this.setState({showProblem: true})
  }

  nextPlan() {
    const { dispatch } = this.props
    closePlan().then(res => {
      const { code, msg } = res
      if (code === 200) {
        this.context.router.push("/rise/static/problem/priority")
      } else {
        dispatch(alertMsg(msg))
        this.setState({showConfirmModal:false})
      }
    })
  }


  tutorialEnd(){
    const {dispatch} = this.props
    const {planData} = this.state
    updateOpenRise().then(res => {
      const {code,msg} = res
      if(code === 200){
        this.setState({planData:merge({},planData,{openRise:true})})
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  openMessageBox(){
    this.context.router.push({ pathname: '/rise/static/message/center' })
  }

  submitScore(questionList){
    const { selectProblem } = this.state;
    const { dispatch } = this.props;
    let problemScores = questionList.map(item=>{
      let selectedChoice;
      item.choiceList.forEach(choice=>{
        if(choice.selected){
          selectedChoice = choice.id;
        }
      });
      return {question:item.id,choice:selectedChoice};
    });
    dispatch(startLoad());
    gradeProblem(problemScores,selectProblem.id).then(res=>{
      dispatch(endLoad());
      this.setState({ showCompleteModal: true, showScoreModal: false,selectProblem:merge({},selectProblem,{hasProblemScore:true})});
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex))
    })

  }

  render() {
    const { planData,showScoreModal, showCompleteModal, showConfirmModal, showProblem, currentIndex, selectProblem, defeatPercent,showNextModal,showNextSerialModal } = this.state
    const {
      problem = {}, practice, warmupComplete, applicationComplete, point, total,
      deadline, status, currentSeries, totalSeries, series, openRise, newMessage,completeSeries
    } = planData
    const practiceRender = (list = []) => {
      return list.map((item, index) => {
        return (
          <div key={index} className="practice-card"
               onClick={() => this.onPracticeSelected(item)}>
            <div className="header">
              {item.type === 1 || item.type == 2 ? item.status !== 1 ?
                  <AssetImg type="warmup" size={50}/>:
                  <AssetImg type="warmup_complete" size={50}/>: null
              }
              {item.type === 11 || item.type == 12 ? item.status !== 1 ?
                  <AssetImg type="application" size={50}/>:
                  <AssetImg type="application_complete" size={50}/>: null
              }
              {item.type === 21 ? item.status !== 1 ?
                  <AssetImg type="challenge" size={50}/>:
                  <AssetImg type="challenge_complete" size={50}/>: null
              }
              {item.type === 31 || item.type == 32 ? item.status !== 1 ?
                  <AssetImg type="knowledge" size={50}/>:
                  <AssetImg type="knowledge_complete" size={50}/>: null
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
            </div>
          </div>
        )
      })
    }

    return (
      <div>
        {showScoreModal?<DropChoice onSubmit={(questionList)=>this.submitScore(questionList)} onClose={()=>this.setState({ showCompleteModal: true, showScoreModal: false })} questionList={this.state.questionList}/>:null}
        <Modal header={{replace:true,children:<AssetImg width={107} height={83} url="http://www.iqycamp.com/images/fragment/finish_modal3.png"/>}}
            buttons={[{click:()=>this.confirm(),content:"下一专题"},{click:()=>this.closeCompleteModal(),content:"取消"}]}
            show={showCompleteModal}>
          <div className="content">
            <div className="text2">太棒了!</div>
          </div>
          <div className="content2">你完成了本专题</div>
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
            <div className="text">确定开始新专题吗</div>
            <div className="text">当前专题的理解训练将无法查看</div>
          </div>
          <div className="content2">
            <div className="text">（PC端应用训练仍然开放）</div>
          </div>
        </Modal>

        <Tutorial show={isBoolean(openRise) && !openRise} onShowEnd={()=>this.tutorialEnd()}/>

        <Modal show={status===3}
               buttons={[{click:()=>this.nextPlan(),content:"开始新专题"}]}
               >
          <div className="content"><div className="text">本专题已到期</div></div>
          <div className="content2">
            <div className="text">登录</div>
            <div className="text">www.iquanwai.com/community</div>
            <div className="text">可继续完成专题/应用训练</div>
          </div>
        </Modal>

        {/*<Modal show={showNextSerialModal}*/}
               {/*buttons={[{click:()=>this.next(true),content:"我不听"},{click:()=>this.setState({showNextSerialModal:false}),content:"好的"}]}*/}
        {/*>*/}
          {/*<div className="content">*/}
            {/*<div className="text" >从了解知识和能够运用，还差一个内化的距离</div>*/}
            {/*<div className="text">确定不做应用训练了吗？</div>*/}
          {/*</div>*/}
        {/*</Modal>*/}


        <Alert { ...this.state.nextSerialModal }
          show={showNextSerialModal}>
          <div className="global-pre" dangerouslySetInnerHTML={{__html:this.state.nextSerialModal.content}}/>
        </Alert>


        {/*<Modal show={showNextModal}*/}
               {/*buttons={[{click:()=>this.confirm(true),content:"我不听"},{click:()=>this.setState({showNextModal:false}),content:"好的"}]}*/}
        {/*>*/}
          {/*<div className="content">*/}
            {/*<div className="text" >提升能力和解决问题，需要你的刻意练习</div>*/}
            {/*<div className="text">我们推荐你至少完成所有综合案例</div>*/}
          {/*</div>*/}
        {/*</Modal>*/}

        <Alert { ...this.state.nextModal }
          show={showNextModal}>
          <div className="global-pre" dangerouslySetInnerHTML={{__html:this.state.nextModal.content}}/>
        </Alert>

        <div className="header-img">
          <img src={problem.pic} style={{width: this.picWidth, height: this.picHeight}}/>
          <div className="message-box" onClick={this.openMessageBox.bind(this)}>
          { newMessage?
              <AssetImg type="has_message" height={33} width={33}/>
            : <AssetImg type="no_message" height={33} width={33}/>
          }
          </div>
          <div className="plan-guide">
            <div className="section-title">{problem.problem}</div>
            <div className="section">
              <label>已完成:</label> {completeSeries}/{totalSeries}组训练
            </div>
            <div className="section">
              <label>距关闭:</label> {deadline}天
            </div>
            <div className="section">
              <label>总得分:</label> {point} 分
            </div>
          </div>
        </div>
        <div className="function-menu">
          <div className="left" onClick={() => this.essenceShare(problem.id, series)}>
            <span className="essence"><AssetImg type="essence" height={13} width={19}/></span>
            <span>专题分享</span>
          </div>
          <div className="right" onClick={() => this.problemReview(problem.id)}>
            <span className="problem_detail"><AssetImg type="problem_detail" height={12} width={14}/></span>
            <span>专题详情</span>
          </div>
        </div>
        {showProblem ?<ProblemViewer readonly="true" problem={selectProblem} closeModel={()=>this.setState({showProblem:false})}/>
          : <div className="container has-footer" ref={'plan'}
                 style={{height: window.innerHeight - this.picHeight - 49, backgroundColor: '#f5f5f5'}}>
          <div className="plan-progress">
            <div className="bar"></div><span>第{series}组</span><div className="bar"></div>
          </div>
          <div className="plan-main">
            <div className="list">
              {practiceRender(practice)}
            </div>
            <div className="padding-footer"></div>
          </div>
        </div>}

        <div className="button-footer">
          <div className={`left origin ${series === 1 ? ' disabled' : ''}`} onClick={this.prev.bind(this)}>上一组
          </div>
          { series !== totalSeries ? <div className={`right`} onClick={()=>this.next()}>下一组</div> : null }
          { series === totalSeries ? <div className={`right`} onClick={()=>this.complete()}>
            完成训练</div> : null }
        </div>
      </div>
    )
  }
}


class Modal extends React.Component<any,any>{
  constructor(props){
    super(props);
  }


  render(){
    const renderButton = (buttons=[])=>{
      if(!buttons || buttons.length > 2){
        return null;
      }
      if(buttons.length == 2){
        return (
          buttons.map((item,key)=>{
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
      this.props.show?<div className="mask">
        <div className="finished-modal">
          {this.props.header && this.props.header.replace?this.props.header.children:<div className="modal-header">{this.props.header?this.props.header.children:null}</div>}
          <div className="modal-context">
            {this.props.children}
          </div>
          <div className="modal-button-footer">
            {renderButton(this.props.buttons)}
          </div>
        </div>
      </div>:null
    )
  }
}
