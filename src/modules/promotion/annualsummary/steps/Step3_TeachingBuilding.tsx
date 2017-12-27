import * as React from 'react'
import './Step3_TeachingBuilding.less'

export class Step3_TeachingBuilding extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <section className="annual-teaching-building">
        <div className="text text1">在这里，你结识了</div>
        <div className="text text2"><span className="highlight">25个行业的人脉</span></div>
        <div className="text text3">学习横跨思维、管理、沟通、商业和投资等领域；</div>
        <div className="text text4">见识了更广阔的天地，对世界的认知更清晰。</div>
        <div className="word-cloud"></div>
      </section>
    )
  }

}
