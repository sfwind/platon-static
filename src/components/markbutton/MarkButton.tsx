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

  render() {
    return <div {...this.props}/>
  }

}
