import * as React from 'react'
import './Step5_Auditorium.less'

export class Step5_Auditorium extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <section className="annual-auditorium">
        <div className="text text1">截止目前，你在圈外商学院</div>
        <div className="text text2">累积收获&nbsp;&nbsp;
          <span className="highlight"><large>1880</large>积分</span>
        </div>
        <div className="text text3">打败了&nbsp;&nbsp;
          <span className="highlight"><large>90%</large>的圈外学员</span>
        </div>
        <div className="text text4">赢得了三张邀请函</div>
        <div className="text text5">现在你也有个机会成就他人，快点击下方“分享”按钮，邀请你最优秀的朋友来体验七天的商学院之旅！</div>
        <div className=""></div>
      </section>
    )
  }

}
