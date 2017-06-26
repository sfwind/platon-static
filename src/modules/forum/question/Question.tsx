import * as React from "react";
import {connect} from "react-redux";
import PullElement from 'pull-element';
import { ToolBar } from "../../base/ToolBar";
import { DialogHead, PullSlideTip } from "../commons/ForumComponent";
import { disFollow, follow, getAllQuestions, getQuestion } from "../async";
import { mark } from "../../../utils/request"
import { splitText ,removeHtmlTags} from "../../../utils/helpers"
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import _ from "lodash";

import "./Question.less";

// let pullElement = null
interface QuestionStates {
  questions: object;
  // 分页获取 Question 列表分页数
  page: number;
  // 是否已是最后一页
  end: boolean;
}

@connect(state => state)
export default class Question extends React.Component<any, QuestionStates> {

  constructor() {
    super()
    this.state = {
      questions: [],
      page: 1,
      end: false
    }
    this.pullElement = null
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({module: "打点", function: "论坛", action: "打开问题列表页"});
    const {dispatch, location} = this.props;
    const {questionId} = location.query;
    let questions = [];
    dispatch(startLoad());
    if(questionId){
      getQuestion(questionId).then(res=>{
        if(res.code===200){
          questions.push(res.msg);
        }else{
          dispatch(alertMsg(res.msg));
        }
      }).catch(e => {
        dispatch(alertMsg(e));
      })
    }

    getAllQuestions().then(res => {
      dispatch(endLoad());
      const { code, msg } = res;
      if(code === 200) {
        if(questionId){
          _.remove(res.msg.list, (item) => {
            return item.id == questionId;
          });
        }
        this.setState({ questions: questions.concat(msg.list) })
      }else{
        dispatch(alertMsg(res.msg));
      }
    }).catch(e => {
      dispatch(alertMsg(e));
      dispatch(endLoad());
    })
  }

  componentDidUpdate() {
    const {dispatch, location} = this.props;
    if(!this.pullElement) {
      this.pullElement = new PullElement({
        target: '.question-page',
        scroller: '.question-page',
        // trigger: '.pull-slide-tips',
        damping: 4,
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUp: (data) => {
          if(this.props.iNoBounce){
            if(this.props.iNoBounce.isEnabled()){
              this.props.iNoBounce.disable();
            }
          }
        },
        onPullUpEnd: () => {
          getAllQuestions(this.state.page + 1).then(res => {
            const { code, msg } = res;
            const {questionId} = location.query;
            if(code === 200) {
              if(questionId){
                _.remove(res.msg.list, (item) => {
                  return item.id == questionId;
                });
              }
              this.setState({
                questions: this.state.questions.concat(msg.list),
                page: this.state.page + 1,
                end: msg.end
              })
            }
          }).catch(e => {
            dispatch(alertMsg(e));
            dispatch(endLoad());
          })
          if(this.props.iNoBounce){
            if(!this.props.iNoBounce.isEnabled()){
              this.props.iNoBounce.enable();
            }
          }
        }
      })
      this.pullElement.init();
    }
    if(this.pullElement && this.state.end) {
      this.pullElement.destroy();
    }
  }

  handleClickGoQuestionInitPage() {
    this.context.router.push("/forum/static/question/init")
  }

  handleClickGoAnswerPage(questionId) {
    this.context.router.push({
      pathname: "/forum/static/answer",
      query: { questionId }
    })
  }

  handleClickFeedback(){
    mark({module: "打点", function: "论坛", action: "点击意见反馈"});
    window.location.href=`https://${window.location.hostname}/survey/wjx?activity=15135162 `
  }

  // 特殊组件
  renderOtherComponents() {
    return (
      <div>
        <div style={{ height: '50px' }} className="padding-footer"/>
        <ToolBar/>
      </div>
    )
  }

  render() {
    const { questions } = this.state

    const renderQuestionList = () => {
      return (
        <div className="ques-list">
          {
            questions.map((questionItem, idx) => {
              const {
                addTimeStr, answerCount, answerTips, authorHeadPic, authorUserName,
                description, id, mine, topic
              } = questionItem

              // 如果是已关注，则显示已关注
              let tag = questionItem.follow
              let rightContent = tag ? '已关注' : '关注'
              const changeFollowStatus = () => {
                if(tag) {
                  // 已关注的情况，则调用取消关注接口
                  disFollow(id)
                } else {
                  // 未关注的情况，则调用关注接口
                  follow(id)
                }
                tag = !tag
                return tag ? '已关注' : '关注'
              }
              return (
                <div>
                  <div className="ques-desc" key={idx}>
                    <DialogHead
                      leftImgUrl={authorHeadPic} user={authorUserName} time={addTimeStr}
                      disableContentValue={`已关注`} rightContent={rightContent} rightContentFunc={changeFollowStatus}
                    />
                    <div className="ques-title" onClick={this.handleClickGoAnswerPage.bind(this, id)}>{splitText(removeHtmlTags(topic), 38)}</div>
                    <div className="ques-content" onClick={this.handleClickGoAnswerPage.bind(this, id)}>
                      {splitText(removeHtmlTags(description), 20)}
                    </div>
                    <div className="ques-answer-persons" onClick={this.handleClickGoAnswerPage.bind(this, id)}>
                      {answerTips}
                    </div>
                  </div>
                  <GreyBanner height="10px"/>
                </div>
              )
            })
          }
        </div>
      )
    }

    return (
      <div className="question-container">
        <div className="question-feedback" onClick={()=>this.handleClickFeedback()}><span>意见反馈&nbsp;&gt;</span></div>
        <div className="question-page" style={{height: window.innerHeight - 26 - 50}}>
          <div className="ques-nav">
            <div className="ques-nav-desc">有一个新问题？点这里提问吧</div>
            <div className="ques-nav-btn" onClick={this.handleClickGoQuestionInitPage.bind(this)}>去提问</div>
          </div>
          <GreyBanner height={20}/>
          {renderQuestionList()}
          <PullSlideTip isEnd={this.state.end}/>
        </div>
        {this.renderOtherComponents()}
      </div>
    )
  }

}

class GreyBanner extends React.Component<{ height: number }, any> {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="grey-banner" style={{ height: this.props.height }}/>
    )
  }
}

