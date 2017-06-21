import * as React from "react";

import "./QuestionAnswer.less"
import { DialogHead, DialogBottom, HeadArea } from "../commons/ForumComponent";
import { approveAnswer, disApproveAnswer, disFollow, follow, getQuestion } from "../async";

interface QuestionAnswerStates {
  question: object;
}
export default class QuestionAnswer extends React.Component<any, QuestionAnswerStates> {

  constructor() {
    super()
    this.state = {
      question: {}
    }
  }

  componentWillMount() {
    const questionId = 7
    getQuestion(questionId).then(res => {
      console.log(res.msg)
      this.setState({ question: res.msg })
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
      if(!answerList) return
      let tag = question.follow
      let btn2Content = tag ? '已关注' : '关注问题'

      const changeBtn2Content = () => {
        if(mine) {
          return "编辑"
        } else {
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
      }

      return (
        <div className="ques-desc">
          <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={addTimeStr}/>
          <div className="ques-content">{description}</div>
          <DialogBottom
            leftContent={`${answerCount}讨论 ${followCount}关注`}
            btn1ImgUrl={``} btn1Content={`回答`} btn1ContentFunc={() => console.log(`回答`)}
            btn2ImgUrl={``} btn2Content={btn2Content} btn2ContentFunc={changeBtn2Content}
          />
        </div>
      )
    }

    const renderAnswerTips = () => {
      return (
        <div className="answer-tips">
          <span>该问题还没有讨论，你可以：</span>
          <span>1.回答作者</span>
          <span>2.关注问题，有新的讨论会通知你</span>
        </div>
      )
    }

    const renderAnswers = () => {
      if(!answerList) return

      return (
        <div className="answer-list">
          {
            answerList.map((answerItem, idx) => {
              const {answer, approval, approvalCount, authorHeadPic, authorUserName, id, publishTimeStr} = answerItem

              let tag = approval
              let btn2Content = approval ? '已赞同' : '赞同'
              const changeBtn2Content = () => {
                if(tag) {
                  // 已赞同，则取消赞同
                  disApproveAnswer(id).then(res => {
                    if(res.code === 200) tag = !tag
                  })
                } else {
                  // 还未赞同，点击赞同
                  approveAnswer(id).then(res => {
                    if(res.code === 200) tag = !tag
                  })
                }
                return tag ? '赞同' : '已赞同'
              }
              return (
                <div className="answer-desc" key={idx}>
                  <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={publishTimeStr}/>
                  <div className="answer-content">{answer}</div>
                  <DialogBottom
                    leftContent={`展开`} leftContentFunc={() => {console.log('展开')}}
                    btn1ImgUrl={``} btn1Content={`评论`} btn1ContentFunc={() => console.log(`评论`)}
                    btn2ImgUrl={``} btn2Content={btn2Content} btn2ContentFunc={changeBtn2Content}
                  />
                </div>
              )
            })
          }
        </div>
      )
    }

    return (
      <div className="answer-container">
        <HeadArea content={topic}/>
        <div className="answer-page">
          {renderQuestion()}
          {/* 如果不存在任何评论，则展示 tips */}
          {
            answerCount === 0 ?
              renderAnswerTips() :
              renderAnswers()
          }
        </div>
      </div>
    )
  }

}
