import * as React from 'react';
import { connect } from 'react-redux';
import './ImprovementReport.less'
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { queryReport } from './async'
import {isNumber} from 'lodash';
const numeral = require('numeral');


@connect(state=>state)
export class ImprovementReport extends React.Component<any,any>{
  constructor(){
    super();
    this.state = {
    };
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(){
    const { planId } = this.props.location.query;
    const { dispatch } = this.props;
    dispatch(startLoad());
    queryReport(planId).then((res)=>{
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
    console.log(numeral);
  }

  calculatePercent(score,total){
    let tempScore = score/total;
    if(isNumber(tempScore)){
      if(tempScore!=0){
        if(tempScore<0.05){
          tempScore = 0.05;
        }
      }

      tempScore = numeral(tempScore*100).format('0.00');
    } else {
      tempScore = 0;
    }
    return tempScore;
  }

  renderChapterScores(){
    const { planData = {} } = this.state;
    const { problem,studyDays,percent,receiveVoteCount,shareVoteCount,totalScore,integratedTotalScore,integratedShouldCount,
      integratedScore,integratedCompleteCount,chapterList,applicationTotalScore,applicationShouldCount,
      applicationScore,applicationCompleteCount} = planData;
    if(chapterList){
      return chapterList.map((item,key)=>{
        let clazz = 'complete-item ' +(key===0?'first':'');
        let tempScore = this.calculatePercent(item.myWarmScore,item.totalWarmScore)

        return (
          <div className={clazz}>
            <div className="info">
              <span className="name">{item.name}</span>
              <span className="score"><span className="point number">{item.myWarmScore}</span> / <span className="number">{item.totalWarmScore}</span></span>
              <div className="clear"></div>
            </div>
            <div className="progress">
              <div className="track"/>
              <div className="holder" style={{width:`${tempScore}%`}}>
                <div className="slider">
                </div>
              </div>
            </div>
          </div>
        )
      })
    } else {
      return null;
    }
  }

  renderApplicationScores(){
    const { planData = {} } = this.state;
    const { problem,studyDays,percent,receiveVoteCount,shareVoteCount,totalScore,integratedTotalScore,integratedShouldCount,
      integratedScore,integratedCompleteCount,chapterList,applicationTotalScore,applicationShouldCount,
      applicationScore,applicationCompleteCount} = planData;
    let renderArr = [];
    let appScore = this.calculatePercent(applicationScore,applicationTotalScore);

    let applications = (
      <div className="complete-item first">
        <div className="info">
          <span className="name">应用练习完成 <span className="clear-position"><span className="big-point">{applicationCompleteCount}</span></span> / {applicationShouldCount} 份，得分：</span>
          <span className="score"><span className="point number">{applicationScore}</span> / <span className="number">{applicationTotalScore}</span></span>
          <div className="clear"></div>
        </div>
        <div className="progress">
          <div className="track"/>
          <div className="holder"  style={{width:`${appScore}%`}}>
            <div className="slider">
            </div>
          </div>
        </div>
      </div>
    )

    let integrateScore = this.calculatePercent(integratedScore,integratedTotalScore);

    let integrates = (
      <div className="complete-item first">
        <div className="info">
          <span className="name">综合练习完成 <span className="clear-position"><span className="big-point">{integratedCompleteCount}</span></span> / {integratedShouldCount} 份，得分：</span>
          <span className="score"><span className="point number">{integratedScore}</span> / <span className="number">{integratedTotalScore}</span></span>
          <div className="clear"></div>
        </div>
        <div className="progress">
          <div className="track"/>
          <div className="holder" style={{width:`${integrateScore}%`}}>
            <div className="slider">
            </div>
          </div>
        </div>
      </div>
    );
    renderArr.push(applications);
    renderArr.push(integrates);
    return renderArr;


  }


  nextTask(){
    this.context.router.push("/rise/static/problem/explore")
  }


  goBack(){
    const { planId } = this.props.location.query;
    const {planData = {}} = this.state;
    this.context.router.push({
      pathname: '/rise/static/learn',
      query:{
        planId:planId?planId:planData.planId
      }
    });
  }
  render(){
    const { planData = {} } = this.state;
    const { problem,studyDays,percent,receiveVoteCount,shareVoteCount,totalScore,integratedTotalScore,integratedShouldCount,
      integratedScore,integratedCompleteCount,chapterList,applicationTotalScore,applicationShouldCount,
      applicationScore,applicationCompleteCount,pic} = planData;
    return (
      <div className="improvement-report">
        <div className="header">
          <img className="bg" src={`${pic}`}/>
          <div className="msg">
            <div className="title">
              学习报告
            </div>
            <div className="problem-title">
              小课：{problem}
            </div>
            <div className="sub-text">
              总得分：<span className="socre">{totalScore}</span> ，打败了的<span className="percent">{percent}</span>同学
            </div>
            <div className="time">
              学习时长：{studyDays===-1?'未完成':studyDays}
            </div>
          </div>
        </div>
        <div className="body-container">
          <div className="body">
            <div className="header">
              <span className="title">各章巩固练习得分</span>
              {/*<span className="question">?</span>*/}
            </div>
            {this.renderChapterScores()}
          </div>

          <div className="body" style={{marginTop:'36px'}}>
            <div className="header">
              <span className="title">应用练习&综合练习</span>
              {/*<span className="question">?</span>*/}
            </div>
            {this.renderApplicationScores()}
            <div className="vote-info">
              共送出 <span className="clear-position"><span className="big-point">{shareVoteCount}</span></span>个赞  收获 <span className="clear-position"><span className="big-point">{receiveVoteCount}</span></span>个赞
            </div>
          </div>
          <div className="tips">不错！你还可以拿到更多积分，点击右下角按钮，返回小课完成更多练习吧！</div>
          <div className="padding-footer" style={{height:'80px'}}/>
        </div>
        <div className="button-footer">
          <div className="left" onClick={this.nextTask.bind(this)}>学习下一小课</div>
          <div className="right" onClick={this.goBack.bind(this)}>返回完成练习题</div>
        </div>
      </div>
    )
  }
}

