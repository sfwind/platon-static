import * as React from 'react'

import './SimpleEditor.less'
import { randomStr } from '../../utils/helpers'

interface SimpleEditorProps {
  style?: object,
  className?: string,
  placeholder?: string,
  maxLength?: number,
  value?: string
}

export default class SimpleEditor extends React.Component {

  constructor () {
    super()
    this.state = {
      editorRef: 'editor_' + randomStr(8),
    }
  }

  componentWillMount () {
    this.setState(this.props)
  }

  getValue () {
    return this.state.value
  }

  render () {
    const {
      editorRef,
      style = {},
      className = '',
      placeholder = '',
      maxLength = 500,
      value = '',
    } = this.state

    return (
      <div className={`simple-editor-component`}>
        <textarea ref={editorRef}
                  style={style}
                  className={`simple-editor ${className}`}
                  placeholder={placeholder}
                  maxLength={maxLength}
                  defaultValue={value}
                  onChange={(e) => this.setState({ value: e.target.value })}/>
        <span className="tips">剩余 {maxLength - value.length} 字</span>
      </div>
    )
  }

}
