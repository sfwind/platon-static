import * as React from 'react'

export class Block extends React.Component {

  constructor() {
    super()
  }

  render() {
    console.log('render')
    return (
      <block style={{ display: 'block' }}>
        {this.props.children}
      </block>
    )
  }

}
