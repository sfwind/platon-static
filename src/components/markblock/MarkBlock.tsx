import * as React from 'react'
import { mark } from '../../utils/request'
import sa from 'sa-sdk-javascript'

interface MarkBlockProps {
  module?: string,
  func: string,
  action: string,
  memo?: string
}

export class MarkBlock extends React.Component<MarkBlockProps, any> {

  constructor () {
    super()
  }

  state = {}

  componentWillMount () {
    this.initParams()
  }

  initParams () {
    const { module = '打点', func, action, memo = '' } = this.props
    this.setState({
      module: module,
      func: func,
      action: action,
      memo: memo
    })
  }

  handleClickMarkBlock (onClickFunc) {
    const { module, func, action, memo } = this.state
    let param = {
      module: module,
      function: func,
      action: action,
      memo: memo
    }
    mark(param).then(res => {
      if (res.code === 200) {
        sa.track('clickMarkBlock', {
          markModule: module + '',
          markFunction: func + '',
          markAction: action + '',
          markMemo: memo + ''
        });
        onClickFunc()
      } else {
        console.error(res.msg)
      }
    }).catch(er => console.error(er))
  }

  render () {
    const { module, func, action, memo, onClick = () => {}, ...other } = this.props

    return (
      <div {...other}
           onClick={() => {
             this.handleClickMarkBlock(onClick)
           }}>
        {this.props.children}
      </div>
    )
  }

}
