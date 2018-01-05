import * as React from 'react'
import './NextStepButton.less'

interface NextStepButtonProps {
  clickFunc: string,
  buttonText: any,
  noAnimation?: boolean
}

export class NextStepButton extends React.Component<NextStepButtonProps, any> {

  componentWillMount() {
    this.initParams()
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps) !== this.props) {
      this.props = nextProps
    }
    this.initParams()
  }

  initParams() {
    const { buttonText, clickFunc, noAnimation } = this.props
    this.setState({
      clickFunc: clickFunc,
      buttonText: buttonText,
      noAnimation: noAnimation
    })
  }

  render() {
    const { clickFunc: tmpA, buttonText: tmpB, noAnimation: tmpC, ...other } = this.props
    const { clickFunc, buttonText, noAnimation = false } = this.state

    return (
      <div className={`annual-summary-nextstep-component ${noAnimation ? '' : 'animation'}`}
           onClick={() => clickFunc()} {...other}>
        {buttonText}
      </div>
    )
  }

}
