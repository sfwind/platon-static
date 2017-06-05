import * as React from 'react';
import { connect } from 'react-redux';
import './ImprovementReport.less'
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { queryReport } from './async'

@connect(state=>state)
export class ImprovementReport extends React.Component<any,any>{
  constructor(){
    super();
    this.state = {
    };
  }

  componentWillMount(){
    const { planId } = this.props.location.query;
    const { dispatch } = this.props;
    dispatch(startLoad());
    queryReport().then((res)=>{
      dispatch(endLoad());
      if(res.code === 200){
        console.log(res.msg);
        this.setState({planData:res.msg});
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }
  render(){
    const { planData = {} } = this.state;
    const { problem,studyDays,percent,receiveVoteCount,shareVoteCount,totalScore,integratedTotalScore,integratedShouldCount,
      integratedScore,integratedCompleteCount,chapterList,applicationTotalScore,applicationShouldCount,
      applicationScore,applicationCompleteCount} = planData;
    return (
      <div className="improvement-report">
        <div className="header">
          <img className="bg" src="https://static.iqycamp.com/images/problem_explore_banner_4.png?imageslim"/>
          <div className="msg">
            <div className="title">
              学习报告
            </div>
            <div className="problem-title">
              小课：{problem}
            </div>
            <div className="sub-text">
              总得分：<span className="socre">{totalScore}</span>，打败了的<span className="percent">{percent}</span>同学
            </div>
            <div className="time">
              学习时长：{studyDays}
            </div>
          </div>
        </div>
        <div className="body">

        </div>
        <div className="button-footer">

        </div>
      </div>
    )
  }
}

