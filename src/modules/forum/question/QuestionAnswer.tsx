import * as React from "react";

import "./QuestionAnswer.less"
import { DialogHead, DialogBottomBtn, DialogBottomIcon, PullSlideTip, ForumButton } from "../commons/ForumComponent";
import { approveAnswer, disApproveAnswer, disFollow, follow, getQuestion, submitAnswer } from "../async";
import Editor from "../../../components/editor/Editor";

interface QuestionAnswerStates {
  question: object;
  // 弹出答案书写框
  questionWritable: boolean;
}
let isExpandQuestion = false
export default class QuestionAnswer extends React.Component<any, QuestionAnswerStates> {

  constructor() {
    super()
    this.state = {
      question: {},
      questionWritable: false,
      btn2Content:'',
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const questionId = this.props.location.query.questionId;
    getQuestion(questionId).then(res => {
      const question = res.msg;
      let content = '';
      if(question.answered){
        content = '编辑我的回答';
      }else{
        content = '回答';
      }
      this.setState({ question: res.msg, btn2Content: content })
    })
  }

  // 添加新的回答
  handleClickAddNewAnswer() {
    let content = '';
    if(this.state.questionWritable){
      content = '回答';
    } else{
      content = '取消回答';
    }
    this.setState({
      questionWritable:!this.state.questionWritable, btn2Content:content
    })
  }

  // 编辑自己的回答
  handleClickEditSelfAnswer() {
    let content = '';
    if(this.state.questionWritable){
      content = '编辑我的回答';
    } else{
      content = '取消回答';
    }
    this.setState({
      questionWritable:!this.state.questionWritable, btn2Content:content
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

  submitAnswer(questionId) {
    const answer = this.refs.editor.getValue();
    submitAnswer(questionId, answer).then(res => {
      console.log(res)
    })
  }

  render() {
    const { question, questionWritable, btn2Content } = this.state;

    const {
      addTimeStr, answerCount = 0, answerList, answered, authorHeadPic, authorUserName,
      description, followCount = 0, id, mine, topic
    } = question;

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
            btn2Content={btn2Content}
            btn2ContentFunc={answered ? this.handleClickEditSelfAnswer.bind(this) : this.handleClickAddNewAnswer.bind(this)}
          />
        </div>
      )
    }

    const renderAnswerTips = () => {
      if(questionWritable) return
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
      if(questionWritable) return
      return (
        <div className="answer-list">
          {
            answerList.map((answerItem, idx) => {
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
                } else {
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
          <PullSlideTip isEnd={true}/>
        </div>
      )
    }

    const renderAnswerWriteBox = () => {
      if(!questionWritable) return
      return (
        <div className="answer-editor">
          <Editor
            ref="editor"
            moduleId="6"
            maxLength="10000"

            placeholder="写下该问题的答案呢（1000字以内）。"
          />
          <ForumButton content="提交" clickFunc={this.submitAnswer.bind(this, question.id)}/>
        </div>
      )
    }

    // onUploadError={(res)=>{this.props.dispatch(alertMsg(res.msg))}}
    // uploadStart={()=>{this.props.dispatch(startLoad())}}
    // uploadEnd={()=>{this.props.dispatch(endLoad())}}

    return (
      <div className="answer-container">
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
          {renderAnswerWriteBox()}
        </div>
      </div>
    )
  }

}
