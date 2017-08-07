import * as React from 'react';
import { connect } from 'react-redux';
import './ImprovementReport.less'
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { loadRecommendations, queryReport } from './async'
import { Modal } from '../../components/Modal'
import { isNumber, merge } from 'lodash';
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { NumberToChinese } from '../../utils/helpers'
import AssetImg from "../../components/AssetImg";
import { mark } from "../../utils/request";
const numeral = require('numeral');

@connect(state => state)
export class ImprovementReport extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {};
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { planId, problemId } = this.props.location.query;
    const { dispatch } = this.props;
    dispatch(startLoad());
    queryReport(planId).then((res) => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ planData: res.msg });
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
    // 小课推荐测试用，可保留
    // loadRecommendations(problemId).then(res => {
    //   if(res.code === 200) {
    //     this.setState({recommendations: res.msg})
    //   } else {
    //     dispatch(alertMsg(res.msg))
    //   }
    // }).catch(e => {
    //   dispatch(alertMsg(e))
    // })
    this.picHeight = (window.innerWidth / (750 / 350)) > 175 ? 175 : (window.innerWidth / (750 / 350))
  }

  renderChapterScores() {
    const { planData = {} } = this.state;
    const {
      chapterList
    } = planData;
    if(chapterList) {
      return chapterList.map((item, key) => {
        let clazz = 'complete-item ' + (key === 0 ? 'first' : '');
        return (
          <div className={clazz}>
            <div className="info">
              <span className="name">{NumberToChinese(item.chapter)}、{item.name}</span>
              <div className="clear"/>
            </div>
            <Progress progressStyle={{ width: `${window.innerWidth - 170}px` }} score={item.myWarmScore}
                      totalScore={item.totalWarmScore}/>
          </div>
        )
      })
    } else {
      return null;
    }
  }

  renderApplicationScores() {
    const { planData = {} } = this.state;
    const {
      applicationTotalScore, applicationShouldCount,
      applicationScore, applicationCompleteCount
    } = planData;
    let renderArr = [];

    let applications = (
      <div className="complete-item first">
        <div className="info">
          <span className="name">应用题完成 <span
            className="big-point">{applicationCompleteCount}</span> / {applicationShouldCount} 份，得分：</span>
          <div className="clear"/>
        </div>
        <Progress holderClass="article" progressStyle={{ width: `${window.innerWidth - 170}px` }}
                  score={applicationScore}
                  totalScore={applicationTotalScore}/>
      </div>
    )

    renderArr.push(applications);
    return renderArr;
  }

  chooseNew() {
    const { planData = {}, showConfirmModal } = this.state;
    const { dispatch } = this.props;
    const { status, mustStudyDays } = planData;
    if(status !== 1 && isNumber(mustStudyDays) && mustStudyDays !== 0) {
      dispatch(alertMsg(`学得太猛了，再复习一下吧<br/>本小课推荐学习天数至少为${mustStudyDays}天<br/>之后就可以开启下一小课了`))
    } else {
      this.setState({ showConfirmModal: true })
    }
  }

  goBack() {
    window.history.back();
  }

  nextPlan() {
    const { dispatch, location } = this.props
    const { planId } = location.query
    this.context.router.push("/rise/static/problem/explore")
  }

  closeConfirmModal() {
    this.setState({ showConfirmModal: false });
  }

  handleClickClose(){
    this.context.router.push("/rise/static/learn")
  }

  renderBtns() {
    return (
      <div className="button-footer">
        <div className="left" onClick={()=>this.handleClickClose()}>关闭</div>
        <div className="right" onClick={this.goBack.bind(this)}>返回</div>
      </div>
    )
  }

  render() {
    const { planData = {}, showConfirmModal } = this.state;
    const {
      problem, studyDays, percent, receiveVoteCount, shareVoteCount, totalScore, integratedTotalScore, integratedShouldCount,
      integratedScore, integratedCompleteCount, chapterList, applicationTotalScore, applicationShouldCount,
      applicationScore, applicationCompleteCount, pic, showNextBtn, votedScore, recommendations, doneAllApps
    } = planData;

    const renderRecommendation = () => {
      if(!recommendations) return
      return (
        recommendations.map((recommendation, idx) => {
          const { description, recommendProblems } = recommendation
          return (
            <div className="recommend-box" key={idx}>
              <div className="recommend-descrip">{description}</div>
              {
                recommendProblems.map((problem, idx) => {
                  return (
                    <div className="recommend-problem" key="idx">
                      <div className="problem-img">
                        <AssetImg url={problem.pic} height={63}/>
                      </div>
                      <div className="problem-problem">{problem.problem}</div>
                      <div className="problem-view"
                           onClick={() => {
                             mark({module: "打点", function: "小课推荐进入小课学习", action: `${problem.id}`});

                             {/*window.location.href = `https://${window.location.hostname}/rise/static/plan/view?id=${problem.id}`*/}
                             this.context.router.push({
                               pathname: `/rise/static/plan/view`,
                               query: {
                                 id: problem.id
                               }
                             })
                           }}>查看
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      )
    }



    const renderTips = () => {
      if(doneAllApps){
        return <span>哇哦！你完成了全部的【应用题】，这是赤裸裸秒杀99%同学的节奏！</span>;
      } else {
        return <span>不要在小课完成后，就放松对这些知识的学习哦！<br/>你还可以在已完成列表中，进入小课补作业（偷偷告诉你：补完的作业依然可以获得积分～）</span>;
      }
    };

    return (
      <div className="improvement-report">
        <Modal show={showConfirmModal}
               height={240}
               buttons={[
                 { click: () => this.nextPlan(), content: "确定" },
                 { click: () => this.closeConfirmModal(), content: "取消" }
               ]}>
          <div className="content" style={{ marginTop: '0px' }}>
            <div className="text">确定开始下一小课吗？</div>
          </div>
          <div className="content2">
            <div className="text2">当前小课可以进入我的-我的小课中复习</div>
          </div>
        </Modal>

        <div className="header" style={{ height: this.picHeight }}>
          <img className="bg" src={`https://static.iqycamp.com/images/study_report_bg.jpeg`}/>
          <div className="msg">
            <div className="title">学习报告</div>
            <div className="problem-title">小课：{problem}</div>
            <div className="sub-text">
              总得分：<span className="socre top">{totalScore}</span> ，打败了<span className="percent"> {percent}% </span>的同学
            </div>
            <div className="time">学习时长：{studyDays === -1 ? '30天' : `${studyDays} 天`}</div>
          </div>
        </div>
        <div className="body-container">
          <div className="body">
            <div className="header"><span className="title">各章选择题得分</span></div>
            {this.renderChapterScores()}
          </div>

          <div className="body" style={{ marginTop: '36px' }}>
            <div className="header">
              <span className="title">应用题</span>
            </div>
            {this.renderApplicationScores()}
            <div className="vote-info">
              共送出 <span className="big-point">{shareVoteCount}</span> 个赞，收获 <span
              className="big-point">{receiveVoteCount}</span> 个赞<br/>
              获得 <span className="big-point">{votedScore}</span> 积分 <span className="tips">（1被赞=2积分）</span>
            </div>
          </div>

          <div className="body">
            <div className="header"><span className="title">推荐学习</span></div>
            {renderRecommendation()}
          </div>
          <div className="tips">{renderTips()}</div>
          <div className="padding-footer" style={{height:'50px'}}/>
        </div>
        {this.renderBtns()}
      </div>
    )
  }

}

// 当前分和总分比
class Progress extends React.Component<any, any> {

  constructor() {
    super()
  }

  calculatePercent(score, total) {
    let tempScore = score / total;
    if(isNumber(tempScore)) {
      tempScore = tempScore < 0 ? 0 : tempScore > 1 ? 1 : tempScore
      tempScore = numeral(tempScore * 100).format('0.00');
    } else {
      tempScore = 0;
    }
    return tempScore;
  }

  render() {
    const { holderClass, score, totalScore } = this.props
    let progressStyle = merge({ width: '50%' }, this.props.progressStyle);

    return (
      <div>
        <div className="progress" style={progressStyle}>
          <div className="track"/>
          <div className={`holder ${holderClass ? holderClass : ''}`}
               style={{ width: `${this.calculatePercent(score, totalScore)}%` }}>
          </div>
        </div>
        <span className="score" style={{ width: '65px' }}>
          <span className="point number">{score}</span>&nbsp;/&nbsp;<span className="number">{totalScore}</span>
        </span>
      </div>
    )
  }

}
