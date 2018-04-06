import * as React from 'react'
import EditorTopBar from '../../components/EditorTopBar/EditorTopBar'

import './ApplicationSubmit.less'
import Editor from '../../../../components/simditor/Editor'

export default class ApplicationSubmit extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div className="application-submit-container">
        <EditorTopBar leftLabel={'取消'}
                      leftOnClick={() => alert('取消')}
                      description={'我的作业'}
                      rightLabel={'提交'}
                      rightOnClick={() => alert('提交')}/>
        <Editor ref="editor"
                className="editor"
                moduleId="6"
                toolbarFloat={false}
                placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。完成后点上方按钮提交，就会得到点赞和专业点评哦！"/>
      </div>
    )
  }

}
