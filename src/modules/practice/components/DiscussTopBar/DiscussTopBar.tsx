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
      leftLabel = '作业区',
      rightLabel = '提交作业',
      rightOnClick = () => {
        console.log('you clicked me')
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
