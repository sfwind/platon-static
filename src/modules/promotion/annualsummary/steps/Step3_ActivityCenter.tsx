import * as React from 'react'
import './Step3_ActivityCenter.less'
import AssetImg from '../../../../components/AssetImg'

interface Step3_ActivityCenterProps {
  getGlobalState: any
}

export class Step3_ActivityCenter extends React.Component<Step3_ActivityCenterProps, any> {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { totalWords = '18,561,218', bookCount = 123 } = this.state
    const { isSelf = true, nickName = '' } = this.props.getGlobalState()

    return (
      <section className="annual-activity-center">
        <div className="scroll-container">
          <div className="text text1">在圈外商学院里，{isSelf ? '你' : nickName}和来自全球</div>
          <div className="text text1">
          <span className="highlight">
            <large>257&nbsp;</large>
            座城市</span>&nbsp;的人成了校友
          </div>
          <div className="map-box">
            <div className="map"></div>
            <div className="map-locations"></div>
          </div>
          <div className="text text3">共同完成了
            <span className="highlight">
            <large>&nbsp;{totalWords}&nbsp;</large>
            字</span>&nbsp;的刻意练习
          </div>
          <div className="text text3">相当于
            <span className="highlight">
            <large>&nbsp;{bookCount}&nbsp;</large>
            本</span>&nbsp;圈圈写的《停止无效努力》
          </div>

        </div>
        <AssetImg className="triangle" url="https://static.iqycamp.com/images/triangle_right.png"/>
      </section>
    )
  }

}
