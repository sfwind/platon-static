import * as React from "react";
import AssetImg from "../../../components/AssetImg";
import { DialogHead } from "../commons/ForumComponent";

import "./Question.less";
import { getAllQuestions } from "../async";

interface QuestionStates {
  questions: object;
}
export default class Question extends React.Component<any, QuestionStates> {

  constructor() {
    super()
    this.state = { questions: [] }
  }

  componentWillMount() {
    getAllQuestions().then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({ questions: msg })
      }
    }).catch(e => {
      console.error(e)
    })
  }

  render() {
    const { questions } = this.state

    console.log(questions)

    const renderQuestionList = () => {
      return (
        <div className="ques-list">
          {
            questions.map((question, idx) => {
              let rightContent = question.follow ? '已关注' : '关注问题'

              return (
                <div className="ques-desc" key={idx}>
                  <DialogHead
                    leftImgUrl={question.authorHeadPic} user={question.authorUserName} time={question.addTimeStr}
                    rightImgUrl={``} rightContent={rightContent} rightContentFunc={() => console.log(1) }
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
