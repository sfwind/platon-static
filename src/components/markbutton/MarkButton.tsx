import * as React from 'react'

interface MarkButtonProps {
  module: string,
  func: string,
  action: string,
  memo?: string
}

interface MarkButtonState {

}

export class MarkButton extends React.Component {

  constructor() {
    super()
  }

  state = {}

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps) != JSON.stringify(this.props)) {
      this.props = nextProps
    }
  }

  initState() {
    const {} = this.props
    this.setState({

    })
  }

  render() {
    const {} = this.state

    return <div {...this.props}/>
  }

}
