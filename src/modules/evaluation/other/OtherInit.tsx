import * as React from 'react'
import './OtherInit.less'

interface OtherInitProps {
  handleStart: any
}

export class OtherInit extends React.Component<OtherInitProps, any> {

  constructor() {
    super()
  }

  render() {
    const { handleStart = () => {} } = this.props

    return (
      <div className="other-init-component">
        <div className='other-survey-tips'>
          {this.props.upName}邀请您，根据您对ta的了解，完成这份他评问卷，以帮助{this.props.upName}更全面、客观地的了解自身职业发展核心能力和心理品质。
        </div>
        <div className='self-init-button' onClick={() => handleStart()}>开始</div>
      </div>
    )
  }

}
