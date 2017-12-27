import * as React from 'react'
import './Step2_ActivityCenter.less'

export class Step2_ActivityCenter extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {

  }

  render() {
    return (
      <section className="annual-activity-center">
        <div className="text text1">在圈外商学院里，你和来自全球</div>
        <div className="text text2"><span className="highlight">25座城市</span> 的人成了校友</div>
        <div className="text text3">一起累积学习了 <span className="highlight">102小时</span></div>
        <div className="text text4">相当于读了 <span className="highlight">5个MBA</span></div>
        <div className="map"></div>
        <div className="map-locations"></div>
      </section>
    )
  }

}
