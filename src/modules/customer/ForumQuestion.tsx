import * as React from "react";
import {connect} from "react-redux";
import "./ForumQuestion.less";
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import { loadMineQuestions,loadMineAnswers } from "./async";
@connect(state=>state)
export default class ForumQuestion extends React.Component<any,any>{
  constructor(){
    super();
  }

  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(startLoad());
    loadMineQuestions().then(res=>{
      dispatch(endLoad());
      console.log(res.msg);
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })

    loadMineAnswers().then(res=>{
      dispatch(endLoad());
      console.log(res.msg);
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  render(){
    return (
      <div className="personal-forum-question">
        <div className="pfq-question">
          <div className="pfq-header">
            我的提问
          </div>
          <div className="pfq-body">

          </div>
        </div>
        <div className="pfq-answer">
          <div className="pfq-header">
            我的回答
          </div>
          <div className="pfq-body">

          </div>
        </div>
      </div>
    )
  }
}
