import * as React from 'react'
import './Step1_SchoolGate.less'
import { getPromotionSchoolGate } from '../async'

interface Step1_SchoolGateProps {
  getGlobalState: any
}

export class Step1_SchoolGate extends React.Component<Step1_SchoolGateProps, any> {

  constructor() {
    super()
    this.state = {}
  }

  async componentWillMount() {
    let res = await getPromotionSchoolGate(this.props.getGlobalState().riseId)
    if(res.code === 200) {
      let msg = res.msg
      this.setState({
        registerDate: msg.registerDate,
        registerSequence: msg.registerSequence
      })
    }
  }

  render() {
    const { registerDate = '2000年01月01日', registerSequence = 1 } = this.state
    const { isSelf = true, nickName = '' } = this.props.getGlobalState()

    return (
      <section className="annual-school-gate">
        <div className="scroll-container">
          <div className="text text1">
            时间回到<span className="highlight" style={{ fontSize: '2.1rem' }}>&nbsp;{registerDate}&nbsp;</span>
          </div>
          <div className="text text2">{isSelf ? '你' : nickName}第一天来到圈外商学院，成为</div>
          <div className="text text3">
            <span className="highlight" style={{ fontSize: '2.1rem' }}>第&nbsp;{registerSequence}&nbsp;个学员</span>
          </div>
          <div className="text text4">
            和<span className="highlight" style={{ fontSize: '2.1rem' }}>&nbsp;曾进，崔勇，蔡垒磊&nbsp;</span>
          </div>
          <div className="text text5">成为同学一起学习</div>
          <div className="partner"></div>
        </div>
      </section>
    )
  }

}
