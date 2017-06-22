import * as React from "react";

import "./QuestionAnswer.less"
import { DialogHead, DialogBottomBtn, DialogBottomIcon } from "../commons/ForumComponent";
import { approveAnswer, disApproveAnswer, disFollow, follow, getQuestion } from "../async";

interface QuestionAnswerStates {
  question: object;
}
let isExpandQuestion = false
export default class QuestionAnswer extends React.Component<any, QuestionAnswerStates> {

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
    getQuestion(questionId).then(res => {
      console.log(res.msg)
      this.setState({ question: res.msg })
    })
  }

  handleClickGoSubmitAnswerPage(questionId) {
    this.context.router.push({
      pathname: "/forum/answer/submit",
      query: { questionId }
    })
  }

  handleClickGoAnswerCommentPage(answerId) {
    this.context.router.push({
      pathname: "/forum/answer/comment",
      query: { answerId }
    })
  }

  handleClickExpandQuestion() {
    if(isExpandQuestion) {
      console.log('收起了区域')
    } else {
      console.log('展开了区域')
    }
    isExpandQuestion = !isExpandQuestion
    return isExpandQuestion ? "收起" : "展开"
  }

  render() {
    const { question } = this.state

    const {
      addTimeStr, answerCount = 0, answerList, answered, authorHeadPic, authorUserName,
      description, followCount = 0, id, mine, topic
    } = question

    const renderQuestion = () => {
      if(!answerList) return

      // 折叠展开逻辑，默认折叠状态
      let isExpand = false
      const changeLeftContent = () => {
        // 展开状态，点击则折叠区域，并返回 `展开`
        if(isExpand) {
          console.log("收起了区域")
        } else {
          console.log("展开了区域")
        }
        isExpand = !isExpand
        return isExpand ? "收起" : "展开"
      }

      // 是否已关注状态
      let tag = question.follow
      let btn1Content = tag ? '已关注' : '关注'
      const changeBtn1Content = () => {
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
          return tag ? '关注' : '已关注'
        }
      }

      return (
        <div className="ques-desc">
          <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={addTimeStr}/>
          <div className="ques-content">{description}</div>
          <DialogBottomBtn
            leftContent={`展开`} leftContentFunc={this.handleClickExpandQuestion.bind(this)}
            btn1DisableValue={`已关注`} btn1Content={btn1Content} btn1ContentFunc={changeBtn1Content}
            btn2DisableValue={`已回答`} btn2Content={answered ? `已回答` : `回答`}
            btn2ContentFunc={answered ? undefined : this.handleClickGoSubmitAnswerPage.bind(this, id)}
          />
        </div>
      )
    }

    const renderAnswerTips = () => {
      return (
        <div className="answer-tips">
          <span>该问题还没有答案，你可以</span>
          <span>1.回答问题</span>
          <span>2.点击关注，有新的回答时会通知你</span>
        </div>
      )
    }

    const renderAnswers = () => {
      if(!answerList) return

      return (
        <div className="answer-list">
          {
            answerList.map((answerItem, idx) => {
              console.log(answerItem)
              const { answer, approval, approvalCount, authorHeadPic, authorUserName, commentCount, id, publishTimeStr } = answerItem
              let tag = approval
              let comment = 'https://static.iqycamp.com/images/fragment/comment.png?imageslim'
              let unvote = 'https://static.iqycamp.com/images/fragment/unvote.png?imageslim'
              let voted = 'https://static.iqycamp.com/images/fragment/voted.png?imageslim'
              let btn2ImgUrl = approval ? voted : unvote
              const changeBtn2ImgUrl = () => {
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
                return tag ? unvote : voted
              }

              let isExpand = false
              const expandComment = () => {
                if(isExpand) {
                  console.log('收起')
                } else  {
                  console.log('展开')
                }
                isExpand = !isExpand
                return isExpand ? "收起" : "展开"
              }

              return (
                <div className="answer-desc" key={idx}>
                  <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={publishTimeStr}/>
                  <div className="answer-content">{answer}</div>
                  <DialogBottomIcon
                    leftContent={`展开`} leftContentFunc={expandComment}
                    btn1ImgUrl={comment} btn1Content={commentCount}
                    btn1ContentFunc={this.handleClickGoAnswerCommentPage.bind(this, answerItem.id)}
                    btn2ImgUrl={btn2ImgUrl} btn2Content={approvalCount} btn2ContentFunc={changeBtn2ImgUrl}
                  />
                </div>
              )
            })
          }
        </div>
      )
    }

    return (
      <div className="answer-container" style={{ height: window.innerHeight }}>
        <div className="answer-page">
          <div className="answer-head-topic">{topic}</div>
          {renderQuestion()}
          <div className="grey-banner" style={{ height: 10 }}/>
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
