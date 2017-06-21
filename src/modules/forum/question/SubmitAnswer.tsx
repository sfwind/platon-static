import * as React from "react";
import Editor from "../../../components/editor/Editor";
import { HeadArea, DialogHead } from "../commons/ForumComponent";

import "./SubmitAnswer.less";
import { getQuestion, submitAnswer } from "../async";

interface SubmitAnswerStates {
  question: object;
}
export default class SubmitAnswer extends React.Component<any, SubmitAnswerStates> {

  constructor() {
    super()
    this.state = {
      question: {}
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const questionId = this.props.location.query.questionId
    console.log('questionId', questionId)
    getQuestion(questionId).then(res => {
      console.log(res.msg)
      this.setState({ question: res.msg })
    })
  }

  handleClickSubmitAnswer(questionId) {
    const answerContent = this.refs.editor.getValue()
    submitAnswer(questionId, answerContent).then(res => {
      console.log(res)
      if(res.code === 200) {
        this.context.router.push({
          pathname: "/forum/answer",
          query: {questionId}
        })
      }
    })
  }

  render() {
    console.log(this.state.question)
    const { question } = this.state

    const {
      addTimeStr, answerCount = 0, answerList, authorHeadPic, authorUserName,
      description, followCount = 0, id, mine, topic
    } = question

    const renderQuestion = () => {
      console.log('id', id)
      if(!id) return

      return (
        <div className="ques-desc">
          <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={addTimeStr}/>
          <div className="ques-content">{description}</div>
        </div>
      )
    }

    const renderEditor = () => {
      return (
        <div className="editor">
          <Editor
            ref="editor"
            moduleId="4"
            uploadStart={() => {
            }}
            uploadEnd={() => {
            }}
            uploadError={() => {
            }}
            placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。全部完成后点下方按钮提交，才能对他人显示和得到专业点评！"
          />
        </div>
      )
    }

    return (
      <div className="submit-answer-container">
        <HeadArea content="跨行业跳槽应该注意设么"/>
        <div className="submit-answer-page">
          {renderQuestion()}
          {renderEditor()}
          <div>
            <div onClick={this.handleClickSubmitAnswer.bind(this, id)}>提交</div>
          </div>
        </div>
      </div>
    )
  }

}
