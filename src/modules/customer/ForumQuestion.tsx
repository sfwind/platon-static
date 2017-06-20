import * as React from "react";
import {connect} from "react-redux";
import "./ForumQuestion.less";
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import { loadMineQuestions,loadMineAnswers } from "./async";
import SimpleQuestion from "../forum/commons/SimpleQuestion/SimpleQuestion"


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
      if(res.code === 200){
        this.setState({questions:res.msg});
      } else {
        dispatch(alertMsg(res.msg));
      }
      console.log('question',res.msg);
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })

    loadMineAnswers().then(res=>{
      dispatch(endLoad());
      if(res.code === 200){
        this.setState({answers:res.msg});
      } else {
        dispatch(alertMsg(res.msg));
      }
      console.log('answers',res.msg);
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  render(){
    const {questions,answers} = this.state;
    const renderQuestions = (list = [])=> {
      return list.map((item,key)=>{
        return <SimpleQuestion key={key} title={item.topic} follow={item.followCount} answer={item.answerCount}/>;
      })
    }

    const renderAnswers = (list = [])=>{
      return list.map((item,key)=>{
          return (
            <div key={key} className="pfq-answer">
              <div className="topic">{item.question}</div>
              <div className="answer">{item.answer}</div>
            </div>
          )
      })
    }

    return (
      <div className="personal-forum-question">
        <div className="pfq-question">
          <div className="pfq-header">
            我的提问
          </div>
          <div className="pfq-body">
            {renderQuestions(questions)}
          </div>
        </div>
        <div className="pfq-answer">
          <div className="pfq-header">
            我的回答
          </div>
          <div className="pfq-body">
            {renderAnswers(answers)}
          </div>
        </div>
      </div>
    )
  }
}
