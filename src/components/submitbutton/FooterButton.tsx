import * as React from 'react'
import './FooterButton.less'

interface SubmitButtonProps {
  btnArray: {
    click: any,
    text: string,
    className?: string
  }
}

interface SubmitButtonState {

}

export class FooterButton extends React.Component<SubmitButtonProps, SubmitButtonState> {

  constructor() {
    super()
  }

  render() {
    const { btnArray = [] } = this.props
    if(btnArray.length === 1) {
      const { click, text, className } = btnArray[0]
      return (
        <div className="ft-button-wrapper button-footer" >
          <div className={`submit-btn ${className && className}`} onClick={() => click()}>{text}</div>
        </div>
      )
    } else {
      return (
        <div className="ft-button-wrapper button-footer two-buttons">
          {
            btnArray.map((btn, idx) => {
              const { click, text, className } = btn
              return (
                <div className={`button ${className && className}`} style={style} key={idx} onClick={() => click()}>
                  {text}
                </div>
              )
            })
          }
        </div>
      )
    }
  }

}
