import * as React from 'react'
import './OtherComplete.less'

interface OtherCompleteProps {
  handleComplete: any
}

export class OtherShare extends React.Component<OtherCompleteProps, any> {

  constructor() {
    super()
  }

  render() {
    const { handleComplete = () => {}, upName } = this.props

    return (
      <div className="other-complete-component">
        <div className="complete-tips">
          你好，你已成功预约职业发展核心能力和心理品质测评，本测评由由华东师范大学教育教练研究组与圈外共同开发。<br/>

          第二批测评开放后，会通过该服务号通知你。敬请期待。
        </div>
      </div>
    )
  }

}
