import * as React from 'react'
import './NextStepButton.less'

interface TwoStepButtonProps {
  buttons: object
}

export class TwoStepButton extends React.Component<TwoStepButtonProps, any> {

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
    const { buttons } = this.props

    this.setState({
      firstButtonText:buttons[0].buttonText,
      firstButtonClickFunc:buttons[0].clickFunc,
      secondButtonText:buttons[1].buttonText,
      secondButtonClickFunc:buttons[1].clickFunc,
    })
  }

  render() {
    const { ...other } = this.props
    const { firstButtonText, firstButtonClickFunc, secondButtonText, secondButtonClickFunc } = this.state

    return (
      <div className="annual-summary-twostep-component" {...other}>
        <div className="first-button" onClick={() => firstButtonClickFunc()}>
          {firstButtonText}
        </div>
        <div className="second-button" onClick={() => secondButtonClickFunc()}>
          {secondButtonText}
        </div>
      </div>
    )
  }

}
