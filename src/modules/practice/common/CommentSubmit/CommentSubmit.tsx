import * as React from 'react'
import './CommentSubmit.less'
import EditorTopBar from '../../components/EditorTopBar/EditorTopBar'
import SimpleEditor from '../../../../components/simpleEditor/SimpleEditor'
import { connect } from 'react-redux'
import { discussKnowledge } from '../../knowledge/async'
import { discuss } from '../../warmup/async'
import { startLoad, endLoad, alertMsg, set } from 'reduxutil/actions'

const COMMENT_TYPE = {
  KNOWLEDGE: 1,
  WARMUPPRACTICE: 2,
}

@connect(state => state)
export default class CommentSubmit extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  handleSubmitComment () {
    const { dispatch } = this.props
    const { warmUpIndex } = this.props.location.query
    let commentValue = this.refs.simple.getValue()
    if (!commentValue || commentValue.length <= 0) {
      dispatch(alertMsg('清输入内容再提交'))
      return
    }

    const { query } = this.props.location
    const { type = 0, referenceId = 0 } = query
    // 根据 type 类型，区分当前是针对知识点还是选择题的评论
    if (type == COMMENT_TYPE.KNOWLEDGE) {
      // 知识点啊
      discussKnowledge({ comment: commentValue, referenceId: referenceId }).then(res => {
        if (warmUpIndex && warmUpIndex > 0) {
          dispatch(set('warmupCurrentIndex', parseInt(warmUpIndex)))
        }
        this.context.router.goBack()
      })
    } else if (type == COMMENT_TYPE.WARMUPPRACTICE) {
      // 选择题
      discuss({ comment: commentValue, referenceId: referenceId }).then(res => {
        if (warmUpIndex && warmUpIndex > 0) {
          dispatch(set('warmupCurrentIndex', parseInt(warmUpIndex)))
        }
        this.context.router.goBack()
      })
    } else {
      // 未知
      return
    }
  }

  handleClickCancel () {
    const { warmUpIndex } = this.props.location.query
    const { dispatch } = this.props
    if (warmUpIndex && warmUpIndex > 0) {
      dispatch(set('warmupCurrentIndex', parseInt(warmUpIndex)))
    }
    this.context.router.goBack()
  }

  render () {
    return (
      <div className="comment-submit-container">
        <EditorTopBar leftLabel={'取消'}
                      leftOnClick={() => this.handleClickCancel()}
                      description={'我的发言'}
                      rightLabel={'提交'}
                      rightOnClick={() => this.handleSubmitComment()}/>
        <SimpleEditor ref="simple"
                      className="submit-comment-editor"
                      placeholder={'欢迎参与交流，优质发言将由圈外商学院筛选后公开展示'}/>
      </div>
    )
  }

}
