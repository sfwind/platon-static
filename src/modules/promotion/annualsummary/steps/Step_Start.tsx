import * as React from 'react'
import './Step_Start.less'

interface Step_StartProps {
  getGlobalState: any
}

export class Step_Start extends React.Component<Step_StartProps, any> {

  constructor() {
    super()
  }

  render() {
    const { isSelf = true, nickName = '' } = this.props.getGlobalState()

    return (
      <div className="annual-init-start">
        <div className="start-tip">{isSelf ? '你' : nickName}在圈外商学院的这一年</div>
      </div>
    )
  }

}
