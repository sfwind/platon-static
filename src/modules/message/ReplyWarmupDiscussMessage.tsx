import * as React from 'react'
import { connect } from 'react-redux'
import './ReplyDiscussMessage.less'
import { loadWarmUp, loadWarmUpDiscussReply, discuss } from './async'
import { startLoad, endLoad, alertMsg } from '../../redux/actions'
import Discuss from '../practice/components/Discuss'
import DiscussShow from '../practice/components/DiscussShow'
import _ from 'lodash'
import { mark } from '../../utils/request'
import { MarkBlock } from '../../components/markblock/MarkBlock'

/**
 * 选择题评论页
 */
@connect(state => state)
export default class ReplyDiscussMessage extends React.Component <any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      question: '',
      warmupPracticeId: 0,
      commentId: 0,
      data: {},
      showDiscuss: false,
      content: ''
    }
  }

  componentWillMount(props) {
    mark({
      module: '打点',
      function: '学习',
      action: '加载选择题评论页'
    })
    const { dispatch, location } = props || this.props
    const { warmupPracticeId } = location.query
    const { commentId } = location.query
    dispatch(startLoad())
    loadWarmUpDiscussReply(commentId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({ data: msg, commentId })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })

    loadWarmUp(warmupPracticeId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res

      if(code === 200) {
        let { question } = msg
        if(question && question.length > 16) {
          question = question.substring(0, 16) + '...'
        }
        this.setState({ question, warmupPracticeId })

      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  goOrigin() {
    this.context.router.push({
      pathname: '/rise/static/practice/warmup/new/analysis', query: this.props.location.query
    })
  }

  reply(item) {
    this.setState({ showDiscuss: true, referenceId: item.warmupPracticeId, repliedId: item.id, content: '' })
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

  onSubmit() {
    mark({
      module: '打点',
      function: '学习',
      action: '提交选择题评论'
    })
    const { dispatch } = this.props
    const { referenceId, repliedId, content } = this.state
    if(content.length == 0) {
      dispatch(alertMsg('请填写评论'))
      return
    }

    let discussBody = { comment: content, referenceId: referenceId }
    if(repliedId) {
      _.merge(discussBody, { repliedId: repliedId })
    }

    discuss(discussBody).then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.context.router.push({
          pathname: '/rise/static/practice/warmup/new/analysis',
          query: this.props.location.query
        })
      }
      else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const { question, data, showDiscuss } = this.state
    const renderDiscuss = (discuss) => {
      return (
        <DiscussShow discuss={discuss} showLength={50} reply={() => this.reply(discuss)}/>
      )
    }
    return (
      <div>
        <div className="container" onClick={() => this.cancel()}>
          <div className="question">{question}</div>
          <MarkBlock module={'打点'} func={'选择题评论页'} action={'点击查看原题按钮'} className="origin-question-tip"
                     onClick={this.goOrigin.bind(this)}>点击查看原题</MarkBlock>
          <div className="discuss-title-bar"><span
            className="discuss-title">{this.state.data.del === 1 ? '该评论已删除' : '当前评论'}</span></div>
          {renderDiscuss(data)}
        </div>
        {showDiscuss ? <Discuss isReply={true} placeholder={'回复 ' + data.name + ':'} limit={1000}
                                submit={() => this.onSubmit()} onChange={(v) => this.onChange(v)}
                                cancel={() => this.cancel()}/> : null}
      </div>
    )
  }
}
