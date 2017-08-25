import * as React from "react";
import "./QuestionAnswer.less";
import { connect } from "react-redux"
import { DialogHead, DialogBottomBtn, DialogBottomIcon, PullSlideTip, ForumButton } from "../commons/ForumComponent";
import { approveAnswer, disApproveAnswer, disFollow, follow, getQuestion, submitAnswer } from "../async";
import { mark } from "../../../utils/request"
import Editor from "../../../components/editor/Editor";
import { splitText, removeHtmlTags, scroll, changeTitle } from "../../../utils/helpers"
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import AnswerComment from "./AnswerComment"
import FullScreenDialog from "../../../components/FullScreenDialog"

interface QuestionAnswerStates {
  question: object;
  // 弹出答案书写框
  questionWritable: boolean;
  btn1Content: string;
  btn2Content: string;
  answerList: object;
  // 是否是新回答
  submitNewAnswer: boolean;
  // 自己的答案
  myAnswer: object;
  selfAnswerContent: string;
  // 提示高度
  answerTipsHeight: number;
  // 待预览图片
  previewImgs: object;
  // 回答id
  answerId: number;
}
let isExpandQuestion = false;

@connect(state => state)
export default class QuestionAnswer extends React.Component<any, QuestionAnswerStates> {

  constructor() {
    super()
    this.state = {
      question: {},
      questionWritable: false,
      btn1Content: '',
      btn2Content: '',
      answerList: [],
      submitNewAnswer: false,
      myAnswer: {},
      selfAnswerContent: '',
      answerTipsHeight: '90',
      previewImgs: [],
      answerId: -1,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    changeTitle('论坛')
    mark({ module: "打点", function: "论坛", action: "打开问题详情页" })
    let questionId = this.props.questionId
    if(!questionId) {
      questionId = this.props.location.query.questionId
    }
    const { dispatch } = this.props
    dispatch(startLoad())
    getQuestion(questionId).then(res => {
      const { code, msg } = res
      dispatch(endLoad())
      if(code === 200) {
        const question = msg
        msg.answerList.map((answerItem) => {
          if(answerItem.mine) {
            this.setState({ myAnswer: answerItem })
          }
        })
        this.setState({
          question: res.msg,
          btn1Content: question.follow ? '已关注' : '关注问题',
          btn2Content: question.answered ? '编辑我的回答' : '回答',
          submitNewAnswer: !question.answered,
          answerList: res.msg.answerList
        }, () => {
          let node = this.refs.quesDesc
          if(node) {
            const height = window.innerHeight - node.clientHeight - 70
            this.setState({ answerTipsHeight: height })
          }
          // 设置图片预览对象
          this.setState({ previewImgs: document.getElementsByTagName('img') })

          // 这里有坑，获取dom结构之后添加事件失败，必须用setTimeout包一下
          // TODO 怀疑是前面的state set 完之后dom还没处理完，需要研究下
          setTimeout(()=>{
            // 设置answer-content
            this.bindProblem()
          },0)
        })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  componentDidUpdate() {
    // 添加图片预览功能
    const { previewImgs } = this.state
    for(let i = 0; i < previewImgs.length; i++) {
      if(previewImgs[ i ].src.indexOf("answer-") > 0) {
        let imgSrc = previewImgs[ i ].src
        previewImgs[ i ].onclick = () => {
          wx.previewImage({ current: imgSrc, urls: [ imgSrc ] });
        }
      }
    }
  }

  // 添加新的回答
  handleClickAddNewAnswer() {
    this.setState({
      questionWritable: !this.state.questionWritable,
      btn2Content: this.state.questionWritable ? '回答' : '取消回答',
      submitNewAnswer: true
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

  // 关注
  handleClickFollow(questionId) {
    follow(questionId).then(() => {
      this.setState({
        btn1Content: '已关注'
      })
    })
  }

  // 取消关注
  handleClickFollowCancel(questionId) {
    disFollow(questionId)
    this.setState({
      btn1Content: '关注问题'
    })
  }

  // 自己的提问，跳转问题修改页
  handleCLickGoQuestionSubmitPage(questionId) {
    this.context.router.push({
      pathname: "/forum/static/question/init",
      query: { questionId }
    })
  }

  // 跳转到回答的评论页
  handleClickGoAnswerCommentPage(answerId) {
    this.setState({ answerId, show: true })
  }

  // 折叠或者展开答案
  handleClickExpandQuestion(description) {
    let node = this.refs.quesContent;
    if(!isExpandQuestion) {
      node.innerHTML = description
    } else {
      node.innerHTML = splitText(description, 68)
    }
    isExpandQuestion = !isExpandQuestion;
    return isExpandQuestion ? "收起" : "展开"
  }

  // 提交答案
  submitAnswer(questionId) {
    const answer = this.refs.editor.getValue();
    const { dispatch } = this.props;
    if(removeHtmlTags(answer).length > 10000) {
      dispatch(alertMsg('回答不能超过10000个字哦'));
      return;
    }
    if(!answer){
      dispatch(alertMsg('回答不能为空哦'));
      return;
    }
    const { answerList, submitNewAnswer, myAnswer } = this.state
    dispatch(startLoad())
    if(submitNewAnswer) {
      submitAnswer(questionId, answer).then(res => {
        dispatch(endLoad())
        const { code, msg } = res
        if(code === 200) {
          this.setState({
            questionWritable: false,
            btn2Content: '编辑我的回答',
            answerList: answerList.concat(msg),
            submitNewAnswer: false,
            myAnswer: msg
          }, () => {
            scroll('#myanswer', '.answer-container');
            // document.querySelector(".answer-container").scrollTop = document.querySelector("#myanswer").offsetTop
          })
        } else {
          dispatch(alertMsg(msg))
        }
      }).catch(e => {
        dispatch(endLoad())
        dispatch(alertMsg(e))
      })
    } else {
      submitAnswer(questionId, answer, myAnswer.id).then(res => {
        dispatch(endLoad())
        const { code, msg } = res
        if(code === 200) {
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
          }, () => {
          }, () => {
            scroll('#myanswer', '.answer-container');
            // document.querySelector(".answer-container").scrollTop = document.querySelector("#myanswer").offsetTop
          })
        } else {
          dispatch(alertMsg(msg))
        }
      }).catch(e => {
        dispatch(endLoad())
        dispatch(alertMsg(e))
      })
    }
  }

  /**
   * 绑定答案超链接点击事件
   * @param node 答案文本的节点，需要data-problemid属性和data-answerid属性
   * @param questionId 本页面的quesitonid
   */
  bindProblemHrefClickHandle(node, questionId) {
    console.log('bind')
    let problemHrefGroup = node.querySelectorAll('a');
    for(let idx = 0; idx < problemHrefGroup.length; idx++) {
      let problemHref = problemHrefGroup[ idx ];
      let problemId = problemHref.getAttribute('data-problemid');
      let answerId = node.getAttribute('data-answerid');
      if(problemId) {
        problemHref.addEventListener('click', () => {
          mark({ module: "论坛分享超链接", function: problemId, action: questionId, memo: answerId })
          this.context.router.push({
            pathname: '/rise/static/plan/view',
            query: { id: problemId }
          })
        });
      }
    }
  }

  bindProblem(){
    let answerContentGroup = document.querySelectorAll('.answer-content');
    if(answerContentGroup) {
      for(let idx = 0; idx < answerContentGroup.length; idx++) {
        let answerContent = answerContentGroup[idx];
        this.bindProblemHrefClickHandle(answerContent,this.state.question.id)
      }
    }
  }

  closeDialog(){
    this.setState({show:false}, ()=>{
      this.bindProblem()
    })
  }

  render() {
    const { question, questionWritable, btn1Content, btn2Content, submitNewAnswer, answerList, answerId, show } = this.state

    const {
      addTimeStr, answerCount = 0, answered, authorHeadPic, authorUserName,
      description = '', followCount = 0, id, mine, topic
    } = question

    const renderQuestion = () => {
      if(!id) return
      return (
        <div className="ques-desc" ref="quesDesc">
          <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={addTimeStr}/>
          <div className="ques-content" ref="quesContent"
               dangerouslySetInnerHTML={{ __html: splitText(description, 68) }}/>
          <DialogBottomBtn
            leftContent={removeHtmlTags(description).length > 68 ? `展开` : false}
            leftContentFunc={this.handleClickExpandQuestion.bind(this, description)}
            btn1Content={mine ? null : btn1Content} btn1DisableValue={`已关注`}
            btn1ContentFunc={
              btn1Content === '已关注' ?
                this.handleClickFollowCancel.bind(this, question.id) :
                this.handleClickFollow.bind(this, question.id)
            }
            btn2Content={mine ? '编辑我的问题' : btn2Content} btn2DisableValue={`回答`}
            btn2ContentFunc={
              mine ?
                this.handleCLickGoQuestionSubmitPage.bind(this, question.id) :
                submitNewAnswer ? this.handleClickAddNewAnswer.bind(this) : this.handleClickEditSelfAnswer.bind(this)
            }
          />
        </div>
      )
    }

    const renderAnswerTips = () => {
      if(questionWritable) return;
      return (
        <div className="answer-tips" style={{ height: this.state.answerTipsHeight }}>
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
              const { answer = '', approval, approvalCount, authorHeadPic, authorUserName, commentCount, id, publishTimeStr, mine } = answerItem
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
                return tag ? voted : unvote
              }

              let isExpand = false
              const expandComment = (idx) => {
                let commentNode = this.refs[ `ansComment${idx}` ]
                if(isExpand) {
                  commentNode.innerHTML = splitText(answer, 68);
                } else {
                  commentNode.innerHTML = answer;
                }
                this.bindProblemHrefClickHandle(commentNode, question.id);
                isExpand = !isExpand
                return isExpand ? "收起" : "展开"
              }


              return (
                <div className="answer-desc" key={idx} id={mine ? 'myanswer' : null}>
                  <DialogHead leftImgUrl={authorHeadPic} user={authorUserName} time={publishTimeStr}/>
                  <div className="answer-content" ref={`ansComment${idx}`} data-answerid={answerItem.id}
                       dangerouslySetInnerHTML={{ __html: splitText(answer, 68) }}/>
                  <DialogBottomIcon
                    leftContent={removeHtmlTags(answer).length > 68 ? `展开` : false}
                    leftContentFunc={() => expandComment(idx)}
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
      let scrollContainer = '.answer-container'
      return (
        <div className="answer-editor">
          <Editor
            ref="editor" moduleId="6" maxLength="10000" scrollContainer="answer-container"
            defaultValue={this.state.myAnswer.answer}
            placeholder="回答问题时，可以试试以下的思路：<br>1，澄清对问题的理解；<br>2，分析可能的原因；<br>3，提供建议和解决方案；<br>4，说明使用的哪一门小课/知识点，帮助自己回顾学到的知识。"
            uploadStart={() => {
              this.props.dispatch(startLoad())
            }}
            uploadEnd={() => {
              this.props.dispatch(endLoad())
            }}
            onUploadError={(res) => {
              this.props.dispatch(alertMsg(res.msg))
            }}
          />
          <ForumButton content="提交" clickFunc={this.submitAnswer.bind(this, question.id)}/>
        </div>
      )
    }

    return (
      <div className="answer-container">
        <div className="answer-page">
          <div className="answer-head-topic">{topic}</div>
          {renderQuestion()}
          <div className="grey-banner" style={{ height: 10 }}/>
          {
            answerList.length === 0 ?
              renderAnswerTips() :
              renderAnswers()
          }
          {renderAnswerWriteBox()}
        </div>
        {show ?
          <FullScreenDialog close={()=> this.closeDialog()} hash="#comment" level={2}>
            <AnswerComment answerId={answerId}/>
          </FullScreenDialog> : null}
      </div>
    )
  }

}
