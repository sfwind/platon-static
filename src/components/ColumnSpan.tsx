import * as React from 'react'
import * as _ from 'lodash'

interface ColumnSpanProps {
  height?: number
}

export class ColumnSpan extends React.Component<ColumnSpanProps, any> {

  constructor(props) {
    super(props)
  }

  render() {
    let { style = {}, height = 20 } = this.props

    style = _.merge(style, {
      marginLeft: '-3rem',
      marginRight: '-3rem',
      backgroundColor: '#f3f4f6',
      height: height
    })

    return (
      <div {...this.props} style={style}></div>
    )
  }
}
