import * as React from 'react'
import './ReplyApplicationComment.less'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from '../../redux/actions'
import { loadCommentList, comment, deleteComment, commentReply, getApplicationPractice, vote } from '../practice/application/async'
import { findIndex, remove, isString, truncate, merge } from 'lodash'
import { scroll, filterHtmlTag } from '../../utils/helpers'
import { mark } from '../../utils/request'
import AssetImg from '../../components/AssetImg'
import DiscussShow from '../practice/components/DiscussShow'
import Discuss from '../practice/components/Discuss'
import { loadApplicationCommentOfMessage, submitEvaluation } from './async'

@connect(state => state)
export default class ReplyApplicationComment extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {
      page: 1,
      editDisable: false,
      commentList: [],
      article: {},
      filterContent: '',
      evaluated: false
    }
    this.commentHeight = window.innerHeight
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: '打点', function: '学习', action: '打开应用题评论页' })
    const { dispatch, location } = this.props
    dispatch(startLoad())
    getApplicationPractice(location.query.submitId).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ article: res.msg, filterContent: filterHtmlTag(res.msg.content) })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(alertMsg(ex))
    })
    loadApplicationCommentOfMessage(location.query.submitId, location.query.commentId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          commentList: msg.list,
          isModifiedAfterFeedback: msg.isModifiedAfterFeedback,
          evaluated: msg.evaluated
        })
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  onSubmit() {
    const { dispatch, location } = this.props
    const { content, isReply } = this.state
    if(content) {
      this.setState({ editDisable: true })
      if(isReply) {
        commentReply(location.query.submitId, content, this.state.id).then(res => {
          if(res.code === 200) {
            this.setState({
              commentList: [ res.msg ].concat(this.state.commentList),
              showDiscuss: false,
              editDisable: false
            })
            if(!this.state.end && this.pullElement) {
              this.pullElement.enable()
            }
            scroll('.comment-header', '.application-comment')
          } else {
            dispatch(alertMsg(res.msg))
            this.setState({ editDisable: false })
          }
        }).catch(ex => {
          this.setState({ editDisable: false })
          dispatch(alertMsg(ex))
        })
      } else {
        comment(location.query.submitId, content).then(res => {
          if(res.code === 200) {
            this.setState({
              commentList: [ res.msg ].concat(this.state.commentList),
              showDiscuss: false,
              editDisable: false
            })
            if(!this.state.end && this.pullElement) {
              this.pullElement.enable()
            }
            scroll('.comment-header', '.application-comment')
          } else {
            dispatch(alertMsg(res.msg))
            this.setState({ editDisable: false })
          }
        }).catch(ex => {
          this.setState({ editDisable: false })
          dispatch(alertMsg(ex))
        })
      }
    } else {
      dispatch(alertMsg('请先输入内容再提交'))
    }
  }

  openWriteBox() {
    this.setState({ showDiscuss: true, content: '', isReply: false, placeholder: '和作者切磋讨论一下吧' })
  }

  reply(item) {
    this.setState({
      id: item.id,
      placeholder: '回复 ' + item.name + ':',
      showDiscuss: true,
      isReply: true,
      content: ''
    })
  }

  onDelete(id) {
    const { dispatch, location } = this.props
    deleteComment(id).then(res => {
      if(res.code === 200) {
        loadCommentList(location.query.submitId, 1).then(res => {
          dispatch(endLoad())
          if(res.code === 200) {
            this.setState({
              commentList: res.msg.list, page: 1, end: res.msg.end,
              isModifiedAfterFeedback: res.msg.isModifiedAfterFeedback
            })
          } else {
            dispatch(alertMsg(res.msg))
          }
        }).catch(ex => {
          dispatch(endLoad())
          dispatch(alertMsg(ex))
        })
      }
    })
  }

  onChange(value) {
    this.setState({ content: value })
  }

  cancel() {
    const { showDiscuss } = this.state
    if(showDiscuss) {
      this.setState({ showDiscuss: false })
    }
  }

  voted(id, voteStatus, voteCount) {
    if(!voteStatus) {
      this.setState({ article: merge(this.state.article, { voteCount: voteCount + 1, voteStatus: true }) })
      vote(id)
    }
  }

  handleClickSubmitEvaluation() {
    this.setState({ showEvaluateBox: false })
    const useful = this.state.useful ? 1 : 0
    let node = document.getElementById('evaluation-edit')
    if(node) {
      const evaluationValue = node.value
      const { dispatch } = this.props
      if(evaluationValue.trim().length > 0) {
        submitEvaluation(this.props.location.query.commentId, useful, evaluationValue).then(() => {
          this.setState({ showEvaluateBox: false })
        }).catch(e => {
          dispatch(alertMsg(e))
        })
      }
    }
  }

  render() {
    const {
      commentList = [], showDiscuss, end, isReply, placeholder, showAll, filterContent, wordsCount = 60,
      useful = undefined, evaluated, showEvaluateBox = false
    } = this.state
    const { topic, content } = this.state.article

    const renderCommentList = () => {
      if(commentList && commentList.length !== 0) {
        return (
          commentList.map((item, seq) => {
            return (
              <div id={'comment-' + item.id}>
                <DiscussShow discuss={item} showLength={100} reply={() => {
                  this.reply(item)
                }} onDelete={this.onDelete.bind(this, item.id)}/>
              </div>
            )
          })
        )
      } else {
        return (<div className="on_message">
          <div className="no_comment">
            <AssetImg url="https://static.iqycamp.com/images/no_comment.png" height={120} width={120}/>
          </div>
          还没有人评论过<br/>点击左下角按钮，发表第一条吧
        </div>)
      }
    }

    const renderWorkContent = () => {
      if(isString(content)) {
        if(filterContent.length > wordsCount && !showAll) {
          return (
            <div onClick={() => this.show(showAll)} className="application-content">
              {truncate(filterContent, { length: wordsCount, omission: '' })}
              <span style={{ letterSpacing: '-3px' }}> . . .</span>
            </div>
          )
        } else {
          return (
            <pre className="application-content" dangerouslySetInnerHTML={{ __html: content }}/>
          )
        }
      }
      return null
    }

    const renderEvaluate = () => {
      return (
        <div className="comment-evaluation">
          <div className="evaluation-tip">觉得教练的评论，对学习有帮助吗？</div>
          <div className="evaluation-useful"
               onClick={() => this.setState({ useful: useful === undefined ? true : !this.state.useful })}>
            <img src={useful ?
              'https://static.iqycamp.com/images/fragment/useful_full.png?imageslim' :
              'https://static.iqycamp.com/images/fragment/useful_empty.png?imageslim'} alt="有帮助"/>
            <span>有帮助</span>
          </div>
          <div className="evaluation-useless"
               onClick={() => {
                 this.setState({ useful: useful === undefined ? false : !this.state.useful }, () => {
                   if(!this.state.useful) {
                     this.setState({ showEvaluateBox: true })
                   }
                 })
               }}>
            <img
              src={useful === undefined ?
                'https://static.iqycamp.com/images/fragment/useless_empty.png?imageslim' :
                useful ? 'https://static.iqycamp.com/images/fragment/useless_empty.png?imageslim' :
                  'https://static.iqycamp.com/images/fragment/useless_full.png?imageslim'} alt="没帮助"/>
            <span>没帮助</span>
          </div>
        </div>
      )
    }

    return (
      <div className="application-comment-message">
        <div className="article">
          <div className="article-header">{topic}</div>
          {renderWorkContent()}
          <div className="show-all">点击查看原题</div>
        </div>
        <div className="comment-body">
          <div className="comment-header">当前评论</div>
          {renderCommentList()}
        </div>
        {
          !evaluated ?
            renderEvaluate() :
            null
        }
        {showDiscuss ? <div className="padding-comment-dialog"/> : null}
        {
          showDiscuss ?
            <Discuss isReply={isReply} placeholder={placeholder} limit={10000}
                     submit={() => this.onSubmit()} onChange={(v) => this.onChange(v)}
                     cancel={() => this.cancel()}/> : null
        }
        {
          showEvaluateBox ?
            <div>
              <div className="evaluation-box">
                <textarea className="evaluation-edit" id="evaluation-edit" placeholder="可以匿名反馈，帮助教练做得更好哦！"
                          autoFocus={true}/>
                <div className="evaluation-submit" onClick={ () => this.handleClickSubmitEvaluation() }>提交</div>
              </div>
              <div className="mask" style={{ width: window.innerWidth, height: window.innerHeight }}/>
            </div> :
            null
        }
      </div>
    )
  }

}
