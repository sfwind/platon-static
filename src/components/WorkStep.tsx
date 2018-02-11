import * as React from "react"
import "./WorkStep.less";

interface WorkStepProps {
  works:Array<WorkItem>,
}
interface WorkItem {
  done:Boolean,
  text:String,
  cur:Boolean,
}
export default class WorkStep extends React.Component<WorkStepProps,any>{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div className="work-step-choice-dot-container">
        <div style={{width:'100%',height:'1px'}}></div>
        <div className="work-step-choice-list-wrapper">
          {
            this.props.works?this.props.works.map((work,key)=>{
              return (
                <div className="work-step-choice">
                  <div className="work-step-mask">
                    <div className={`work-step-dot ${work.done?'work-step-done':''} ${work.cur && !work.done?'work-step-cur':''}`}></div>
                    <div className="work-step-text">{work.text}</div>
                  </div>
                </div>
              )
            }):null
          }
          <div className="work-step-choice-bg-hr"></div>
        </div>
      </div>
    )
  }
}
