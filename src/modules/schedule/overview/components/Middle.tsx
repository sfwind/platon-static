import * as React from 'react'

export default class Middle extends React.Component {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.context.router.goBack()
  }

  render() {
    return (
      <div/>
    )
  }

}
