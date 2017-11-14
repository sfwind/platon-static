import * as React from 'react'

export default class Middle extends React.Component {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { callback } = this.props.location.query
    console.log(callback)
    this.context.router.push(callback)
  }

  render() {
    return (
      <div/>
    )
  }

}
