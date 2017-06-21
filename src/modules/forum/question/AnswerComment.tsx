import * as React from "react";

import "./AnswerComment.less"
import { HeadArea, DialogHead, DialogBottom } from "../commons/ForumComponent"
import { approveAnswer, disApproveAnswer, getAnswer } from "../async";

interface AnswerCommentState {
  answerInfo: object;
}
export default class AnswerComment extends React.Component<any, AnswerCommentState> {

  constructor() {
    super()
    this.state = { answerInfo: {} }
  }

  componentWillMount() {
    const answerId = 2
    getAnswer(answerId).then(res => {
      console.log(res.msg)
      if(res.code === 200) {
        this.setState({ answerInfo: res.msg })
      }
    })
  }

  render() {
    const {
      answer, approval, authorHeadPic, authorUserName, comments,
      id, mine, publishTimeStr, questionId, topic = '跨行业跳槽应该注意什么'
    } = this.state.answerInfo

    const renderAnswer = () => {
      if(!answer) return

      let tag = approval
      let btn2Content = approval ? '已赞同' : '赞同'
      const changeBtn2Content = () => {
        if(tag) {
          disApproveAnswer(id).then(res => {
            if(res.code === 200) tag = !tag
          })
        } else {
          approveAnswer(id).then(res => {
            if(res.code === 200) tag = !tag
          })
        }
        return tag ? '赞同' : '已赞同'
      }

      return (
        <div className="ans-desc">
          <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={publishTimeStr}/>
          <div className="ans-content">{answer}</div>
          <DialogBottom
            leftContent={`收起`} leftContentFunc={() => console.log("收起")}
            btn1ImgUrl={``} btn1Content={`回复`} btn1ContentFunc={() => console.log('回复')}
            btn2ImgUrl={``} btn2Content={btn2Content} btn2ContentFunc={changeBtn2Content}
          />
        </div>
      )
    }

    const renderAnswerComments = () => {
      if(!comments) return

      return (
        <div className="ans-comment-list">
          {
            comments.map((commentItem, idx) => {
              const {
                answerId, authorHeadPic, authorUserName, comment, id,
                publishTimeStr
              } = commentItem

              return (
                <div className="ans-comment-desc">
                  <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={publishTimeStr}/>
                  <div className="ans-comment-content">{comment}</div>
                  <DialogBottom btn2ImgUrl={``} btn2Content={`回复`} btn2ContentFunc={() => console.log('回复')}/>
                </div>
              )
            })
          }
        </div>
      )
    }

    return (
      <div className="ans-comment-container">
        <HeadArea content={topic}/>
        <div className="ans-comment-page">
          {renderAnswer()}
          {renderAnswerComments()}
        </div>
      </div>
    )
  }

}
