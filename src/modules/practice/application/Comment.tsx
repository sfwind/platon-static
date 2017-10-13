import * as React from 'react'
import './Comment.less'
import { connect } from 'react-redux'
import { loadCommentList, comment, deleteComment, commentReply, getApplicationPractice, vote } from './async'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import AssetImg from '../../../components/AssetImg'
import PullElement from 'pull-element'
import { findIndex, remove, isString, truncate, merge } from 'lodash'
import DiscussShow from '../components/DiscussShow'
import Discuss from '../components/Discuss'
import { scroll, filterHtmlTag } from '../../../utils/helpers'
import { mark } from '../../../utils/request'
import { StarRating } from '../../../components/starvote/StarRating'
import { submitEvaluation } from '../../message/async'
import Toast from '../../../components/Toast'
import RenderInBody from '../../../components/RenderInBody'

@connect(state => state)
export class Comment extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {
      page: 1,
      editDisable: false,
      commentList: [],
      article: {},
      placeholder: '和作者切磋讨论一下吧',
      filterContent: '',
      showToast: false
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
      console.log('res1', res)
      if(res.code === 200) {
        this.setState({ article: res.msg, filterContent: filterHtmlTag(res.msg.content) })
        loadCommentList(location.query.submitId, 1).then(res => {
          console.log('res2', res)
          dispatch(endLoad())
          if(res.code === 200) {
            this.setState({
              page: 1,
              end: res.msg.end,
              commentList: res.msg.list,
              commentEvaluations: res.msg.commentEvaluations,
              isModifiedAfterFeedback: res.msg.isModifiedAfterFeedback
            })
            //从消息中心打开时，锚定到指定评论
            if(location.query.commentId) {
              scroll('#comment-' + location.query.commentId, '.application-comment')
            }
          } else {
            dispatch(alertMsg(res.msg))
          }
        }).catch(ex => {
          dispatch(endLoad())
          dispatch(alertMsg(ex))
        })
      } else {
        dispatch(endLoad())
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  componentDidUpdate() {
    const { commentList = [], end } = this.state
    const { dispatch, location } = this.props
    if(commentList && commentList.length !== 0 && !this.pullElement) {
      this.pullElement = new PullElement({
        target: '.pull-target',
        scroller: '.application-comment',
        trigger: '.application-comment',
        damping: 4,
        detectScroll: true,
        onPullUpEnd: (data) => {
          loadCommentList(location.query.submitId, this.state.page + 1).then(res => {
            if(res.code === 200) {
              if(res.msg && res.msg.list.length !== 0) {
                remove(res.msg.list, (item) => {
                  return findIndex(this.state.commentList, item) !== -1
                })
                this.setState({
                  commentList: this.state.commentList.concat(res.msg.list),
                  page: this.state.page + 1,
                  end: res.msg.end
                })
              } else {
                dispatch(alertMsg('没有更多了'))
              }
            } else {
              dispatch(alertMsg(res.msg))
            }
          }).catch(ex => {
            dispatch(alertMsg(ex))
          })
        }
      })
      this.pullElement.init()
    }

    if(this.pullElement && this.state.end) {
      this.pullElement.disable()
    }
  }

  componentWillUnmount() {
    this.pullElement ? this.pullElement.destroy() : null
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

  show(showAll) {
    this.setState({ showAll: !showAll })
  }

  voted(id, voteStatus, voteCount) {
    if(!voteStatus) {
      this.setState({ article: merge(this.state.article, { voteCount: voteCount + 1, voteStatus: true }) })
      vote(id)
    } else {
    }
  }

  handleEvaluateComment(ref, commentId) {
    const { commentEvaluations } = this.state
    let nodeState = this.refs[ref].getInnerState()
    submitEvaluation(commentId, nodeState.chosenLevel, null).then(res => {
      if(res.code === 200) {
        this.setState({
          commentEvaluations: commentEvaluations.filter((evaluation, index) => evaluation.commentId !== commentId),
          showToast: true
        }, () => {
          setTimeout(() => {
            this.setState({ showToast: false })
          }, 2000)
        })
      }
    })
  }

  render() {
    const { commentList = [], showDiscuss, end, isReply, placeholder, showAll, filterContent, wordsCount = 60, commentEvaluations = [], showToast } = this.state
    console.log(commentEvaluations)
    const { topic, content, voteCount = 0, voteStatus } = this.state.article
    const { submitId } = this.props.location.query
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

    const renderTips = () => {
      if(commentList && commentList.length !== 0) {
        if(!end) {
          return (
            <div className="show-more">上拉加载更多消息</div>
          )
        } else {
          return (
            <div className="show-more">已经到最底部了</div>
          )
        }
      }
    }

    const renderWorkContent = () => {
      if(isString(content)) {
        if(filterContent.length > wordsCount && !showAll) {
          return (
            <div onClick={() => this.show(showAll)} className="application-content">
              {truncate(filterContent, { length: wordsCount, omission: '' })}
              <span style={{ letterSpacing: '-3px' }}>...</span>
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

    const renderAsstEvaluate = () => {
      if(commentEvaluations.length === 0) return
      return (
        <div className="star-rating-box">
          {
            commentEvaluations.map((evaluation, index) => {
              return (
                <StarRating
                  key={evaluation.id}
                  ref={`evaluation${evaluation.id}`}
                  desc={`${index + 1}/${commentEvaluations.length} ${evaluation.nickName}教练的评论，对你有帮助吗？来匿名打个分，帮助教练做得更好吧！`}
                  confirmFunc={() => this.handleEvaluateComment(`evaluation${evaluation.id}`, evaluation.commentId)}
                />
              )
            })
          }
        </div>
      )
    }

    const renderOtherComponents = () => {
      return (
        <Toast show={showToast} timeout={2000} height={200} width={200} top={160}>
          <AssetImg type="success" width={60} style={{ marginTop: 60 }}/>
        </Toast>
      )
    }

    return (
      <div className="application-container">
        <div className="application-comment">
          <div className="article">
            <div className="article-header">{topic}</div>
            {renderWorkContent()}
            {filterContent && filterContent.length > wordsCount ?
              <div onClick={() => this.show(showAll)} className="show-all">{showAll ? '收起' : '展开'}</div> : null}
            {content ?
              <div onClick={() => {this.voted(submitId, voteStatus, voteCount)}} className="vote">
                <span className={`${voteStatus ? 'voted' : 'disVote'}`}>{voteCount}</span>
              </div> : null}
            <div className="comment-header">
              当前评论
            </div>
            {
              this.state.isModifiedAfterFeedback ?
                (
                  <div className="comment-header-feedback">
                    <span className="comment-feedback-tips">小提示：</span>
                    该条教练点评后，作业被更新，可能有和教练点评不一致的内容
                  </div>
                ) : null
            }
          </div>
          <div className="pull-target">
            <div className="comment-body">
              {renderCommentList()}
              {renderTips()}
            </div>
          </div>
          {showDiscuss ? <div className="padding-comment-dialog"/> : null}

        </div>
        <RenderInBody>
          {showDiscuss ?
            <Discuss isReply={isReply} placeholder={placeholder} limit={10000}
                     submit={() => this.onSubmit()} onChange={(v) => this.onChange(v)}
                     cancel={() => this.cancel()}
            /> :
            <div className="write-discuss" onClick={() => this.openWriteBox()}>
              <AssetImg url="https://static.iqycamp.com/images/discuss.png" width={45} height={45}/>
            </div>
          }
        </RenderInBody>
        {renderAsstEvaluate()}
        {renderOtherComponents()}
      </div>
    )
  }
}
