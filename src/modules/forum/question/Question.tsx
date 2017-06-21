import * as React from "react";
import AssetImg from "../../../components/AssetImg";
import { DialogHead } from "../commons/ForumComponent";
import { disFollow, follow, getAllQuestions } from "../async";

import "./Question.less";

interface QuestionStates {
  questions: object;
}
export default class Question extends React.Component<any, QuestionStates> {

  constructor() {
    super()
    this.state = {
      questions: [],
    }
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

  render() {
    const { questions } = this.state

    const renderQuestionList = () => {
      return (
        <div className="ques-list">
          {
            questions.map((question, idx) => {
              // 如果是已关注，则显示已关注
              let tag = question.follow
              let rightContent = tag ? '已关注' : '关注问题'
              const changeFollowStatus = () => {
                if(tag) {
                  // 已关注的情况，则调用取消关注接口
                  disFollow(question.id).then(res => {
                    if(res.code === 200) {
                      tag = !tag
                    }
                  })
                } else {
                  // 未关注的情况，则调用关注接口
                  follow(question.id).then(res => {
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
                    leftImgUrl={question.authorHeadPic} user={question.authorUserName} time={question.addTimeStr}
                    rightImgUrl={``} rightContent={rightContent} rightContentFunc={changeFollowStatus}
                  />
                  <div className="ques-title">{question.topic}</div>
                  <div className="ques-content">{question.description}</div>
                  <div className="ques-answer-persons" onClick={() => console.log(`question persons`)}>
                    {question.answerTips}
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
            <div className="ques-nav-desc">提问</div>
          </div>
          {renderQuestionList()}
        </div>
      </div>
    )
  }

}


