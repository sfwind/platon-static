import * as React from 'react'
import './NextStepButton.less'

interface NextStepButtonProps {
  text: string,
  func: any
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
    const { text, func } = this.props
    this.setState({
      text: text,
      func: func
    })
  }

  render() {
    const { text, func } = this.state

    return (
      <div className="annual-summary-nextstep-component" onClick={() => func()}>
        {text}
      </div>
    )
  }

}
