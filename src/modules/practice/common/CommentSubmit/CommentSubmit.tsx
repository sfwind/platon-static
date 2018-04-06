import * as React from 'react'
import EditorTopBar from '../../components/EditorTopBar/EditorTopBar'
import SimpleEditor from '../../../../components/SimpleEditor/SimpleEditor'

import './CommentSubmit.less'

export default class CommentSubmit extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div className="comment-submit-container">
        <EditorTopBar leftLabel={'取消'}
                      leftOnClick={() => alert('取消')}
                      description={'我的发言'}
                      rightLabel={'提交'}
                      rightOnClick={() => alert('提交')}/>
        <SimpleEditor ref="simple" className="submit-comment-editor" placeholder={'欢迎参与交流，优质发言将由圈外商学院筛选后公开展示'}/>
        <button onClick={() => console.log(this.refs.simple.getValue())}>Get Value</button>
      </div>
    )
  }

}
