import * as React from 'react'
import './Step2_TeachingBuilding.less'
import AssetImg from '../../../../components/AssetImg'
import { mark } from '../../../../utils/request'

interface Step2_TeachingBuildingProps {
  getGlobalState: any
}

export class Step2_TeachingBuilding extends React.Component<Step2_TeachingBuildingProps, any> {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    let riseId = this.props.getGlobalState().riseId
    mark({ module: '打点', function: '年终回顾', action: '2', memo: riseId })
  }

  render() {
    const { isSelf = false, nickName = '' } = this.props.getGlobalState()

    return (
      <section className="annual-teaching-building">
        <div className="scroll-container">
          <div className="text text1">在这里，{isSelf ? '你' : nickName}结识了</div>
          <div className="text text1">
          <span className="highlight">
            <large>18&nbsp;</large>个行业的同学
          </span>
          </div>
          <div className="word-cloud"></div>
          <div className="text text3">学习内容横跨思维、管理、沟通、商业和投资等领域；</div>
          <div className="text text3">见识了更广阔的天地，对世界的认知更清晰。</div>
        </div>
        <AssetImg className="triangle" url="https://static.iqycamp.com/images/triangle_left.png"/>
      </section>
    )
  }

}
