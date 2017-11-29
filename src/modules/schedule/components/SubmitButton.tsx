import * as React from 'react'
import './SubmitButton.less'

interface SubmitButtonProps {
  clickFunc: any,
  buttonText: string
}
interface SubmitButtonState {

}
export class SubmitButton extends React.Component<SubmitButtonProps, SubmitButtonState> {

  constructor() {
    super()
  }

  FastClick = require('fastclick')

  componentDidMount() {
    this.FastClick.attach(document.querySelector('.submit-btn'))
  }

  render() {
    const { clickFunc = () => {}, buttonText } = this.props

    return (
      <div className="submitbutton-component button-footer">
        <div className="submit-btn" onClick={() => clickFunc()}>{buttonText}</div>
      </div>
    )
  }

}
