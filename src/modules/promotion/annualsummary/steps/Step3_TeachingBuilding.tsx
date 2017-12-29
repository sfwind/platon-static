import * as React from 'react'
import './Step3_TeachingBuilding.less'

interface Step3_TeachingBuildingProps {
  getGlobalState: any
}

export class Step3_TeachingBuilding extends React.Component<Step3_TeachingBuildingProps, any> {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { isSelf = false, nickName = '' } = this.props.getGlobalState()

    return (
      <section className="annual-teaching-building">
        <div className="scroll-container">
          <div className="text text1">在这里，{isSelf ? '你' : nickName}结识了</div>
          <div className="text text2">
          <span className="highlight">
            <large>25&nbsp;</large>个行业的人脉
          </span>
          </div>
          <div className="text text3">学习横跨思维、管理、沟通、商业和投资等领域；</div>
          <div className="text text4">见识了更广阔的天地，对世界的认知更清晰。</div>
          <div className="word-cloud"></div>
        </div>
      </section>
    )
  }

}
