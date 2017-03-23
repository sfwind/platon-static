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
import {merge,isBoolean} from "lodash"

const typeMap = {
  1: '理解训练',
  11: '应用训练',
  21: '小目标'
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
      questionList:[
        {
          id:1,
          subject:"你已完成了本专题的训练<br/>对本专题的学习难度打个分吧",
          choiceList:[
            {
              id:1,
              subject:"非常难"
            },{
              id:2,
              subject:"比较难"
            },{
              id:3,
              subject:"适中"
            },{
              id:4,
              subject:"较简单"
            },{
              id:5,
              subject:"很简单"
            }
          ]
        },
        {
          id:2,
          subject:"本专题的训练<br/>对工作/生活有用吗？",
          choiceList:[
            {
              id:5,
              subject:"5分 非常实用，大部分能马上应用"
            },{
              id:4,
              subject:"4分 较为实用，不少能实际应用"
            },{
              id:3,
              subject:"3分 实用性一般，要找找应用场景"
            },{
              id:2,
              subject:"2分 不太实用，偶尔能用上"
            },{
              id:1,
              subject:"1分 大部分不能应用"
            }
          ]
        }
      ]
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
    dispatch(startLoad())
    if (id !== undefined || location.query.series !== undefined) {
      loadPlanHistory(id || location.query.series).then(res => {
        dispatch(endLoad())
        let { code, msg } = res
        if (code === 200) {
          if (msg !== null) {
            this.setState({ planData: msg, currentIndex:msg.currentSeries })
            loadProblem(msg.problemId).then(res => {
              let { code, msg } = res
              if (code === 200) {
                this.setState({selectProblem:msg})
                window.location.href ="#series"
              }
            })
          } else {
            this.context.router.push({ pathname: location.pathname })
            dispatch(alertMsg("下一组任务明早6点解锁"))
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
            this.context.router.push({
              pathname: '/rise/static/practice/warmup/analysis',
              query: { practicePlanId, kid: knowledge.id, series }
            })
          } else {
            if (!knowledge.appear) {
              this.context.router.push({
                pathname: '/rise/static/practice/warmup/intro',
                query: { practicePlanId, kid: knowledge.id, series }
              })
            } else {
              this.context.router.push({
                pathname: '/rise/static/practice/warmup/ready',
                query: { practicePlanId, kid: knowledge.id, series }
              })
            }
          }
        } else if (type === 11) {
          this.context.router.push({
            pathname: '/rise/static/practice/application',
            query: { id: item.practiceIdList[0], series }
          })
        } else if (type === 21) {
          this.context.router.push({
            pathname: '/rise/static/practice/challenge',
            query: { id: item.practiceIdList[0], series }
          })
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
  }

  next() {
    const {dispatch} = this.props
    const {showDoneAll , planData, currentIndex} = this.state
    const {doneAllPractice, series, totalSeries} = planData
    // if(!showDoneAll){
    //   if(!doneAllPractice && currentIndex===planData.series){
    //     this.setState({showDoneAll:true})
    //     dispatch(alertMsg('当前组还有任务未完成，后续任务会保持锁定'))
    //   }
    // }
    if (series === totalSeries) {

    } else {
      this.context.router.push({ pathname: this.props.location.pathname, query: { series: series + 1 } })
    }
  }

  complete() {
    const { dispatch } = this.props
    const { selectProblem } = this.state;
    completePlan().then(res => {
      const { code, msg } = res
      if (code === 200) {
        if(msg === true)
        {
          if(selectProblem.hasProblemScore){
            // 已经评分
            this.setState({showCompleteModal: true})
          } else {
            // 未评分
            this.setState({showScoreModal: true})
          }
        }else{
          dispatch(alertMsg('至少要完成所有的理解训练哦'))
        }
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  confirm() {
    this.setState({ showCompleteModal: false, showConfirmModal: true })
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
    console.log("提交:",questionList);
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
      dispatch(alertMsg(msg))
    })

  }

  render() {
    const { planData,showScoreModal, showCompleteModal, showConfirmModal, showProblem, currentIndex, selectProblem } = this.state
    const {
      problem = {}, practice, warmupComplete, applicationComplete, point, total,
      deadline, status, currentSeries, totalSeries, series, openRise, newMessage
    } = planData

    const practiceRender = (list = []) => {
      return list.map((item, index) => {
        return (
          <div key={index} className="practice-card"
               onClick={() => this.onPracticeSelected(item)}>
            <div className="header">
              {item.type === 1 ? item.status !== 1 ?
                  <AssetImg type="warmup" size={50}/>:
                  <AssetImg type="warmup_complete" size={50}/>: null
              }
              {item.type === 11 ? item.status !== 1 ?
                  <AssetImg type="application" size={50}/>:
                  <AssetImg type="application_complete" size={50}/>: null
              }
              {item.type === 21 ? item.status !== 1 ?
                  <AssetImg type="challenge" size={50}/>:
                  <AssetImg type="challenge_complete" size={50}/>: null
              }
            </div>
            {item.unlocked === false ?
                <div className="locked"><AssetImg type="lock" height={24} width={20}/></div>: null
            }

            <div className="body">
              <div className="title">{typeMap[item.type]}</div>
              <div className="sub-title">{item.knowledge ? item.knowledge.knowledge : ''}</div>
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
        { showScoreModal?<DropChoice onSubmit={(questionList)=>this.submitScore(questionList)} onClose={()=>this.setState({ showCompleteModal: true, showScoreModal: false })} questionList={this.state.questionList}/>:null}
        { showCompleteModal ?
          <div className="mask">
            <div className="finished_modal">
              <AssetImg width={290} height={410} url="http://www.iqycamp.com/images/fragment/finish_modal2.png"/>
              <div className="modal_context">
                <div className="content">
                  <div className="text2">太棒了!</div>
                  <div className="text">你完成了本专题全部必做训练</div>
                </div>
                <div className="content2">
                  已得<span className="number">{point}</span>积分
                </div>
                {/**<div className="button">分享一下</div>**/}
                <div className="modal-button-footer complete">
                  <div className="left" onClick={this.confirm.bind(this)}>
                    下一专题
                  </div>
                  <div className="right" onClick={this.closeCompleteModal.bind(this)}>取消
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null }
        { showConfirmModal ?
          <div className="mask">
            <div className="finished_modal">
              <AssetImg width={290} height={410} url="http://www.iqycamp.com/images/fragment/finish_modal2.png"/>
              <div className="modal_context">
                <div className="content">
                  <div className="text">确定开始新专题吗</div>
                  <div className="text">当前专题的理解训练将无法查看</div>
                </div>
                <div className="content2">
                  <div className="text">（PC端应用训练仍然开放）</div>
                </div>
                {/**<div className="button">分享一下</div>**/}
                <div className="modal-button-footer confirm">
                  <div className="left" onClick={this.nextPlan.bind(this)}>
                    确定
                  </div>
                  <div className="right" onClick={this.closeConfirmModal.bind(this)}>取消</div>
                </div>
              </div>
            </div>
          </div>
          : null }
        { isBoolean(openRise) && !openRise?
          <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.8)',position:'fixed'}}>
            <Tutorial onShowEnd={()=>this.tutorialEnd()}/>
          </div>
          :null}
        { status === 3 ?
          <div className="mask">
            <div className="finished_modal">
              <AssetImg width={290} height={410} url="http://www.iqycamp.com/images/fragment/expire_modal2.png"/>
              <div className="modal_context">
                <div className="content"><div className="text">本专题已到期</div></div>
                <div className="content2">
                  <div className="text">登录</div>
                  <div className="text">www.iquanwai.com/community</div>
                  <div className="text">可继续完成专题/应用训练</div>
                </div>
                {/**<div className="button">分享一下</div>**/}
                <div className="modal-button-footer complete">
                  <div className="button" onClick={this.nextPlan.bind(this)}>开始新专题
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null }
        <div className="header-img">
          <img src={problem.pic} style={{width: this.picWidth, height: this.picHeight}}/>
          <div className="message-box" onClick={this.openMessageBox.bind(this)}>
          { newMessage?
              <AssetImg type="has_message" height={33} width={33}/>
            : <AssetImg type="no_message" height={33} width={33}/>
          }
          </div>
          <div className="plan-guide">
            <a name="series"/>
            <div className="section-title">{problem.problem}</div>
            <div className="section">
              <label>已解锁:</label> {currentIndex}/{totalSeries}组训练
            </div>
            <div className="section">
              <label>距关闭:</label> {deadline}天
            </div>
            <div className="section">
              <label>总得分:</label> {point} 分
            </div>
          </div>
        </div>
        <div className="function-area">
          <div className="left" onClick={() => this.essenceShare(problem.id, series)}>
            <span className="essence"><AssetImg type="essence" height={13} width={19}/></span>
            <span>专题分享</span>
          </div>
          <div className="right" onClick={() => this.problemReview(problem.id)}>
            <span className="problem_detail"><AssetImg type="problem_detail" height={12} width={14}/></span>
            <span>专题详情</span>
          </div>
        </div>
        {/**<div className="button-footer" onClick={this.nextTask.bind(this)}>开始</div>**/}
        {showProblem ?<ProblemViewer readonly="true" problem={selectProblem} closeModel={()=>this.setState({showProblem:false})}/>
          : <div className="container has-footer"
                 style={{height: window.innerHeight - this.picHeight - 49, backgroundColor: '#f5f5f5'}}>
          <div className="plan-progress"><div className="bar"></div><span>第{series}组</span><div className="bar"></div></div>
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
          { series !== totalSeries ? <div className={`right`} onClick={this.next.bind(this)}>下一组</div> : null }
          { series === totalSeries ? <div className={`right`} onClick={this.complete.bind(this)}>
            完成训练</div> : null }
        </div>
      </div>
    )
  }
}
