import * as React from 'react'
import { mark } from '../../utils/request'

interface MarkButtonProps {
  module: string,
  func: string,
  action: string,
  memo?: string
}

export class MarkButton extends React.Component<MarkButtonProps, any> {

  constructor() {
    super()
  }

  state = {}

  componentWillMount() {
    this.initParams()
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps) != JSON.stringify(this.props)) {
      this.props = nextProps
      this.initParams()
    }
  }

  initParams() {
    const { module, func, action, memo } = this.props
    this.setState({
      module: module,
      func: func,
      action: action,
      memo: memo
    })
  }

  handleClickMarkButton(onClickFunc) {
    const { module, func, action, memo } = this.state
    let param = {
      module: module,
      function: func,
      action: action,
      memo: memo
    }
    mark(param).then(res => {
      if(res.code === 200) {
        onClickFunc()
      } else {
        console.error(res.msg)
      }
    }).catch(er => console.error(er))
  }

  render() {
    const { module, func, action, memo, ...other } = props

    const { onClick = () => {} } = this.props

    return (
      <div {...other}
           onClick={() => {
             this.handleClickMarkButton(onClick)
           }}>
        {this.props.children}
      </div>)
  }

}
