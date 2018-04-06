import * as React from 'react'

import './EditorTopBar.less'

interface EditorTopBarProps {
  leftLabel: string,
  leftOnClick: any,
  description: string,
  rightLabel: string,
  rightOnClick: any
}

export default class EditorTopBar extends React.Component<EditorTopBarProps, any> {

  constructor () {
    super()
    this.state = {}
  }

  render () {
    const {
      leftLabel = '',
      leftOnClick = () => {},
      description = '',
      rightLabel = '',
      rightOnClick = () => {},
    } = this.props

    return (
      <div className="editor-top-bar-component">
        <span className="left-label" onClick={() => leftOnClick()}>{leftLabel}</span>
        <span className="description">{description}</span>
        <span className="right-label" onClick={() => rightOnClick()}>{rightLabel}</span>
      </div>
    )
  }

}
