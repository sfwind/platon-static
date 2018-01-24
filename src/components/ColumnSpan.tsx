import * as React from 'react'
import * as _ from 'lodash'

interface ColumnSpanProps {
  height?: number,
  backgroundColor?: string,
}

export class ColumnSpan extends React.Component<ColumnSpanProps, any> {

  constructor(props) {
    super(props)
  }

  render() {
    let { style = {}, height = 20, backgroundColor = '#f3f4f6' } = this.props

    style = _.merge(style, {
      backgroundColor: backgroundColor,
      height: height
    })

    return (
      <div {...this.props} style={style}></div>
    )
  }
}
