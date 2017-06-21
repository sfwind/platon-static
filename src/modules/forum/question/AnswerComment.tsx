import * as React from "react";

import "./AnswerComment.less"
import { HeadArea, DialogHead, DialogBottom } from "../commons/ForumComponent"
import { approveAnswer, commentAnswer, commentAnswerDel, disApproveAnswer, getAnswer } from "../async";
import Discuss from "../../practice/components/Discuss";

interface AnswerCommentState {
  answerInfo: object;
  // 评论列表
  commentlist: object;
  // 添加、回复评论
  answerId: number;
  comment: string;
  repliedCommentId: number;
  // 删除评论
  commentId: number;
  // 输入框提示
  placeholder: string;
  // 是否展示输入框
  showDiscussBox: boolean
}
const initDiscussBoxState = {
  answerId: null,
  comment: '',
  repliedCommentId: null,
  commentId: null,
  placeholder: '',
  showDiscussBox: false
}
export default class AnswerComment extends React.Component<any, AnswerCommentState> {

  constructor() {
    super()
    this.state = {
      answerInfo: {},
      commentlist: null,
      answerId: null,
      comment: '',
      repliedCommentId: null,
      commentId: null,
      placeholder: '',
      showDiscussBox: false
    }
  }

  componentWillMount() {
    const answerId = this.props.location.query.answerId
    getAnswer(answerId).then(res => {
      console.log(res.msg)
      if(res.code === 200) {
        this.setState({ answerInfo: res.msg, commentlist: res.msg.comments })
      }
    })
  }

  commentAnswer() {
    console.log(this.state)
    const { commentlist, answerId, comment, repliedCommentId } = this.state
    commentAnswer(answerId, comment, repliedCommentId).then(res => {
      console.log('comment', res)
      if(res.code === 200) {
        commentlist.push(res.msg)
        this.setState({ commentlist })
        this.handleClickHideDiscussBox()
      }
    })
  }

  commentAnswerDel(commentId, idx) {
    commentAnswerDel(commentId).then(res => {
      console.log(res)
      if(res.code === 200) {
        let removeNode = `commentRef${idx}`
        let rootNode = this.refs.commentlist
        rootNode.removeChild(this.refs[removeNode])
      }
    })
  }

  // 直接回复答案本身
  handleClickCommentAnswer(answerId) {
    this.setState(initDiscussBoxState, () => {
      this.setState({
        answerId: answerId,
        placeholder: '回复 answer',
        showDiscussBox: true
      })
    })
  }

  // 回复答案的某一条评论
  handleClickCommentReply(answerId, repliedCommentId) {
    console.log('参数', {answerId, repliedCommentId})
    this.setState(initDiscussBoxState, () => {
      this.setState({
        answerId: answerId,
        repliedCommentId: repliedCommentId,
        placeholder: '回复 comment',
        showDiscussBox: true
      })
    })
  }

  // 隐藏输入框，并初始化 state 中的值
  handleClickHideDiscussBox() {
    this.setState(initDiscussBoxState)
  }

  // 编辑器内部内容映射到当前组件
  handleOnchangeDicussBoxValue(value) {
    this.setState({
      comment: value
    })
  }

  render() {
    const {
      answerInfo, commentlist, answerId, comment, repliedCommentId,
      commentId, placeholder, showDiscussBox
    } = this.state
    const {
      answer, approval, authorHeadPic, authorUserName, comments,
      id, mine, publishTimeStr, questionId, topic
    } = answerInfo
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
            btn1ImgUrl={``} btn1Content={`回复`} btn1ContentFunc={this.handleClickCommentAnswer.bind(this, id)}
            btn2ImgUrl={``} btn2Content={btn2Content} btn2ContentFunc={changeBtn2Content}
          />
        </div>
      )
    }

    const renderAnswerComments = () => {
      if(!commentlist) return

      return (
        <div className="ans-comment-list" ref="commentlist">
          {
            commentlist.map((commentItem, idx) => {
              const {
                answerId, authorHeadPic, authorUserName, comment, id,
                publishTimeStr
              } = commentItem

              return (
                <div className="ans-comment-desc" ref={`commentRef${idx}`}>
                  <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={publishTimeStr}/>
                  <div className="ans-comment-content">{comment}</div>

                  <DialogBottom
                    btn1ImgUrl={``} btn1Content={`删除`}
                    btn1ContentFunc={this.commentAnswerDel.bind(this, commentItem.id, idx)}
                    btn2ImgUrl={``} btn2Content={`回复`}
                    btn2ContentFunc={this.handleClickCommentReply.bind(this, this.state.answerInfo.id, commentItem.id)}/>
                </div>
              )
            })
          }
        </div>
      )
    }

    const renderDiscussBox = () => {
      if(showDiscussBox) {
        return (
          <Discuss
            placeholder={placeholder} onChange={(v) => this.handleOnchangeDicussBoxValue(v)}
            submit={this.commentAnswer.bind(this)}
            cancel={this.handleClickHideDiscussBox.bind(this)}/>
        )
      }
    }

    return (
      <div className="ans-comment-container">
        <HeadArea content={topic}/>
        <div className="ans-comment-page">
          {renderAnswer()}
          {renderAnswerComments()}
        </div>
        {renderDiscussBox()}
      </div>
    )
  }

}
