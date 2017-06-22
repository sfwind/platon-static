import * as React from "react";
import PullElement from 'pull-element';
import { ToolBar } from "../../base/ToolBar";
import { DialogHead, PullSlideTip } from "../commons/ForumComponent";
import { disFollow, follow, getAllQuestions } from "../async";
import { splitText } from "../../../utils/helpers"

import "./Question.less";

// let pullElement = null
interface QuestionStates {
  questions: object;
  // 分页获取 Question 列表分页数
  page: number;
  // 是否已是最后一页
  end: boolean;
}
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
    getAllQuestions().then(res => {
      console.log("getAllQuestions", res.msg.list)
      const { code, msg } = res
      if(code === 200) {
        this.setState({ questions: msg.list })
      }
    }).catch(e => {
      console.error(e)
    })
  }

  componentDidUpdate() {
    if(!this.pullElement) {
      this.pullElement = new PullElement({
        target: '.question-container',
        scroller: '.question-container',
        damping: 4,
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUpEnd: () => {
          getAllQuestions(this.state.page + 1).then(res => {
            const { code, msg } = res
            if(code === 200) {
              this.setState({
                questions: this.state.questions.concat(msg.list),
                page: this.state.page + 1,
                end: msg.end
              })
            }
          })
        }
      })
      this.pullElement.init();
    }
    if(this.pullElement && this.state.end) {
      this.pullElement.disable();
    }
  }

  handleClickGoQuestionInitPage() {
    this.context.router.push("/forum/question/init")
  }

  handleClickGoAnswerPage(questionId) {
    this.context.router.push({
      pathname: "/forum/answer",
      query: { questionId }
    })
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
              console.log(questionItem)
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
                  disFollow(id).then(res => {
                    if(res.code === 200) {
                      tag = !tag
                    }
                  })
                } else {
                  // 未关注的情况，则调用关注接口
                  follow(id).then(res => {
                    if(res.code === 200) {
                      tag = !tag
                    }
                  })
                }
                return tag ? '关注' : '已关注'
              }
              return (
                <div>
                  <div className="ques-desc" key={idx}>
                    <DialogHead
                      leftImgUrl={authorHeadPic} user={authorUserName} time={addTimeStr}
                      disableContentValue={`已关注`} rightContent={rightContent} rightContentFunc={changeFollowStatus}
                    />
                    <div className="ques-title">{splitText(topic, 38)}</div>
                    <div className="ques-content" onClick={this.handleClickGoAnswerPage.bind(this, id)}>
                      {splitText(description, 20)}
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
        <div className="question-feedback"><span>意见反馈&nbsp;&gt;</span></div>
        <div className="question-page">
          <div className="ques-nav">
            <div className="ques-nav-desc">看完还是没有解决你的疑问？点这里提问吧</div>
            <div className="ques-nav-btn" onClick={this.handleClickGoQuestionInitPage.bind(this)}>去提问</div>
          </div>
          <GreyBanner height={20}/>
          {renderQuestionList()}
          {console.log('end state', this.state.end)}
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

