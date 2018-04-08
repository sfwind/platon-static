import * as React from 'react'

import './DiscussTopBar.less'

interface DiscussTopBarProps {
  leftLabel: string,
  rightLabel: string,
  rightOnClick: any
}

export default class DiscussTopBar extends React.Component<DiscussTopBarProps, any> {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const {
      leftLabel = '',
      rightLabel = '',
      rightOnClick = () => {
      },
    } = this.props

    return (
      <div className="discuss-top-bar-component">
        <span className="left-title">{leftLabel}</span>
        <span className="right-title" onClick={() => rightOnClick()}>{rightLabel}</span>
      </div>
    )
  }
}
