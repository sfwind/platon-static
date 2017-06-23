import * as React from "react";

import "./QuestionAnswer.less"
import { DialogHead, DialogBottomBtn, DialogBottomIcon, PullSlideTip, ForumButton } from "../commons/ForumComponent";
import { approveAnswer, disApproveAnswer, disFollow, follow, getQuestion, submitAnswer } from "../async";
import Editor from "../../../components/editor/Editor";
import { splitText, removeHtmlTags } from "../../../utils/helpers"
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";

interface QuestionAnswerStates {
  question: object;
  // 弹出答案书写框
  questionWritable: boolean;
  btn2Content: string;
  answerList: object;
  // 是否是新回答
  submitNewAnswer: boolean;
  // 自己的答案
  myAnswer: object;
  selfAnswerContent: string;
}
let isExpandQuestion = false;
export default class QuestionAnswer extends React.Component<any, QuestionAnswerStates> {

  constructor() {
    super()
    this.state = {
      question: {},
      questionWritable: false,
      btn2Content: '',
      answerList: [],
      submitNewAnswer: false,
      myAnswer: {},
      selfAnswerContent: ''
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
      if(question.answered) {
        content = '编辑我的回答';
      } else {
        content = '回答';
      }
      res.msg.answerList.map((answerItem) => {
        if(answerItem.mine) {
          this.setState({ myAnswer: answerItem })
        }
      })
      this.setState({ question: res.msg, btn2Content: content, answerList: res.msg.answerList })
    })
  }

  // 添加新的回答
  handleClickAddNewAnswer() {
    let content = '';
    if(this.state.questionWritable) {
      content = '回答';
    } else {
      content = '取消回答';
    }
    this.setState({
      questionWritable: !this.state.questionWritable, btn2Content: content, submitNewAnswer: true
    })
  }

  // 编辑自己的回答
  handleClickEditSelfAnswer() {
    let content = '';
    if(this.state.questionWritable) {
      content = '编辑我的回答';
    } else {
      content = '取消回答';
    }
    this.setState({
      questionWritable: !this.state.questionWritable,
      btn2Content: content, submitNewAnswer: false,
      selfAnswerContent: this.state.myAnswer.answer
    })
  }

  // 自己的提问，跳转问题修改页
  handleCLickGoQuestionSubmitPage(questionId) {
    this.context.router.push({
      pathname: "/forum/static/question/detail",
      query: { questionId }
    })
  }

  handleClickGoAnswerCommentPage(answerId) {
    this.context.router.push({
      pathname: "/forum/static/answer/comment",
      query: { answerId }
    })
  }

  handleClickExpandQuestion(description) {
    let node = this.refs.quesContent;
    if(!isExpandQuestion) {
      node.innerHtml = description;
    } else {
      node.innerHtml = splitText(description, 68);
    }
    isExpandQuestion = !isExpandQuestion;
    return isExpandQuestion ? "收起" : "展开"
  }

  submitAnswer(questionId) {
    const answer = this.refs.editor.getValue();
    const { dispatch } = this.props;
    if(answer.length > 10000) {
      dispatch(alertMsg('回答不能超过10000个字哦'));
      return;
    }
    const { answerList, submitNewAnswer, myAnswer } = this.state
    if(submitNewAnswer) {
      submitAnswer(questionId, answer).then(res => {
        if(res.code === 200) {
          this.setState({
            questionWritable: false,
            btn2Content: '编辑我的回答',
            answerList: answerList.concat(res.msg),
            myAnswer: res.msg
          })
        }
      })
    } else {
      submitAnswer(questionId, answer, myAnswer.id).then(res => {
        if(res.code === 200) {
          let newAnswerList = [];
          answerList.map((answerItem, idx) => {
            if(!answerItem.mine) {
              newAnswerList.push(answerItem)
            } else {
              newAnswerList.push(res.msg)
            }
          });
          this.setState({
            questionWritable: false,
            btn2Content: '编辑我的回答',
            answerList: newAnswerList,
            myAnswer: res.msg
          })
        }
      })
    }
  }

  render() {
    const { question, questionWritable, btn2Content, answerList } = this.state;

    const {
      addTimeStr, answerCount = 0, answered, authorHeadPic, authorUserName,
      description = '', followCount = 0, id, mine, topic
    } = question;

    const renderQuestion = () => {
      // if(!id) return
      // 是否已关注状态
      let tag = question.follow;
      let btn1Content = tag ? '已关注' : '关注'
      const changeBtn1Content = () => {
        if(mine) {
          return "编辑"
        } else {
          if(tag) {
            // 已关注的情况，则调用取消关注接口
            disFollow(question.id)
          } else {
            // 未关注的情况，则调用关注接口
            follow(question.id)
          }
          tag = !tag
          return tag ? '已关注' : '关注'
        }
      }

      return (
        <div className="ques-desc">
          <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={addTimeStr}/>
          <div className="ques-content" ref="quesContent" dangerouslySetInnerHTML={{__html:splitText(description, 68)}}></div>
          <DialogBottomBtn
            leftContent={description.length > 68 ? `展开` : false}
            leftContentFunc={this.handleClickExpandQuestion.bind(this, description)}
            btn1Content={mine ? null : btn1Content} btn1DisableValue={`已关注`}
            btn1ContentFunc={changeBtn1Content}
            btn2Content={mine ? '编辑我的问题' : btn2Content} btn2DisableValue={`回答`}
            btn2ContentFunc={
              mine ?
                this.handleCLickGoQuestionSubmitPage.bind(this, question.id) :
                answered ? this.handleClickEditSelfAnswer.bind(this) : this.handleClickAddNewAnswer.bind(this)
            }
          />
        </div>
      )
    }

    const renderAnswerTips = () => {
      if(questionWritable) return;
      return (
        <div className="answer-tips">
          <span>该问题还没有答案，你可以</span>
          <span>1.回答问题</span>
          <span>2.点击关注，有新的回答时会通知你</span>
        </div>
      )
    }

    const renderAnswers = () => {
      if(!answerList) return;
      if(questionWritable) return;
      return (
        <div className="answer-list">
          {
            answerList.map((answerItem, idx) => {
              const { answer = '', approval, approvalCount, authorHeadPic, authorUserName, commentCount, id, publishTimeStr } = answerItem
              let tag = approval
              let comment = 'https://static.iqycamp.com/images/fragment/comment.png?imageslim'
              let unvote = 'https://static.iqycamp.com/images/fragment/unvote.png?imageslim'
              let voted = 'https://static.iqycamp.com/images/fragment/voted.png?imageslim'
              let btn2ImgUrl = approval ? voted : unvote
              const changeBtn2ImgUrl = () => {
                if(tag) {
                  // 已赞同，则取消赞同
                  disApproveAnswer(id)
                } else {
                  // 还未赞同，点击赞同
                  approveAnswer(id)
                }
                tag = !tag
                return tag ? unvote : voted
              }

              let isExpand = false
              const expandComment = (idx) => {
                let commentNode = this.refs[`ansComment${idx}`]
                if(isExpand) {
                  commentNode.innerHtml = splitText(answer, 68);
                } else {
                  commentNode.innerHtml = answer
                }
                isExpand = !isExpand
                return isExpand ? "收起" : "展开"
              }

              return (
                <div className="answer-desc" key={idx}>
                  <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={publishTimeStr}/>
                  <div className="answer-content" ref={`ansComment${idx}`} dangerouslySetInnerHTML={{__html:splitText(answer, 68)}}></div>
                  <DialogBottomIcon
                    leftContent={removeHtmlTags(answer).length > 68 ? `展开` : false} leftContentFunc={() => expandComment(idx)}
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
      if(!questionWritable) return;
      return (
        <div className="answer-editor">
          <Editor
            ref="editor"
            moduleId="6"
            maxLength="10000"
            defaultValue={this.state.myAnswer.answer}
            placeholder="写下该问题的答案呢（10000字以内）。"
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
            answerList.length === 0 ?
              renderAnswerTips() :
              renderAnswers()
          }
          {renderAnswerWriteBox()}
        </div>
      </div>
    )
  }

}
