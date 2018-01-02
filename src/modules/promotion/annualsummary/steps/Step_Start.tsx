import * as React from 'react'
import './Step_Start.less'
import { mark } from '../../../../utils/request'
import AssetImg from '../../../../components/AssetImg'

interface Step_StartProps {
  getGlobalState: any
}

export class Step_Start extends React.Component<Step_StartProps, any> {

  constructor() {
    super()
  }

  componentWillMount() {
    mark({ module: '打点', function: '年终回顾', action: '0', memo: this.props.getGlobalState().originRiseId })
  }

  render() {
    const { isSelf = true, nickName = '' } = this.props.getGlobalState()

    return (
      <div className="annual-init-start">
        <AssetImg className="annual-start-year" url="https://static.iqycamp.com/images/annual_start_year.png"></AssetImg>
        <div className="start-words">
          <div className="start-tip">{isSelf ? '你在圈外商学院的' : `${nickName}邀请你一起见证`}</div>
          <div className="start-tip">{isSelf ? '学习数据和成就' : `TA在圈外商学院的2017`}</div>
        </div>
      </div>
    )
  }

}
