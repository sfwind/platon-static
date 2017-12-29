import * as React from 'react'
import './NextStepButton.less'

interface NextStepButtonProps {
  clickFunc: string,
  buttonText: any
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
    const { buttonText, clickFunc } = this.props
    this.setState({
      clickFunc: clickFunc,
      buttonText: buttonText
    })
  }

  render() {
    const { clickFunc: tmpA, buttonText: tmpB, ...other } = this.props
    const { clickFunc, buttonText } = this.state

    return (
      <div className="annual-summary-nextstep-component" onClick={() => clickFunc()} {...other}>
        {buttonText}
      </div>
    )
  }

}
