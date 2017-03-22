import * as React from "react";
import "./DropChoice.less"
import TweenOne,{TweenOneGroup} from 'rc-tween-one';
import {get,set,merge} from "lodash";

export default class DropChoice extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.contentWidth = 560/750 * window.innerWidth;
    this.problemFontSize = 30/750 * window.innerWidth;
    this.topFontSize = 28/750 * window.innerWidth;
    this.topHeight = 385/560 * this.contentWidth;

    this.topDotBM = 20/560 * this.contentWidth;
    this.topDotSize = 14/560 * this.contentWidth;
    this.topDotTM = 26/560 * this.contentWidth;
    this.topTipBM =  this.topDotBM +  this.topDotSize +  this.topDotTM;

    this.choiceFontSize = 30/560 * this.contentWidth;
    this.choiceSpecialMargin = 40/560 * this.contentWidth;
    this.choiceLRPD = 80/560 * this.contentWidth;

    this.contentHeight = this.topHeight;



    this.state = {
      idx:0,
      selectedList:[],
      curChoice:null,
      questionList:this.props.questionList?this.props.questionList:[]
    }
  }

  next(){
    const {selectedList,curChoice,questionList} = this.state;

  }

  selected(choice,seq){
    const {selectedList,curChoice,questionList,idx} = this.state;
    let newList = merge([],questionList);

    // 如果多选，注释掉下面即可
    newList[idx].choiceList.forEach(item=>{
      item.selected = false;
    })

    this.setState({questionList:
      set(newList,
      `[${idx}].choiceList[${seq}].selected`,
      !get(questionList,`[${idx}].choiceList[${seq}].selected`))})
  }

  render(){
    const { questionList=[] } = this.state;
    const curQuestion = questionList && questionList.length > 0 ?questionList[this.state.idx]:{};
    const { subject,choiceList} = curQuestion;
    return (
      <div className="screen-mask-container">
        <div className="screen-mask"/>
        <TweenOne style={{width:`${this.contentWidth}px`,marginTop:`${-this.contentHeight}px`}} animation={{ y:this.contentHeight }} component="div" className="content-container">
          <div className="top" style={{height:`${this.topHeight}px`}}>
            <div className="top-tips" style={{lineHeight:`${this.topHeight/2}px`,fontSize:`${this.topFontSize}px`}}>
              {subject}
            </div>
            <div className="top-dots" style={{height:`${this.topTipBM}px`}}>
              {questionList?questionList.map((item,seq)=>{
                return (<div className={`dot ${this.state.idx === seq?"cur":""}`} style={{width:`${this.topDotSize}`,height:`${this.topDotSize}`}} ></div>)
              }):null}
            </div>
          </div>
          <div className="choice-list" style={{padding:`0 ${this.choiceLRPD}px`}}>
            {choiceList ? choiceList.map((item,seq)=>{
              const marginTop = seq === 0?this.choiceSpecialMargin:this.choiceFontSize;
              const marginBottom = questionList && (questionList.length -1) === seq?this.choiceSpecialMargin:this.choiceFontSize;
              return (
                <div className={`choice ${item.selected?"selected":""}`} onClick={()=>this.selected(item,seq)}
                     style={{paddingTop:`${marginTop}px`,paddingBottom:`${marginBottom}px`,fontSize:`${this.choiceFontSize}px`,lineHeight:`${this.choiceFontSize}px`}}>
                  {item.subject}
                </div>
              )
            }):null}
          </div>
          <div className="bottom-btn" onClick={()=>this.next()} style={{height:`${this.choiceLRPD}px`,lineHeight:`${this.choiceLRPD}px`}}>
            {questionList && (questionList.length - 1) === this.state.idx ? "完成":"下一步"}
          </div>
        </TweenOne>

      </div>
    )
  }

}
