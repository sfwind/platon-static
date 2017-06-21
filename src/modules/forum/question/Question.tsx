import * as React from "react";
import AssetImg from "../../../components/AssetImg";
import PullElement from 'pull-element'
import { DialogHead } from "../commons/ForumComponent";
import { disFollow, follow, getAllQuestions } from "../async";

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
      page: 1
    }
    this.pullElement=null
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
            const {code, msg} = res
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
              let rightContent = tag ? '已关注' : '关注问题'
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
                return tag ? '关注问题' : '已关注'
              }
              return (
                <div className="ques-desc" key={idx}>
                  <DialogHead
                    leftImgUrl={authorHeadPic} user={authorUserName} time={addTimeStr}
                    rightImgUrl={``} rightContent={rightContent} rightContentFunc={changeFollowStatus}
                  />
                  <div className="ques-title">{topic}</div>
                  <div className="ques-content" onClick={this.handleClickGoAnswerPage.bind(this, id)}>
                    {description}
                  </div>
                  <div className="ques-answer-persons" onClick={this.handleClickGoAnswerPage.bind(this, id)}>
                    {answerTips}
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    }

    return (
      <div className="question-container">
        <div className="question-page">
          <div className="ques-nav">
            <div className="ques-nav-img"><AssetImg url="" height={30} width={40}/></div>
            <div className="ques-nav-desc" onClick={this.handleClickGoQuestionInitPage.bind(this)}>提问</div>
          </div>
          {renderQuestionList()}
        </div>
      </div>
    )
  }

}


