import * as React from "react";
import "./DropChoice.less"
import TweenOne,{TweenOneGroup} from 'rc-tween-one';


export default class DropChoice extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.contentWidth = 560/750 * window.innerWidth;
    this.problemFontSize = 30/750 * window.innerWidth;
    this.topFontSize = 28/750 * window.innerWidth;
    this.topHeight = 385/560 * this.contentWidth;
    this.contentHeight = this.topHeight;
    console.log(this.contentWidth,this.topHeight,this.fontSize)
    this.state = {
      idx:0,
      currentQuestion:this.props.question,
    }
  }

  render(){
    const { questionList=[] } = this.props;
    const { choicList}



    return (
      <div className="screen-mask-container">
        <div className="screen-mask"/>
        <TweenOne style={{width:`${this.contentWidth}px`,marginTop:`${-this.contentHeight}px`}} animation={{ y:this.contentHeight }} component="div" className="content-container">
          <div className="top" style={{height:`${this.topHeight}px`}}>
            <div className="top-tips">

            </div>
          </div>
          <div className="">

          </div>

        </TweenOne>

      </div>
    )
  }

}
