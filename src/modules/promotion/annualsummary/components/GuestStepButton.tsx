import * as React from 'react'
import { NextStepButton } from './NextStepButton'

interface GuestStepButtonProps {
  leftFunc: any,
  leftText: string,
  rightFunc: any,
  rightText: string
}

export class GuestStepButton extends React.Component<GuestStepButtonProps, any> {

  constructor() {
    super()
  }

  componentWillReceiveProps() {

  }

  initParams() {
    const { leftFunc = () => {}, leftText = '', rightFunc = () => {}, rightText = '' } = this.props
    this.setState({
      leftFunc: leftFunc,
      leftText: leftText,
      rightFunc: rightFunc,
      rightText: rightText
    })
  }

  render() {
    const { leftFunc, leftText, rightFunc, rightText } = this.state

    return (
      <div>
        <NextStepButton clickFunc={} buttonText={}/>
        <NextStepButton clickFunc={} buttonText={}/>
      </div>
    )
  }

}
