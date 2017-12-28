import * as React from 'react'
import './Step1_SchoolGate.less'

export class Step1_SchoolGate extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    const {
      registerDate = '2000年01月01日',
      registerSequence = 1
    } = this.state

    return (
      <section className="annual-school-gate">
        <div className="text text1">
          时间回到&nbsp;&nbsp;<span className="highlight" style={{ fontSize: '2.1rem' }}>{registerDate}</span>
        </div>
        <div className="text text2">你第一天来到圈外商学院，成为</div>
        <div className="text text3">
          <span className="highlight" style={{ fontSize: '2.1rem' }}>第{registerSequence}个学员</span>
        </div>
        <div className="text text4">
          和<span className="highlight" style={{ fontSize: '2.1rem' }}>&nbsp;&nbsp;曾进，崔勇，蔡垒磊</span>
        </div>
        <div className="text text5">成为同学一起学习</div>
        <div className="partner"></div>
      </section>
    )
  }

}
