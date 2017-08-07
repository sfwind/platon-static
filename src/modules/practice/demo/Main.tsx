import * as React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import "./Main.less";
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
import { scroll } from "../../../utils/helpers"

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      practice: [],
      currentIndex: 0,
      practiceCount: 0,
      selected: [],
      knowledge: {},
      integrated: false,
      scene:0,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const {_s} = this.props.location.query;
    if(_s && _s == 'course'){
      this.setState({scene:1})
    }else{
      this.setState({scene:2})
    }
    let practiceList = [];
    practiceList.push(
      {question:"每当跟别人谈判（谈价格、谈条款、谈工资等）的时候，我总是最后妥协的那个", choiceList:[
        {subject:"是", id: 1},
        {subject:"否", id: 2}
      ]},
      {question:"每当跟别人发生利益冲突的时候，我就很害怕去沟通", choiceList:[
        {subject:"是", id: 1},
        {subject:"否", id: 2}
      ]},
      {question:"我觉得自己的气场很弱，所以别人常常忽略我的提议", choiceList:[
        {subject:"是", id: 1},
        {subject:"否", id: 2}
      ]},
      {question:"我经常在跟比自己牛的人说话时，得不到他们的回应", choiceList:[
        {subject:"是", id: 1},
        {subject:"否", id: 2}
      ]},
      {question:"朋友圈有热点事件刷屏的时候，很多不一样甚至相反的观点涌现出来，我经常觉得都有道理", choiceList:[
        {subject:"是", id: 1},
        {subject:"否", id: 2}
      ]},
      {question:"对于”事业和家庭哪个更重要“、”分手能不能做朋友“这种没有对错的问题，我总能找到跟一般人不同的看问题的角度", choiceList:[
        {subject:"是", id: 1},
        {subject:"否", id: 2}
      ]},
      {question:"当我有一些碎片时间（等人、等上菜等）时，我一般会刷朋友圈或者玩游戏", choiceList:[
        {subject:"是", id: 1},
        {subject:"否", id: 2}
      ]},
      {question:"我定过很多次学习/健身/工作计划，但常常坚持不了，最后中途放弃", choiceList:[
        {subject:"是", id: 1},
        {subject:"否", id: 2}
      ]},
      {question:"面试之前，我常常能够猜到面试官要问的一些问题", choiceList:[
        {subject:"是", id: 1},
        {subject:"否", id: 2}
      ]},
      {question:"我过去工作明明有很多成绩，但是在面试的时候，总是无法充分表现出来", choiceList:[
        {subject:"是", id: 1},
        {subject:"否", id: 2}
      ]})
    this.setState({practice:practiceList, practiceCount:10})
  }

  prev() {
    const { dispatch } = this.props;
    const { currentIndex, practice } = this.state;
    if(currentIndex > 0) {
      this.setChoice();
      const selected = practice[`${currentIndex - 1}`].choice;
      this.setState({ currentIndex: currentIndex - 1, selected });
    }
    scroll('.container', '.container');
  }

  setChoice() {
    let { practice, currentIndex, selected } = this.state;
    practice[currentIndex].choice = selected
    this.setState({ practice });
  }

  next() {
    const { dispatch,location } = this.props;
    const { selected, practice, currentIndex, practiceCount } = this.state;
    const { integrated, practicePlanId} = location.query;

    if(selected.length === 0) {
      dispatch(alertMsg("你还没有选择答案哦"))
      return
    }

    if(currentIndex < practiceCount - 1) {
      this.setChoice();
      let selected = practice[`${currentIndex + 1}`].choice;
      if(!selected) {
        selected = []
      }
      this.setState({ currentIndex: currentIndex + 1, selected });
    }
    scroll('.container', '.container');
  }

  onChoiceSelected(choiceId) {
    const {practicePlanId} = this.props.location.query;
    const { currentIndex, selected, practiceCount } = this.state;
    let _list = selected;
    if (_list.indexOf(choiceId) > -1) {
      _.remove(_list, n => n === choiceId);
    } else {
      _list.push(choiceId);
    }
    this.setState({ selected: _list });
    setTimeout(()=>{
      if(currentIndex !== practiceCount - 1){
        this.next()
      } else{
        this.setState({show:true})
      }
    }, 300)

  }

  onSubmit() {
    const { dispatch } = this.props;
    const { selected, practice, currentIndex, practiceCount,scene } = this.state;
    const { practicePlanId } = this.props.location.query;
    if(selected.length === 0) {
      dispatch(alertMsg("你还没有选择答案哦"));
      return
    }
    if(currentIndex === practiceCount - 1) {
      if(scene === 1){
        this.context.router.push({pathname:'/rise/static/eva/end'})
      }else{
        this.context.router.push({pathname:'/rise/static/eva/result'})
      }
    }
  }

  render() {
    const { practice, currentIndex, selected, practiceCount, show } = this.state
    const questionRender = (practice) => {
      const { question, pic, choiceList = [], score = 0 } = practice
      return (
        <div className="intro-container">
          { practiceCount !== 0 && currentIndex <= practiceCount - 1 ? <div className="intro-index">
            <span className="index">第{currentIndex + 1}/{practiceCount}题</span>
          </div> : null}
          <div className="question">
            <div dangerouslySetInnerHTML={{ __html: question }}/>
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => choiceRender(choice, idx))}
          </div>
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${selected.indexOf(id) > -1 ? ' selected' : ''}`}
             onClick={e => this.onChoiceSelected(id)}>
          <span className="index">{sequenceMap[idx]}</span>
          <span className="text">{subject}</span>
        </div>
      )
    }

    return (
      <div>
        <div>
          <div className="container has-footer" style={{ height: window.innerHeight - 49 }}>
            <div className="demo-warm-up">
              <div className="page-header">测评</div>
              {questionRender(practice[currentIndex] || {})}
            </div>
          </div>
          { show ?
          <div className="button-footer" onClick={this.onSubmit.bind(this)}>
            提交
          </div> : null}
        </div>
      </div>
    )
  }
}
